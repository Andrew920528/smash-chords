import logging
from flask import Flask
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO)

@app.route('/hello', methods=['GET'])
def get_output():
    return {'output': 'hello guys!'}

if __name__ == '__main__':
    app.run(port=5000)
