import { getTicker } from '../services/app';

export default {
  namespace: 'price',
  state: {
    tickers: []
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, tickers: state.tickers.concat(payload) };
    },
  },
  effects: {
    * getTicker({ payload }, { call, put }) {
      const response = yield call(getTicker, payload.key);
      response['coinInfo'] = payload;
      yield put({ type: 'save', payload: response });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {

    }
  }
};