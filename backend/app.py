from flask import Flask
from flask_cors import CORS

from chatbot.routes import chatbot_bp
from pest.routes import pest_bp
from weather.routes import weather_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

# Register blueprints
app.register_blueprint(chatbot_bp)
app.register_blueprint(pest_bp, url_prefix="/predict")
app.register_blueprint(weather_bp, url_prefix="/predict")


@app.route("/")
def index():
    return """
    <html>
      <head>
        <title>Smart Agri Hub API</title>
        <style>
          body {
            background: #181c1f;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            font-family: 'Inter', Arial, sans-serif;
          }
          h1 {
            text-align: center;
            font-size: 2.2rem;
            color: #00ffe1;
          }
        </style>
      </head>
      <body>
        <h1>Smart Agri Hub API is running!</h1>
      </body>
    </html>
    """


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
