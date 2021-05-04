from time import sleep

from lib.ptt_scraper.ptt_scraper import PTT
from db_connection import database

def joke_gif(
    start_page: int,
    end_page: int = -1,
    sleep = .5
    ):
    ptt = PTT(sleep = sleep)
    collection = database.article

    ptt.board('joke', start_page, end_page)
    ptt.article_list.pipeline(
        {'$in': ('author_id', 'ReiKuromiya')},
        {'$in': ('title', ['gif', 'Gif', 'GIF'])}
    )

    articles = ptt.article()
    for article in articles.data:
        if 'comments' in article: article.pop('comments')
        if 'content' in article: article.pop('content')
        if 'href_in_comment' in article: article.pop('href_in_comment')
        if 'download_time' in article:
            article.setdefault(
                'update_time',
                article.pop('download_time')
            )

        collection.update_one(
            { 'url': article['url'] },
            { '$set': article },
            upsert = True
        )

for i in range(0, 100):
    joke_gif(i * 100, (i + 1) * 100)
    sleep(600)