import { getTicker } from '../services/app';

export default {
  namespace: 'deal',
  state: {
    restingData: [],
  },
  reducers: {
    getRestingData(state, { payload }) {
      return { ...state, restingData: payload };
    },
  },
  effects: {
    * getTicker({ payload }, { call, put }) {
      const response = yield call(getTicker, payload.key);
      response['coinInfo'] = payload;
      yield put({ type: 'getRestingData', payload: response });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {

    }
  }
};
