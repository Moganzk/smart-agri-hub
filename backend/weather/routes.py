from flask import Blueprint, request, jsonify
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'ai-models')))
from weather_predictor import predict_weather_condition

weather_bp = Blueprint('weather', __name__)

@weather_bp.route("/predict/weather", methods=["POST"])
def predict_weather():
    data = request.get_json()
    temperature = data.get("temperature")
    humidity = data.get("humidity")
    if temperature is None or humidity is None:
        return jsonify({"error": "Please provide both temperature and humidity."}), 400
    condition = predict_weather_condition(float(temperature), float(humidity))
    return jsonify({"condition": condition})