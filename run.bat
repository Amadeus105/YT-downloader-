@echo off
echo Starting Backend (FastAPI)...
start cmd /k "cd backend && call venv\Scripts\activate && uvicorn main:app --reload"

echo Starting Frontend (Vite + React)...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting up!
