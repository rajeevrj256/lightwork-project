from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/csv_data', methods=['GET'])
def get_excel_data():
    try:
        # Read CSV data using pandas
        csv_data = pd.read_csv("NIFTY 50_Historical_PR_01032023to21032024.csv")
        
        # Drop the "Index Name" column
        csv_data.drop(columns=["Index Name"], inplace=True)
        
        # Convert time into Unix timestamps
        csv_data['time'] = pd.to_datetime(csv_data['time'], dayfirst=True).apply(lambda x: int(x.timestamp()))
        
        # Sort DataFrame based on the 'time' column
        csv_data_sorted = csv_data.sort_values(by='time')
        
        # Convert DataFrame to JSON
        json_data = csv_data_sorted.to_json(orient='records')
        
        # Set the Content-Type header to application/json
        response = json_data
        
        return response
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
