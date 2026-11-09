#!/usr/bin/env bash
# Start both backend and frontend servers

echo "🚀 Starting FinWise Smart Expense Tracker..."

# Start Backend
echo "Starting FastAPI Backend on http://127.0.0.1:8000..."
cd backend
source venv/bin/activate
python run.py &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "Starting React Frontend on http://localhost:5173..."
cd frontend
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
npm run dev &
FRONTEND_PID=$!
cd ..

trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

echo "✅ Both servers are running. Press Ctrl+C to stop."
wait
