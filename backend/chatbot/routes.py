from flask import Blueprint, request, jsonify
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'ai-models', 'chatbot')))
from core import chatbot_response

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")
    try:
        reply = chatbot_response(user_input)
        return jsonify({"response": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500