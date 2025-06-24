from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional

def get_conversion_rates(db: Session, gt: Optional[float] = None, lt: Optional[float] = None) -> List[models.ConversionRate]:
    query = db.query(models.ConversionRate)
    if gt is not None:
        query = query.filter(models.ConversionRate.exchange_rate > gt)
    if lt is not None:
        query = query.filter(models.ConversionRate.exchange_rate < lt)
    return query.all()

def create_conversion_rate(db: Session, rate: schemas.ConversionRateCreate) -> models.ConversionRate:
    db_rate = models.ConversionRate(**rate.dict())
    db.add(db_rate)
    db.commit()
    db.refresh(db_rate)
    return db_rate 
