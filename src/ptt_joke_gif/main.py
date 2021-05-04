import typing as t

from datetime import datetime

from fastapi import FastAPI, Query
from pymongo import ASCENDING, DESCENDING

from db_connection import database

app = FastAPI()

ORDER = {
    'DESC': DESCENDING,
    'ASC': ASCENDING
}

@app.get('/')
async def root():
    return { 'server status': 'running' }

# order: ASC, DESC.
# q: start_date, end_date
@app.get('/jokes/{order}/')
async def get_jokes(
    *,
    order: str = 'DESC',
    before: t.Optional[str] = Query(
        None,
        description = 'Find article before specific date.',
    ) ,
    after: t.Optional[str] = Query(
        None,
        description = 'Find article after specific date.',
    ),
    push_number: t.Optional[int] = None,
    skip: int = 0
    ) -> list:
    query = {}

    if push_number:
        query.update({ 'push_number': { '$gte': int(push_number) } })
    if before:
        before = datetime.timestamp(datetime.strptime(before, '%Y-%m-%d %H:%M:%S'))
        query.update({ 'timestamp': { '$lte': before } })
    if after:
        after = datetime.timestamp(datetime.strptime(after, '%Y-%m-%d %H:%M:%S'))
        query.update({ 'timestamp': { '$gte': after } })

    return list(
        database.article.find(
                query,
                {'_id': 0}
            )
            .sort(
                'timestamp',
                ORDER.get(order, DESCENDING)
            )
            .limit(10)
            .skip(int(skip))
        )