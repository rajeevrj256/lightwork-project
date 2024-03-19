const axios = require('axios');

let config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://api.upstox.com/v2/historical-candle/?:^NSE_EQ/1minute/2024-01-01/2024-03-01',
  headers: { 
    'Accept': 'application/json'
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});