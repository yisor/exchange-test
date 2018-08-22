export default {
  // 支持值为 Object 和 Array
  '/api/users': { users: [{ id: 1, name: '测试用户' }, { id: 2, name: '游客' }] },
  '/api/get_ticker': {
    "high": 1, "vol": 10232.26315789, "last": 173.60263169, "low": 0.01,
    "buy": "0.01000000", "sell": "1.12345680", "time": 1514448473626, "rose": -0.2922,
  },
  '/api/get_tickers': [{
    "baseCoin": "btc",
    "data": {
      "amount": 30232.26315,
      "close": 0,
      "high": 1,
      "low": 0.01,
      "open": 0,
      "rose": -0.2922,
      "timePoint": 1514448473626,
      "vol": 10232.26315789
    },
    "depthStep": "2",
    "event": "SUB",
    "klineTime": "1min",
    "quoteCoin": "usdt",
    "symbol": "usdtbtc",
    "type": "TICKER"
  }],
  '/api/getEntryOrderData': {
    "data": {
      "asks": [//卖
        {
          "agePrice": 123,
          "baseCoin": "string",
          "dealVolume": 0.234,
          "feeIsUserPlatformCoin": false,
          "orderId": "string",
          "price": 1112.32,
          "quoteCoin": "string",
          "side": "BUY",
          "status": "INIT",
          "symbol": "string",
          "type": "limitPriceEntrust",
          "volume": 0
        },
        {
          "agePrice": 123,
          "baseCoin": "string",
          "dealVolume": 10.34,
          "feeIsUserPlatformCoin": false,
          "orderId": "string",
          "price": 324.02,
          "quoteCoin": "string",
          "side": "BUY",
          "status": "INIT",
          "symbol": "string",
          "type": "limitPriceEntrust",
          "volume": 0
        }, {
          "agePrice": 123,
          "baseCoin": "string",
          "dealVolume": 36.23,
          "feeIsUserPlatformCoin": false,
          "orderId": "string",
          "price": 324.22,
          "quoteCoin": "string",
          "side": "BUY",
          "status": "INIT",
          "symbol": "string",
          "type": "limitPriceEntrust",
          "volume": 0
        },
        {
          "agePrice": 123,
          "baseCoin": "string",
          "dealVolume": 321.22,
          "feeIsUserPlatformCoin": false,
          "orderId": "string",
          "price": 1233.2,
          "quoteCoin": "string",
          "side": "BUY",
          "status": "INIT",
          "symbol": "string",
          "type": "limitPriceEntrust",
          "volume": 0
        }, {
          "agePrice": 123,
          "baseCoin": "string",
          "dealVolume": 753.56,
          "feeIsUserPlatformCoin": false,
          "orderId": "string",
          "price": 854.32,
          "quoteCoin": "string",
          "side": "BUY",
          "status": "INIT",
          "symbol": "string",
          "type": "limitPriceEntrust",
          "volume": 0
        }
      ],
      "bids": [//买
        {
          "agePrice": 0,
          "baseCoin": "string",
          "dealVolume": 934.2,
          "feeIsUserPlatformCoin": false,
          "orderId": "string",
          "price": 324.3,
          "quoteCoin": "string",
          "side": "SELL",
          "status": "INIT",
          "symbol": "string",
          "type": "limitPriceEntrust",
          "volume": 0
        }, {
          "agePrice": 0,
          "baseCoin": "string",
          "dealVolume": 982,
          "feeIsUserPlatformCoin": false,
          "orderId": "string",
          "price": 2947,
          "quoteCoin": "string",
          "side": "SELL",
          "status": "INIT",
          "symbol": "string",
          "type": "limitPriceEntrust",
          "volume": 0
        },
        {
          "agePrice": 0,
          "baseCoin": "string",
          "dealVolume": 64.82,
          "feeIsUserPlatformCoin": false,
          "orderId": "string",
          "price": 42.56,
          "quoteCoin": "string",
          "side": "SELL",
          "status": "INIT",
          "symbol": "string",
          "type": "limitPriceEntrust",
          "volume": 0
        }, {
          "agePrice": 0,
          "baseCoin": "string",
          "dealVolume": 592,
          "feeIsUserPlatformCoin": false,
          "orderId": "string",
          "price": 62.731,
          "quoteCoin": "string",
          "side": "SELL",
          "status": "INIT",
          "symbol": "string",
          "type": "limitPriceEntrust",
          "volume": 0
        },
        {
          "agePrice": 0,
          "baseCoin": "string",
          "dealVolume": 6402,
          "feeIsUserPlatformCoin": false,
          "orderId": "string",
          "price": 2423.93,
          "quoteCoin": "string",
          "side": "SELL",
          "status": "INIT",
          "symbol": "string",
          "type": "limitPriceEntrust",
          "volume": 0
        }
      ]
    },
  },
  '/api/getBalanceData': {
    "price": "0.00002535",
    "countCoinBalance": "0.02534787",
    "minVolume": "0.01",
    "minPrice": "0.00000001",
    "baseCoinBalance": "3529.28212267",
    "volumePrecision": "3",
    "pricePrecision": "8",
  },
  '/api/getOrderData': {
    "list":[
      {
        "id":343,
        "side":"buy",
        "side_msg":"买入",
        "created_at":"09-22 12:22", "price":{"title":"委托价","amount":222.33,"icon":"https://xxxx.jpg"}, "volume":{"title":"委托量","amount":222.33,"icon":"https://xxxx.jpg"}, "remain_volume":{"title":"剩余量","amount":222.33,"icon":"https://xxxx.jpg"},
        "deal_volume":{"title":"成交量","amount":"-","icon":"https://xxxx.jpg"}, "age_price":{"title":"成交均价","amount":"-","icon":"https://xxxx.jpg"},
        "label":{"title":"撤销","click":1}//按钮控制，click=1可点，字段冗余，方便SRV控制
      }, {
        "id":344,
        "side":"sell",
        "side_msg":"卖出",
        "created_at":"09-22 12:22", "price":{"title":"委托价","amount":222.33,"icon":"https://xxxx.jpg"}, "volume":{"title":"委托量","amount":222.33,"icon":"https://xxxx.jpg"}, "remain_volume":{"title":"剩余量","amount":222.33,"icon":"https://xxxx.jpg"},
        "deal_volume":{"title":"成交量","amount":"-","icon":"https://xxxx.jpg"}, "age_price":{"title":"成交均价","amount":"-","icon":"https://xxxx.jpg"},
        "label":{"title":"撤销","click":1}//按钮控制，click=1可点，字段冗余，方便SRV控制
      },
    ]
  },
  '/api/common/symbol': {
    "btc": [{
      "pricePrecision": 6, "minVolume": "0.01", "minPrice": "0.00000001", "name": "LTC/BTC",
      "dept": ["0.00000001", "0.000001", "0.0001"], "volumePrecision": 2, "key": "ltcbtc"
    },
    {
      "pricePrecision": 4, "minVolume": "0.00000001", "minPrice": "0.00000001", "name": "BCH/BTC",
      "dept": ["0.00000001", "0.000001", "0.0001"], "volumePrecision": 8, "key": "bchbtc"
    },
    {
      "pricePrecision": 5, "minVolume": "0.01", "minPrice": "0.00000001", "name": "ETC/BTC",
      "dept": ["0.00000001", "0.000001", "0.0001"], "volumePrecision": 2, "key": "etcbtc"
    }],
    "eth": [{
      "pricePrecision": 8, "minVolume": "0.01", "minPrice": "0.00000001", "name": "LTC / ETH",
      "dept": ["0.00000001", "0.000001", "0.0001"], "volumePrecision": 2, "key": "ltceth"
    },
    {
      "pricePrecision": 8, "minVolume": "0.01", "minPrice": "0.00000001", "name": "ETC / ETH",
      "dept": ["0.00000001", "0.000001", "0.0001"], "volumePrecision": 2, "key": "etceth"
    }]
  },
  '/api/public/rate': {
    "ko": {
      "wicc": 824.311215,
      "bch": 6614843.61252078,
      "usd": 1294.06768641,
      "xct": 46.750221765,
      "xas": 53533125.477,
      "ylb": 647673.0975,
      "ascs": 588.793725,
      "btc": 5887937.25,
      "krw": "1",
      "etc": 14456.9467267875,
      "neuc": 905.847380492654,
      "eth": 516971.54745,
      "usdt": 1070.472559,
      "itc": 2943.968625,
      "ltc": 99177.12159147,
      "swftc": 117.758745
    },
    "en": {
      "bbc": 1,
      "wicc": 1.49159619028,
      "bch": 11969.60001537039376,
      "usd": "1",
      "xct": 0.08459481250588,
      "xas": 96868.518300184,
      "ylb": 1171.96843522,
      "ascs": 1.0654258502,
      "btc": 10654.258502,
      "etc": 26.1599336128857,
      "neuc": 1,
      "eth": 891.33334082,
      "usdt": 1.0008,
      "itc": 5.327129251,
      "ltc": 179.46160871870824,
      "swftc": 0.21308517004
    },
    "zh": {
      "wicc": 4.90685195,
      "bch": 39375.9755883494,
      "usd": 6.3069,
      "xct": 0.27828860345,
      "xas": 318664.98521,
      "ylb": 3855.383675,
      "ascs": 3.50489425,
      "cny": "1",
      "btc": 35048.9425,
      "etc": 86.057420967375,
      "neuc": 5.26812486405,
      "eth": 3077.3605885,
      "usdt": 6.31257621,
      "itc": 17.52447125,
      "ltc": 590.3685933431,
      "swftc": 0.70097885
    }
  }
};
