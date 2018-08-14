import { getSymbols, queryRate } from '../services/app';

export default {
  namespace: 'app',
  state: {
    rates: [],
    symbols: [],
    optionals: [],
  },
  effects: {
    * getBasicSysData({ payload = {} }, { call, put }) {
      const [symbols, rates] = yield [call(getSymbols), call(queryRate)];
      yield put({ type: 'initParams', payload: { symbols, rates } });
    },
    * getSymbols({ payload = {} }, { call, put }) {
      const response = yield call(getSymbols);
      yield put({ type: 'saveSymbols', payload: response });
    },
    * queryRate({ payload = {} }, { call, put }) {
      const response = yield call(queryRate);
      yield put({ type: 'saveRates', payload: response });
    },
  },
  reducers: {
    initParams(state, action) {
      return { ...state, ...action.payload };
    },
    saveRates(state, action) {
      return { ...state, symbols: action.payload };
    },
    saveSymbols(state, action) {
      return { ...state, symbols: action.payload };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'getBasicSysData' })
        }
      });
    },
  }
};
