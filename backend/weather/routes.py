from flask import Blueprint, request, jsonify
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'ai-models')))
from weather_predictor import predict_weather_condition

weather_bp = Blueprint('weather', __name__)

@weather_bp.route("/weather", methods=["POST"])
def weather():
    data = request.get_json()
    temp = float(data.get("temperature", 0))
    hum = float(data.get("humidity", 0))
    condition = predict_weather_condition(temp, hum)
    return jsonify({"condition": condition})