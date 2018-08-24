import entryOrderData from './mock/entryOrderData.json';
import rate from './mock/rate.json';
import order from './mock/order.json';
import ticker from './mock/ticker.json';
import balance from './mock/balance.json';
import coinPairs from './mock/coinPairs.json';

export default {
  // 支持值为 Object 和 Array
  '/api/users': { users: [{ id: 1, name: '测试用户' }, { id: 2, name: '游客' }] },
  '/api/get_ticker': {
    "high": 1, "vol": 10232.26315789, "last": 173.60263169, "low": 0.01,
    "buy": "0.01000000", "sell": "1.12345680", "time": 1514448473626, "rose": -0.2922,
  },
  '/api/get_tickers': ticker,
  '/api/getEntryOrderData': entryOrderData,
  '/api/getBalanceData': balance,
  '/api/getOrderData': order,
  '/exchange/appapi/coinPairs': coinPairs,
  '/exchange/appapi/rate': rate
};
