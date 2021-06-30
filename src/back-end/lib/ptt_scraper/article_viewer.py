import copy
import re
import typing as t
from bs4 import BeautifulSoup
from datetime import datetime

from pluggy.manager import DistFacade
from abstract.article_viewer import ArticleViewer
from connection import Connection

class PttArticleViewer(Connection, ArticleViewer):
    BASE_URL = 'https://www.ptt.cc'
    SELECTOR = {
        'ARTICLE_META': {
            # In html.parser, the nth-of-type will recaculate article-metaline and article-metaline-right.
            'ALL': 'div.article-metaline, div.article-metaline-right',
            'AUTHOR': 'div.article-metaline:nth-of-type(1) span.article-meta-value',
            'BOARD': 'div.article-metaline-right span.article-meta-value',
            'TITLE': 'div.article-metaline:nth-of-type(3) span.article-meta-value',
            'DATETIME': 'div.article-metaline:nth-of-type(4) span.article-meta-value',
        },
        'ARTICLE_CONTENT': 'div#main-content',
        'ARTICLE_HREFS': 'div#main-content > a[href]',
        'COMMENTS': 'span.f2 ~ div.push',
        'COMMENT_HREFS': 'div.push span.f3.push-content a[href]',
        # The richcontent is iframe preview for imgur.com
        'COMMENT_RICHCONTENTS': 'span.f2 ~ div.push ~ .richcontent',
        'COMMENT_META': {
            'TAG': '.push-tag',
            'COMMENTOR': '.push-userid',
            'COMMENT': '.push-content',
            'IPDATETIME': '.push-ipdatetime'
        }
    }
    RE = {
        'ip': re.compile(r'[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'),
        # In PTT, they have two type of ip presentation, 來自: xxx.xxx.xxx.xxx or FROM: xxx.xxx.xxx.xxx
        'author_ip': re.compile(r'((?<=(From\:\s))|(?<=(來自\:\s)))[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'),
        'datetime': re.compile(r'[0-9]{2}\/[0-9]{2}(\s[0-9]{2}\:[0-9]{2})?')
    }

    def __init__(self, headers: dict) -> None:
        super().__init__(headers)

    def article(self) -> dict:
        return {
            'content': self.content(),
            'meta': self.meta(),
            'comments': self.comments(),
            'href': self.href(),
        }

    def content(self) -> str:
        soup = self.__copy_soup(
            self._soup.select(self.SELECTOR['ARTICLE_CONTENT'])[0]
        )
        self.__decompose_comment_richcontents(soup)
        self.__decompose_comments(soup)
        self.__decompose_article_meta(soup)
        return soup.__repr__()

    def __copy_soup(self, selction) -> BeautifulSoup:
        soup = BeautifulSoup(features = 'html.parser')
        soup.append(copy.copy(selction))
        return soup

    def __decompose_article_meta(self, selection) -> None:
        article_metas = selection.select(self.SELECTOR['ARTICLE_META']['ALL'])
        for element in article_metas:
            element.decompose()

    def __decompose_comment_richcontents(self, selection) -> None:
        richcontents = selection.select(self.SELECTOR['COMMENT_RICHCONTENTS'])
        for element in richcontents:
            element.decompose()

    def __decompose_comments(self, selection) -> None:
        comments = selection.select(self.SELECTOR['COMMENTS'])
        for element in comments:
            element.decompose()

    def meta(self) -> dict:
        return {
                'board': self._status['looking_for'][0],
                'url': self._status['request_url'],
                'timestamp': self.timestamp(),
                'title': self.title(),
                'push': self.push(),
                'author': self.author()
            }

    def timestamp(self) -> float:
        dt = datetime.strptime(
            self._soup.select(self.SELECTOR['ARTICLE_META']['DATETIME'])[0].text,
            '%a %b %d %H:%M:%S %Y'
            )
        return datetime.timestamp(dt)

    def title(self) -> str:
        return self._soup.select(self.SELECTOR['ARTICLE_META']['TITLE'])[0].text

    def push(self) -> int:
        selector = f'{self.SELECTOR["COMMENTS"]} {self.SELECTOR["COMMENT_META"]["TAG"]}'
        tags = [element.text[:1] for element in self._soup.select(selector)]
        map_ = {
            '推': 1,
            '噓': -1,
        }

        output = 0
        for tag in tags:
            output += map_.get(tag, 0)

        return output

    def author(self) -> dict:
        text = self._soup.select(self.SELECTOR['ARTICLE_META']['AUTHOR'])[0].text
        search = re.search(self.RE['author_ip'], self._soup.text)
        return {
            'ip': search.group(0) if search else '',
            'id': text.split(' (')[0],
            'nickname': text.split(' (')[0] 
        }

    def comments(self) -> list[dict]:
        selections = self._soup.select(self.SELECTOR['COMMENTS'])
        outputs = []

        for comment in selections:
            outputs.append(
                {
                    'url': self._status['request_url'],
                    'date': self.__comment_datetime(
                        comment.select(
                            self.SELECTOR['COMMENT_META']['IPDATETIME']
                            )[0].text
                        ),
                    'tag': comment.select(
                        self.SELECTOR['COMMENT_META']['TAG']
                        )[0].text[:1],
                    'content': comment.select(
                        self.SELECTOR['COMMENT_META']['COMMENT']
                        )[0].text[2:],
                    'commentor': self.commentor(comment),
                }
            )

        return outputs

    def __comment_datetime(self, text) -> str:
        search = re.search(
            self.RE['datetime'],
            text
            )
        return search.group(0) if search else ''

    # PTT 推文有2種日期表示方式，date、datetime，
    # 以及難以估計推文年份，暫不做此功能。
    # def __comment_timestamp(self) -> float:
    #     dt = datetime.strptime(self.datetime(), "%a %b %d %H:%M:%S %Y")
    #     return datetime.timestamp(dt)

    def commentor(self, comment) -> dict:
        return {
            'id': comment.select(
                        self.SELECTOR['COMMENT_META']['COMMENTOR']
                        )[0].text,
            'ip': self.__commentor_ip(
                    comment.select(
                        self.SELECTOR['COMMENT_META']['IPDATETIME']
                        )[0].text
                )
        }

    def __commentor_ip(self, text) -> str:
        '''
        BBS PTT has two kind of board, one display ip address, another none.
        '''
        search = re.search(
            self.RE['ip'],
            text
            )
        return search.group(0) if search else ''

    def href(self) -> dict:
        return {
            'article': self.href_in_article(),
            'comments': self.href_in_comment()
        }

    def href_in_article(self) -> list:
        soup = self.__copy_soup(
            self._soup.select(self.SELECTOR['ARTICLE_CONTENT'])[0]
        )
        self.__decompose_comments(soup)
        return [url['href'] for url in soup.select(self.SELECTOR['ARTICLE_HREFS'])]

    def href_in_comment(self) -> list:
        soup = self.__copy_soup(
            self._soup.select(self.SELECTOR['ARTICLE_CONTENT'])[0]
        )
        return [url['href'] for url in soup.select(self.SELECTOR['COMMENT_HREFS'])]