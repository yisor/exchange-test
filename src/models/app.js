import { getCoinPairs, queryRate } from '../services/app';

export default {
  namespace: 'app',
  state: {
    tab: 'home',
    rates: [],
    coinPairs: [],
    optionals: [],
  },
  effects: {
    * getBasicSysData({ payload = {}}, { call, put, all }) {
      const [coinPairs, rates] = yield all([call(getCoinPairs), call(queryRate)]);
      yield put({ type: 'initParams', payload: { coinPairs, rates }});
    },
    * getCoinPairs({ payload = {}}, { call, put }) {
      const response = yield call(getCoinPairs);
      yield put({ type: 'saveCoinPairs', payload: { coinPairs: response.rates }});
    },
    * queryRate({ payload = {}}, { call, put }) {
      const response = yield call(queryRate);
      yield put({ type: 'saveRates', payload: response });
    },
    * addOptional({ payload = {}}, { call, put }) {
      // TODO 添加自选
    }
  },

  reducers: {
    changeTab(state, action) {
      return { ...state, tab: action.payload };
    },
    initParams(state, action) {
      return { ...state, ...action.payload };
    },
    saveRates(state, action) {
      return { ...state, rates: action.payload };
    },
    saveCoinPairs(state, action) {
      return { ...state, coinPairs: action.payload };
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
