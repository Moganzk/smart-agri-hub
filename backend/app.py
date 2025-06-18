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
    return """
    <html>
      <head>
        <title>Smart Agri Hub Backend</title>
        <style>
          body {
            background: #181818;
            color: #e0e0e0;
            font-family: 'Segoe UI', Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          h1 {
            color: #90caf9;
          }
          p {
            color: #bdbdbd;
          }
        </style>
      </head>
      <body>
        <h1>🌱 Smart Agri Hub Backend</h1>
        <p>API is running. Welcome!</p>
      </body>
    </html>
    """

if __name__ == '__main__':
    app.run(debug=True)
