# smart-agri-hub
Initial folder structure
smart-agri-hub/
├── backend/                  # Flask/FastAPI code
│   ├── app.py
│   ├── chatbot/
│   ├── weather/
│   └── pest/
│
├── frontend/                 # Flutter Web or React UI
│   ├── public/
│   └── src/
│
├── mobile/                   # Flutter mobile app (optional)
│
├── ai-models/                # ML models & training scripts
│   ├── pest_model.py
│   └── weather_predictor.py
│
├── database/
│   ├── schema.sql
│   └── supabase_config.json
│
├── docs/
│   ├── proposal.pdf
│   └── diagrams/
│
├── .gitignore
├── .env.example
├── README.md
└── LICENSE


How to run the frontend
cd frontend #from the project root
npm start

How to run the backend and the chatbot
cd backend #from the project root
python app.py

How to run the chatbot
cd ai-models\chatbot  #from the project root
python app.py

If the chatbot is bugging you just go a head and comment out the googletrans "google translator anywhere in your chatbot app.py, since it is not supported by python 3.13.x version"
you know where to find the chatbot folder i guess

An AI-powered agricultural system with:
- 🤖 Chatbot for farming Q&A
- 🌦️ Smart weather prediction
- 🐛 Intelligent pest control system
- 📊 Realtime analytics dashboard

## 🔧 Tech Stack
- **Frontend**: React / Flutter
- **Backend**: Flask + Python ML
- **DB**: Supabase (PostgreSQL)
- **AI**: GPT / Dialogflow, TensorFlow, OpenWeather API

## 🚧 Project Structure
See `/backend`, `/frontend`, and `/ai-models`.

## 🔐 Env Setup
Copy `.env.example` to `.env` and fill your secrets.

## 🙌 Contributors
- 👨‍🌾 Samuel Mogaka Nyamwange — Project Lead

## 📄 License
MIT
"# UI polish" 
