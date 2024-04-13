from flask import Blueprint, jsonify                                                                                                                                                                               

from handlers import handler


__all__ = ['blueprint']

blueprint = Blueprint('csv_to_apis', __name__)


@blueprint.route('/csv_data', methods=['GET'])
def get_excel_data():
    try:
        ## TODO: get date and symbol in api
        return handler.getCandleStick("20240413", "NIFTY 50")
    except Exception as e:
        res = jsonify({'error': str(e)})
        res.status_code = 504 
        return res 
        

@blueprint.route('/symbol/date=<day>/<month>/<year>',methods=['GET'])
def symbol_with_dates(day, month, year):
    try:
        date_str=f"{day}/{month}/{year}"
        values = handler.getSymbolList(date_str)
        if values:
            return jsonify(values)
        else:
            res = jsonify({"error": "Date not found"})
            res.status_code = 404 
            return res 
            
    except Exception as e:
        res = jsonify({'symbol error',str(e)})
        res.status_code = 504 
        return res 