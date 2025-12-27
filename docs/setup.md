# HSER Setup Guide

## Prerequisites
- Python 3.9+
- Node.js 16+
- Git

## Backend Setup

1. Clone repository
```bash
git clone https://github.com/YOUR_USERNAME/hser-project.git
cd hser-project/backend
```

2. Create virtual environment
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Setup environment variables
```bash
cp .env.example .env
# Edit .env and add your keys
```

5. Initialize database
```bash
python init_db.py
```

6. Run server
```bash
uvicorn main:app --reload
```

Backend runs at: http://localhost:8000

## Frontend Setup

1. Navigate to frontend
```bash
cd ../frontend
```

2. Install dependencies
```bash
npm install
```

3. Setup environment
```bash
cp .env.example .env
# Edit .env if needed
```

4. Start development server
```bash
npm start
```

Frontend runs at: http://localhost:3000

## Testing

- Backend API: http://localhost:8000/docs
- Frontend: http://localhost:3000

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)