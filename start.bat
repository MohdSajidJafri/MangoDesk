@echo off
echo Starting Meeting Notes Summarizer application...

echo Starting backend server...
start cmd /k "cd backend && npm run dev"

echo Starting frontend server...
start cmd /k "cd frontend && npm start"

echo Both servers are starting. The application will open in your browser shortly.
