from flask import Blueprint, jsonify                                                                                                                                                                               

from handlers import handler
import datetime

__all__ = ['blueprint']

blueprint = Blueprint('candle_route', __name__)


@blueprint.route('/csv_data/<day>/<month>/<year>/<symbol>', methods=['GET'])
def get_excel_data(day,month,year,symbol):
    try:
    
        return  handler.getCandleStick(datetime.datetime.strptime(f"{day}{month}{year}", "%d%m%Y"), symbol)

    except Exception as e:
        res = jsonify({'error': str(e)})
        res.status_code = 504 
        return res 
        

@blueprint.route('/symbol/date=<day>/<month>/<year>',methods=['GET'])
def symbol_with_dates(day, month, year):
    try:
        
        date_str=f"{day}/{month}/{year}"
        
        values = handler.getSymbolList(datetime.datetime.strptime(f"{day}{month}{year}", "%d%m%Y")) 
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