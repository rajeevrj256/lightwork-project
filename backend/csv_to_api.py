from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/csv_data', methods=['GET'])
def get_excel_data():
    # Read CSV data using pandas
    excel_data = pd.read_csv("NIFTY 50_Historical_PR_01032023to21032024.csv")
    #covert date into timestamp
    excel_data['Date']=pd.to_datetime(excel_data['Date'])
    # Sort DataFrame based on the 'Date' column
    excel_data_sorted = excel_data.sort_values(by='Date')
    
    # Convert DataFrame to JSON
    json_data = excel_data_sorted.to_json(orient='records')
    #not use return jsonify(json_data) because data should be in array formate.Because megerdfunction in frontend only deal with data of arrays.
    return json_data

if __name__ == '__main__':
    app.run(debug=True)
