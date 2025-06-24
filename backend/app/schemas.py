from pydantic import BaseModel
from datetime import date

class ConversionRateBase(BaseModel):
    record_date: date
    country: str
    currency: str
    country_currency_desc: str
    exchange_rate: float
    effective_date: date

class ConversionRateCreate(ConversionRateBase):
    pass

class ConversionRateOut(ConversionRateBase):
    id: int

    class Config:
        orm_mode = True 