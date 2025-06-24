from sqlalchemy import Column, Integer, String, Float, Date
from .database import Base

class ConversionRate(Base):
    __tablename__ = "conversion_rates"

    id = Column(Integer, primary_key=True, index=True)
    record_date = Column(Date, nullable=False)
    country = Column(String, nullable=False)
    currency = Column(String, nullable=False)
    country_currency_desc = Column(String, nullable=False)
    exchange_rate = Column(Float, nullable=False)
    effective_date = Column(Date, nullable=False) 