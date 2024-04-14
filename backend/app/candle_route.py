from flask import Blueprint, jsonify                                                                                                                                                                               

from handlers import handler
import datetime

__all__ = ['blueprint']

blueprint = Blueprint('candle_route', __name__)


@blueprint.route('/csv_data/<day>/<month>/<year>/<symbol>', methods=['GET'])
def get_excel_data(day,month,year,symbol):
    try:
        date_str=f"{day}/{month}/{year}"
        ## TODO: get date and symbol in api
        return handler.getCandleStick(date_str, symbol)
    except Exception as e:
        res = jsonify({'error': str(e)})
        res.status_code = 504 
        return res 
        

@blueprint.route('/symbol/date=<day>/<month>/<year>',methods=['GET'])
def symbol_with_dates(day, month, year):
    try:
        if not (day.isdigit() and month.isdigit() and year.isdigit()):
            return jsonify({"error": f"Invalid date format. Received day={day}, month={month}, year={year}. Expected numeric values."}), 400
        
        year_int = int(year)
        month_int = int(month)
        day_int = int(day)
        
        specific_date = datetime.date(year_int, month_int, day_int)
        date_str=f"{day}/{month}/{year}"
        
        values = handler.getSymbolList(date_str)
        if values:
            return jsonify(values)
        else:
            res = jsonify({"error": "Date not found"})
            res.status_code = 404 
            return res 
            
    except Exception as e:
        res = jsonify({'symbol error':str(e)})
        res.status_code = 504 
        return res 