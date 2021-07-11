import typing as t

from fastapi import FastAPI, Query
from pymongo import ASCENDING, DESCENDING

from database import collection

app = FastAPI()

ORDER = {
    'DESC': DESCENDING,
    'ASC': ASCENDING
}

@app.get('/')
async def root():
    return { 'server status': 'running' }

# order: ASC, DESC.
@app.get('/jokes/')
async def get_jokes(
    *,
    order: str = 'DESC',
    before: t.Optional[int] = Query(
        None,
        description = 'Find article before specific date.',
    ) ,
    after: t.Optional[int] = Query(
        None,
        description = 'Find article after specific date.',
    ),
    push: t.Optional[int] = None,
    skip: int = 0
    ) -> list:
    query = {}

    if push: query.update({ 'meta.push': { '$gte': push } })
    if before: query.update({ 'meta.timestamp': { '$lte': before } })
    if after: query.update({ 'meta.timestamp': { '$gte': after } })

    return list(
        collection.find(
                query,
                {'_id': 0}
            )
            .sort(
                'meta.timestamp',
                ORDER.get(order, DESCENDING)
            )
            .limit(10)
            .skip(skip)
        )