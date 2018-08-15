import { getSymbols, queryRate } from '../services/app';

export default {
  namespace: 'app',
  state: {
    tab: 'home',
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
      yield put({ type: 'saveSymbols', payload: { symbols: response } });
    },
    * queryRate({ payload = {} }, { call, put }) {
      const response = yield call(queryRate);
      yield put({ type: 'saveRates', payload: { rates: response } });
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
      return { ...state, symbols: action.payload };
    },
    saveSymbols(state, action) {
      return { ...state, symbols: action.payload };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        switch (pathname) {
          case '/':
            dispatch({ type: 'changeTab', payload: "price" });
            dispatch({ type: 'getBasicSysData' });
            break;
          case '/deal':
            dispatch({ type: 'changeTab', payload: "deal" });
            break;
          case '/mine':
            dispatch({ type: 'changeTab', payload: "mine" });
            break;
          default: break;
        }
      });
    },
  }
};
