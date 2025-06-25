from flask import Blueprint, request, jsonify
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'ai-models')))
from pest_model import predict_pest_risk

pest_bp = Blueprint('pest', __name__)

@pest_bp.route("/pest", methods=["POST"])
def pest():
    data = request.get_json()
    temp = float(data.get("temperature", 0))
    hum = float(data.get("humidity", 0))
    risk = predict_pest_risk(temp, hum)
    return jsonify({"risk": risk})