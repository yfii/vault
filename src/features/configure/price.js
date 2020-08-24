export const coingeckoApi = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,curve-dao-token,yfii-finance,spaghetti&vs_currencies=usd";

export const price = {
  "curve-dao-token": {
    usd: 3
  },
  "yfii-finance":{
    usd: 1000
  },
  "grap.finance": {
    usd: 0.1
  },  
  "dforce-token": {
    usd: 0.6
  },
  "uniswapList": [
    {
      "name": "grap.finance",
      "pricepath": ["0xc8d2ab2a6fdebc25432e54941cb85b55b9f152db","0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8"]
    },
    {
      "name": "curve-dao-token",
      "pricepath": ["0xD533a949740bb3306d119CC777fa900bA034cd52","0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x6B175474E89094C44Da98b954EedeAC495271d0F"]
    }, 
    {
      "name": "yfii-finance",
      "pricepath": ["0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83","0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x6B175474E89094C44Da98b954EedeAC495271d0F"]
    }, 
    {
      "name": "dforce-token",
      "pricepath": ["0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0","0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","0x6B175474E89094C44Da98b954EedeAC495271d0F"]
    },
  ]
}