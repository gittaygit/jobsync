from flask import Flask, request
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/parse/skills', methods=['POST'])
def parse_skills():
    req = request.get_json()
    user_input = req.get('data')

    """
    third party api url
    """
    url = "https://api.iki.ai/api/skills_extraction/"

    """
    set up payload to post to api
    """
    payload = {
        "text": user_input
    }

    """
    create request headers
    """
    headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "http://127.0.0.1:5000/",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST"
    }

    r = requests.post(url=url, headers=headers, data=json.dumps(payload))

    # uncomment to see what the response looks like
    # print(r.json())

    return r.json()


if __name__ == '__main__':
    app.run()

