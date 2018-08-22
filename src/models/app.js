import { getSymbol, queryRate } from '../services/app';

export default {
  namespace: 'app',
  state: {
    tab: 'home',
    rates: [],
    symbol: {},
    optionals: [],
  },
  effects: {
    * getBasicSysData({ payload = {}}, { call, put, all }) {
      const [symbol, rates] = yield all([call(getSymbol), call(queryRate)]);
      yield put({ type: 'initParams', payload: { symbol, rates }});
    },
    * getSymbol({ payload = {}}, { call, put }) {
      const response = yield call(getSymbol);
      yield put({ type: 'saveSymbol', payload: { symbol: response }});
    },
    * queryRate({ payload = {}}, { call, put }) {
      const response = yield call(queryRate);
      yield put({ type: 'saveRates', payload: { rates: response }});
    },
  },

  reducers: {
    changeTab(state, action) {
      return { ...state, tab: action.payload };
    },
    initParams(state, action) {
      return { ...state, ...action.payload };
    },
    saveRates(state, action) {
      return { ...state, symbol: action.payload };
    },
    saveSymbol(state, action) {
      return { ...state, symbol: action.payload };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        switch (pathname) {
        case '/':
          dispatch({ type: 'changeTab', payload: 'price' });
          dispatch({ type: 'getBasicSysData' });
          break;
        case '/deal':
          dispatch({ type: 'changeTab', payload: 'deal' });
          break;
        case '/mine':
          dispatch({ type: 'changeTab', payload: 'mine' });
          break;
        default: break;
        }
      });
    },
  }
};
