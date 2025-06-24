import httpx
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from .models import ConversionRate
from datetime import datetime

API_URL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/rates_of_exchange?page%5Bsize%5D=100"

def fetch_conversion_rates():
    response = httpx.get(API_URL)
    response.raise_for_status()
    return response.json()["data"]

def seed_db():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    # Clearing the table first
    db.query(ConversionRate).delete()
    db.commit()
    data = fetch_conversion_rates()
    for item in data:
        # Parsing dates and float
        try:
            record_date = datetime.strptime(item["record_date"], "%Y-%m-%d").date()
            effective_date = datetime.strptime(item["effective_date"], "%Y-%m-%d").date()
            exchange_rate = float(item["exchange_rate"])
        except Exception:
            continue
        rate = ConversionRate(
            record_date=record_date,
            country=item["country"],
            currency=item["currency"],
            country_currency_desc=item["country_currency_desc"],
            exchange_rate=exchange_rate,
            effective_date=effective_date
        )
        db.add(rate)
    db.commit()
    db.close()

if __name__ == "__main__":
    seed_db() 