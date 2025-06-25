from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional

def process_date_filter(query, date_filter):
    # date_filter is a dict with possible keys: gte, lte, eq
    if not date_filter:
        return query.filter(models.ConversionRate.record_date >= '2001-01-01')
    if 'eq' in date_filter:
        return query.filter(models.ConversionRate.record_date == date_filter['eq'])
    if 'gte' in date_filter and 'lte' in date_filter:
        return query.filter(models.ConversionRate.record_date >= date_filter['gte'], models.ConversionRate.record_date <= date_filter['lte'])
    if 'gte' in date_filter:
        return query.filter(models.ConversionRate.record_date >= date_filter['gte'])
    if 'lte' in date_filter:
        return query.filter(models.ConversionRate.record_date <= date_filter['lte'])
    return query

def build_currency_filter(query, currency_pairs: Optional[List[str]]):
    if currency_pairs:
        return query.filter(models.ConversionRate.country_currency_desc.in_(currency_pairs))
    return query

def get_paginated_conversions(db: Session, page_number: int, page_size: int, date_filter: Optional[dict], currency_pairs: Optional[List[str]], fields: Optional[List[str]], gt: Optional[float] = None, lt: Optional[float] = None):
    query = db.query(models.ConversionRate)
    query = process_date_filter(query, date_filter)
    query = build_currency_filter(query, currency_pairs)
    if gt is not None:
        query = query.filter(models.ConversionRate.exchange_rate > gt)
    if lt is not None:
        query = query.filter(models.ConversionRate.exchange_rate < lt)
    total_count = query.count()
    total_pages = (total_count + page_size - 1) // page_size
    offset = (page_number - 1) * page_size
    query = query.order_by(models.ConversionRate.record_date.desc()).offset(offset).limit(page_size)
    results = query.all()
    # Field selection
    if fields:
        filtered_results = []
        for row in results:
            filtered_results.append({field: getattr(row, field) for field in fields if hasattr(row, field)})
        return filtered_results, total_count, total_pages
    return results, total_count, total_pages

def create_conversion_rate(db: Session, rate: schemas.ConversionRateCreate) -> models.ConversionRate:
    db_rate = models.ConversionRate(**rate.dict())
    db.add(db_rate)
    db.commit()
    db.refresh(db_rate)
    return db_rate 
