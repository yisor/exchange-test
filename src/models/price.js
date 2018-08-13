import { query } from '../services/app';
export default {
  namespace: 'price',
  state: {
    ticker: [
      { "high": 1, "vol": 10232.26315789, "last": 173.60263169, "low": 0.01,
      "buy": "0.01000000", "sell": "1.12345680", "time": 1514448473626 },
    ]
  },
  effects: {
    *fetch({ }, { call, put }) {  // eslint-disable-line
      const response = yield call(query);
      // console.log('Mock返回:', JSON.stringify(response))
      // yield put({ type: 'save', payload: response });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ticker: payload };
    },
  },
};