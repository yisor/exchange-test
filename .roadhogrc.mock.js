import entryOrderData from './mock/entryOrderData.json';
import rate from './mock/rate.json';
import order from './mock/order.json';
import ticker from './mock/ticker.json';
import balance from './mock/balance.json';
import coinPairs from './mock/coinPairs.json';

export default {
  // 支持值为 Object 和 Array
  '/api/users': { users: [{ id: 1, name: '测试用户' }, { id: 2, name: '游客' }] },
  '/api/get_ticker': ticker,
  '/api/getEntryOrderData': entryOrderData,
  '/api/getBalanceData': balance,
  '/api/getOrderData': order,
  '/exchange/appapi/coinPairs': coinPairs,
  '/exchange/appapi/rate': rate
};
