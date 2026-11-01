run .\.venv\Scripts\Activate in /backend

run backend - cd in /backend -  uvicorn main:app --host 0.0.0.0 --port 8000 --reload

run frontend - cd in dashboard -  "dev": "npm run start --workspace=frontend",
