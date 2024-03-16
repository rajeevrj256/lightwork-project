const axios = require('axios');
let data = JSON.stringify({
   "query": "query MyQuery {\n  EVM(network: eth, dataset: combined) {\n                        DEXTradeByTokens(\n                            orderBy: {ascending: Block_Date}\n                            where: {\n                                Trade: {\n                                    Currency: {SmartContract: {is: \"0xdac17f958d2ee523a2206206994597c13d831ec7\"}},\n                                    Side: {Currency: {SmartContract: {is: \"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\"}}}\n                                }\n                            }\n                            limit: {count: 200}\n                        ) {\n                            Block {\n                                Date(interval: {in: days})\n                            }\n                            volume: sum(of: Trade_Amount)\n                            Trade {\n                                high: Price(maximum: Trade_Price)\n                                low: Price(minimum: Trade_Price)\n                                open: Price(minimum: Block_Number)\n                                close: Price(maximum: Block_Number)\n                            }\n                            count\n                        }\n                    }\n}\n\n",
   "variables": "{}"
});

let config = {
   method: 'post',
   maxBodyLength: Infinity,
   url: 'https://streaming.bitquery.io/graphql',
   headers: { 
      'Content-Type': 'application/json', 
      'X-API-KEY': 'BQYUyj3WKIDtX3JoX8hI7kutuqrwTdcN', 
      'Authorization': 'Bearer ory_at_1RN9gLsHZd2nDsIvYc-cfmW94qissINKBNI9gnFKiGw.8bB3O5-OT9nZGoZ1G_9kHkpiQ3q8pstn0335K3xL3AQ'
   },
   data : data
};

axios.request(config)
.then((response) => {
   console.log(JSON.stringify(response.data));
})
.catch((error) => {
   console.log(error);
});