from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/csv_data', methods=['GET'])
def get_excel_data():
    try:
        # Read chat CSV data using pandas
        chart_data = pd.read_csv("NIFTY 50_Historical_PR_01032023to21032024.csv")
        
        # Drop the "Index Name" column
        chart_data.drop(columns=["Index Name"], inplace=True)
        
        # Convert time into Unix timestamps
        chart_data['time'] = pd.to_datetime(chart_data['time'], dayfirst=True).apply(lambda x: int(x.timestamp()))
        
        # Sort DataFrame based on the 'time' column
        chart_data_sorted = chart_data.sort_values(by='time')
        
        # Convert DataFrame to JSON
        chart_data = chart_data_sorted.to_json(orient='records')
        
        # Set the Content-Type header to application/json
        
        
        return chart_data
    
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/symbol/date=<day>/<month>/<year>',methods=['GET'])
def symbol_with_dates(day, month, year):
    try:
        date_str=f"{day}/{month}/{year}"
        # Read symbol CSV data using pandas
        symbol_data=pd.read_csv("symbol.csv",index_col=False)
         # Convert each column into a list and store in a dict
        if date_str in symbol_data.columns:
            values=symbol_data[date_str].dropna().tolist()
            return jsonify(values)
        else:
            return jsonify({"error": "Date not found"})
        
    except Exception as r:
        return jsonify({'symbol error',str(r)})
    

if __name__ == '__main__':
    app.run(debug=True)
