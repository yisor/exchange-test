
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
  '/api/common/symbol': {
    "btc": [{
      "pricePrecision": 8, "minVolume": "0.01", "minPrice": "0.00000001", "name": "LTC/BTC",
      "dept": ["0.00000001", "0.000001", "0.0001"], "volumePrecision": 2, "key": "ltcbtc"
    },
    {
      "pricePrecision": 8, "minVolume": "0.00000001", "minPrice": "0.00000001", "name": "BCH/BTC",
      "dept": ["0.00000001", "0.000001", "0.0001"], "volumePrecision": 8, "key": "bchbtc"
    },
    {
      "pricePrecision": 8, "minVolume": "0.01", "minPrice": "0.00000001", "name": "ETC/BTC",
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
      "wicc": 824.311215, "bch": 6614843.61252078, "usd": 1294.06768641, "xct": 46.750221765, "xas": 53533125.477,
      "ylb": 647673.0975, "ascs": 588.793725, "btc": 5887937.25, "krw": "1", "etc": 14456.9467267875, "neuc": 905.847380492654,
      "eth": 516971.54745, "usdt": 1070.472559, "itc": 2943.968625, "ltc": 99177.12159147, "swftc": 117.758745
    },
    "en": {
      "bbc": 1, "wicc": 1.49159619028, "bch": 11969.60001537039376, "usd": "1", "xct": 0.08459481250588,
      "xas": 96868.518300184, "ylb": 1171.96843522, "ascs": 1.0654258502, "btc": 10654.258502, "etc": 26.1599336128857,
      "neuc": 1, "eth": 891.33334082, "usdt": 1.0008, "itc": 5.327129251, "ltc": 179.46160871870824, "swftc": 0.21308517004
    },
    "zh": {
      "wicc": 4.90685195, "bch": 39375.9755883494, "usd": 6.3069, "xct": 0.27828860345, "xas": 318664.98521,
      "ylb": 3855.383675, "ascs": 3.50489425, "cny": "1", "btc": 35048.9425, "etc": 86.057420967375, "neuc": 5.26812486405,
      "eth": 3077.3605885, "usdt": 6.31257621, "itc": 17.52447125, "ltc": 590.3685933431, "swftc": 0.70097885
    }
  }
};
