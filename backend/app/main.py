from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from . import models, schemas, crud
from .database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS for frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

@app.get("/api/conversions", response_model=List[schemas.ConversionRateOut])
def read_conversions(gt: Optional[float] = Query(None), lt: Optional[float] = Query(None), db: Session = Depends(get_db)):
    return crud.get_conversion_rates(db, gt=gt, lt=lt)

@app.post("/api/conversions", response_model=schemas.ConversionRateOut)
def create_conversion(rate: schemas.ConversionRateCreate, db: Session = Depends(get_db)):
    return crud.create_conversion_rate(db, rate) 