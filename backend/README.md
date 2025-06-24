# Rate Wise Backend

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Seed the database with initial conversion rates:
   ```bash
   python -m app.fetch_and_seed
   ```

3. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Setup DB
   1. Remove already existing Database if it exists already.
   ```rm conversions.db```

   2. Rerun the seeder
   ```python -m app.fetch_and_seed```
   3. Restart your FastAPI server
   ```uvicorn app.main:app --reload```

## API Endpoints

### GET /api/conversions
- Returns all conversion rates.
- Optional query params:
  - `gt`: exchange_rate greater than value
  - `lt`: exchange_rate less than value

### POST /api/conversions
- Accepts a JSON body to add a new conversion rate.

## Example POST Body
```json
{
  "record_date": "2024-03-31",
  "country": "Australia",
  "currency": "Dollar",
  "country_currency_desc": "Australia-Dollar",
  "exchange_rate": 1.5,
  "effective_date": "2024-03-31"
}
``` 