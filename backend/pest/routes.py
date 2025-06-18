from flask import Blueprint, request, jsonify
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'ai-models')))
from pest_model import predict_pest_risk

pest_bp = Blueprint('pest', __name__)

@pest_bp.route("/predict/pest", methods=["POST"])
def predict_pest():
    data = request.get_json()
    temperature = data.get("temperature")
    humidity = data.get("humidity")
    if temperature is None or humidity is None:
        return jsonify({"error": "Please provide both temperature and humidity."}), 400
    risk = predict_pest_risk(float(temperature), float(humidity))
    return jsonify({"risk": risk})