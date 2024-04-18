import os                                                                                                                                                                                                          
import logging
import pandas as pd
from datetime import datetime

from handlers.interface import Handler


log = logging.getLogger(__name__)


class ExampleHandler(Handler):
    def __init__(self):
        self.chart_data = None
        self.example_data = None
        self.indicator_data=None
        self.smaa_data=None

    def init(self, config):
        candle_data_file = config['candle_data']
        assert os.path.exists(candle_data_file), f'Candle stick data file not found: {candle_data_file}'
        log.info(f'initializing with candle file: {candle_data_file}')

        self.chart_data = pd.read_csv(candle_data_file)

        ##self.chart_data.drop(columns=["Index Name"], inplace=True)
        self.chart_data['time'] = pd.to_datetime(self.chart_data['time'], dayfirst=False)
        self.chart_data['time'] = self.chart_data['time'].dt.tz_localize('UTC').dt.tz_convert('Asia/Kolkata')
        self.chart_data['time'] = pd.to_datetime(self.chart_data['time']).apply(lambda x: int(x.timestamp()))
        
        chart_data_sorted = self.chart_data.sort_values(by='time')
        self.chart_data = chart_data_sorted.to_json(orient='records')

        symbol_data_file = config['symbol_file']
        assert os.path.exists(symbol_data_file), f'Symbol data file not found: {symbol_data_file}'
        log.info(f'initializing with symbol file: {symbol_data_file}')

        self.symbol_data = pd.read_csv(symbol_data_file, index_col=False)
        
        indicator_file_data = config['indicator_file']
        assert os.path.exists(indicator_file_data), f'Indicator data file not found: {indicator_file_data}'
        log.info(f'initializing with indicator file: {indicator_file_data}')
        
        self.indicator_data=pd.read_csv(indicator_file_data)
        self.indicator_data=self.indicator_data.to_json()
        
        sma_data_file=config['sma_file']
        assert os.path.exists(sma_data_file),f'Sma data file not found:{sma_data_file}'
        log.info(f'initializing with symbol file: {sma_data_file}')
        
        self.smaa_data =pd.read_csv(sma_data_file)
        self.smaa_data['time'] = pd.to_datetime(self.smaa_data['time'], dayfirst=False)
        self.smaa_data['time'] = self.smaa_data['time'].dt.tz_localize('UTC').dt.tz_convert('Asia/Kolkata')
        self.smaa_data['time'] = pd.to_datetime(self.smaa_data['time']).apply(lambda x: int(x.timestamp()))
        smaa_data_sorted = self.smaa_data.sort_values(by='time')
        self.smaa_data = smaa_data_sorted.to_json(orient='records')
        
     
        
       
        
        

    def getSymbolList(self, date):
        
        if date.strftime("%d/%m/%Y") in self.symbol_data.columns:
            return self.symbol_data[date.strftime("%d/%m/%Y")].dropna().tolist()
            

        return None

    def getCandleStick(self, date, symbol):
        
        return self.chart_data
    
    def indicator_list(self):
        return self.indicator_data

    
    def sma_data(self,date,symbol,indicator):
        return self.smaa_data
        