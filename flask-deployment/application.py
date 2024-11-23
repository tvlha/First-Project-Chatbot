from flask import Flask, request, jsonify
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

@app.route("/")
def index():
    return "Welcome to the AI Coding Advisor!"

application = app

@app.route("/api/suggestion", methods=["POST"])
def get_suggestion():
    data = request.json
    user_input = data.get("question", "")

    if not user_input:
        return jsonify({"error": "Question is required"}), 400

    try:
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant for beginner programmers."},
                {"role": "user", "content": user_input}
            ],
            max_tokens=200,
            temperature=0.7
        )
        suggestion = response['choices'][0]['message']['content'].strip()
        return jsonify({"suggestion": suggestion})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
