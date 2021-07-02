from lib.ptt_scraper.ptt_scraper import PTT
from database import collection

def get_ptt_joke_gif_article(
    start_page: int,
    end_page: int = -1,
    sleep = .2
    ):
    scraper = PTT(sleep = sleep)

    scraper.board('joke', start_page, end_page)
    scraper.article_list.pipeline(
        {'$eq': ('author', 'ReiKuromiya')},
        {'$or': ('title', ['gif', 'Gif', 'GIF'])}
    )

    articles = scraper.article()
    articles = data_cleaning(articles)

    update_to_mongo(articles)

def data_cleaning(articles: list) -> list:
    pops = ['comments', 'content']
    accept_types = ['gif', 'mp4']
    for article in articles:

        for pop_ in pops:
            if pop_ in article:
                article.pop(pop_)

        if 'href' in article:
            if 'comments' in article['href']:
                article['href'].pop('comments')

            if 'article' in article['href']:
                for href in article['href']['article']:
                    if not any([href.endswith(a) for a in accept_types]):
                        article['href']['article'].remove(href)
    return articles

def update_to_mongo(articles: list) -> None:
    for article in articles:
        collection.update_one(
            { 'meta': {
                    'url': article['meta']['url']
                }
            },
            { '$set': article },
            upsert = True
        )

get_ptt_joke_gif_article(0, 100)