from fastapi import FastAPI, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from . import models, schemas, crud
from .database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware
import math
import urllib.parse

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS for frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://rate-wise-one.vercel.app",
        "http://localhost:3001",
        "http://localhost:3000",
        ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def parse_filter(filter_str: Optional[str]):
    date_filter = {}
    currency_pairs = []
    if filter_str:
        parts = filter_str.split(",")
        for part in parts:
            if part.startswith("record_date"):  # e.g. record_date:gte:2020-01-01
                if ":" in part:
                    _, op, val = part.split(":", 2)
                    if op == "gte":
                        date_filter["gte"] = val
                    elif op == "lte":
                        date_filter["lte"] = val
                    elif op == "eq":
                        date_filter["eq"] = val
            elif part.startswith("country_currency_desc:in:("):
                # e.g. country_currency_desc:in:(Canada-Dollar,Mexico-Peso)
                vals = part[len("country_currency_desc:in:("):-1]
                currency_pairs = [v.strip() for v in vals.split(",") if v.strip()]
    if not date_filter:
        date_filter = None
    return date_filter, currency_pairs


@app.get("/api/conversions")
def get_conversions(
    request: Request,
    page_number: int = Query(1, alias="page[number]", ge=1),
    page_size: int = Query(25, alias="page[size]", ge=10, le=100),
    fields: Optional[str] = Query(None),
    filter: Optional[str] = Query(None),
    gt: Optional[float] = Query(None),
    lt: Optional[float] = Query(None),
    db: Session = Depends(get_db)
):
    date_filter, currency_pairs = parse_filter(filter)
    field_list = [f.strip() for f in fields.split(",")] if fields else None
    # Get paginated data
    data, total_count, total_pages = crud.get_paginated_conversions(
        db, page_number, page_size, date_filter, currency_pairs, field_list, gt, lt
    )
    meta = {
        "count": len(data),
        "total-count": total_count,
        "total-pages": total_pages,
    }
    return {"data": data, "meta": meta}

@app.post("/api/conversions", response_model=schemas.ConversionRateOut)
def create_conversion(rate: schemas.ConversionRateCreate, db: Session = Depends(get_db)):
    return crud.create_conversion_rate(db, rate) 