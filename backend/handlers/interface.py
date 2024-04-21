class Handler(object):
    def init(self, config):
        raise NotImplementedError

    def getSymbolList(self, date):
        raise NotImplementedError

    def getCandleStick(self, date, symbol):
        raise NotImplementedError
    
    def indicator_list(self):
        raise NotImplementedError
    
    def sma_data(self,date,symbol,indicator_name):
        raise NotImplementedError