from flask import Flask                                                                                                                                                                                            
from flask_cors import CORS

from app.candle_route import blueprint as cta_blueprint


__all__ = ['app']


app = Flask(__name__)
CORS(app)

app.register_blueprint(cta_blueprint)