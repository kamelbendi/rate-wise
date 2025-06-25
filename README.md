# Rate Wise
App Link: https://rate-wise-one.vercel.app

## Backend (Python FastAPI/Django)

### Prerequisites
- Python 3.8+
- pip
- (Optional) virtualenv

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

## Frontend (React)

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Setup & Run
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn
   ```
3. Start the development server:
   ```sh
   npm start
   # or
   yarn start
   ```

The frontend will be available by default at http://localhost:3000 and the backend at http://localhost:8000 (FastAPI/Django).

---

## Notes
- Make sure to configure CORS if accessing the backend from the frontend.
