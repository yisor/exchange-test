import { getSymbols } from '../services/app';

export default {
  namespace: 'symbols',
  state: [],
  effects: {
    *getSymbols({ payload = {} }, { call, put }) { 
      const response = yield call(getSymbols);
      yield put({ type: 'save', payload: response });
    },
  },
  reducers: {
    save(state, action) {
      return action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'getSymbols' });
        }
      });
    },
  }
};
