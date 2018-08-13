
export default {
  // 支持值为 Object 和 Array
  '/api/users': { users: [{ id: 1, name: '测试用户' }, { id: 2, name: '游客' }] },
  '/api/get_ticker': {
    "high": 1, "vol": 10232.26315789, "last": 173.60263169, "low": 0.01,
    "buy": "0.01000000", "sell": "1.12345680", "time": 1514448473626
  },
  '/api/common/symbols': [
    { "symbol": "ethbtc", "count_coin": "btc", "amount_precision": 3, "base_coin": "eth", "price_precision": 8 },
    { "symbol": "ltcbtc", "count_coin": "btc", "amount_precision": 2, "base_coin": "ltc", "price_precision": 8 },
    { "symbol": "bchbtc", "count_coin": "btc", "amount_precision": 3, "base_coin": "bch", "price_precision": 8 },
    { "symbol": "etcbtc", "count_coin": "btc", "amount_precision": 2, "base_coin": "etc", "price_precision": 8 },
    { "symbol": "ltceth", "count_coin": "eth", "amount_precision": 2, "base_coin": "ltc", "price_precision": 8 },
    { "symbol": "etceth", "count_coin": "eth", "amount_precision": 2, "base_coin": "etc", "price_precision": 8 }
  ],
  '': {
    "code": "0",
    "msg": "suc",
    "data": {
      "symbolJsonStr": {
        "btc": [
          {
            "pricePrecision": 8,
            "minVolume": "0.01",
            "minPrice": "0.00000001",
            "name": "LTC/BTC",
            "dept": ["0.00000001", "0.000001", "0.0001"],
            "volumePrecision": 2, "key": "ltcbtc"
          },
          {
            "pricePrecision": 8, "minVolume": "0.00000001", "minPrice": "0.00000001",
            "name": "BCH/BTC",
            "dept": ["0.00000001", "0.000001", "0.0001"],
            "volumePrecision": 8, "key": "bchbtc"
          },
          {
            "pricePrecision": 8, "minVolume": "0.01", "minPrice": "0.00000001", "name": "ETC/BTC",
            "dept": ["0.00000001", "0.000001", "0.0001"],
            "volumePrecision": 2, "key": "etcbtc"
          }
        ],
        "eth": [
          {
            "pricePrecision": 8, "minVolume": "0.01", "minPrice": "0.00000001", "name": "LTC / ETH",
            "dept": ["0.00000001", "0.000001", "0.0001"],
            "volumePrecision": 2,
            "key": "ltceth"
          },
          {
            "pricePrecision": 8, "minVolume": "0.01", "minPrice": "0.00000001", "name": "ETC / ETH",
            "dept": ["0.00000001", "0.000001", "0.0001"],
            "volumePrecision": 2,
            "key": "etceth"
          }
        ]
      }
    }
  }
};
