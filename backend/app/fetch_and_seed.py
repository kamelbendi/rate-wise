import httpx
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from .models import ConversionRate
from datetime import datetime

API_URL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/rates_of_exchange"
PAGE_SIZE = 100

def fetch_all_conversion_rates():
    all_data = []
    page_number = 1
    while True:
        params = {
            "page[size]": PAGE_SIZE,
            "page[number]": page_number
        }
        response = httpx.get(API_URL, params=params)
        response.raise_for_status()
        result = response.json()
        all_data.extend(result["data"])
        meta = result.get("meta", {})
        total_pages = meta.get("total-pages", 1)
        print(f"Fetched page {page_number}/{total_pages}")
        if page_number >= total_pages:
            break
        page_number += 1
    print(f"Total records fetched: {len(all_data)}")
    return all_data

def seed_db():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    # Clearing the table first
    db.query(ConversionRate).delete()
    db.commit()
    data = fetch_all_conversion_rates()
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