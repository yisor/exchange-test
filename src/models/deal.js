import { getBalanceData, getOrderData, getRestingData } from '../services/app';

export default {
  namespace: 'deal',
  state: {
    restingInfo: [],
    balanceInfo: {},
    orderList: []

  },
  reducers: {
    saveRestingData(state, { payload }) {
      return { ...state, restingInfo: payload };
    },
    saveBalance(state, { payload }) {
      return { ...state, balanceInfo: payload };
    },
    saveOrder(state, { payload }) {
      return { ...state, orderList: payload };
    }

  },
  effects: {
    * getRestingData({ payload }, { call, put }) {
      const response = yield call(getRestingData, payload);
      // response['coinInfo'] = payload;
      yield put({ type: 'saveRestingData', payload: response.data });
    },
    * getBalanceData({ payload }, { call, put }) {
      const response = yield call(getBalanceData, payload);
      // response['coinInfo'] = payload;
      yield put({ type: 'saveBalance', payload: response });
    },
    * getOrderList({ payload }, { call, put }) {
      const response = yield call(getOrderData, payload);
      // response['coinInfo'] = payload;
      yield put({ type: 'saveOrder', payload: response.list });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {

    }
  }
};
