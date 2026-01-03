# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import dashboard

app = Flask(__name__)
CORS(app)  # Allows React (different port) to access this API

@app.route('/api/stats', methods=['GET'])
def stats():
    data = dashboard.get_dashboard_stats()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
