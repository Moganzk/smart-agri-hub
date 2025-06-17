from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()

from chatbot.routes import chatbot_bp
from pest.routes import pest_bp
from weather.routes import weather_bp

app = Flask(__name__)

app.register_blueprint(chatbot_bp)
app.register_blueprint(pest_bp)
app.register_blueprint(weather_bp)

@app.route('/')
def home():
    return "Welcome to Smart Agri Hub Backend"

if __name__ == '__main__':
    app.run(debug=True)
