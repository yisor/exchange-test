import { getBalanceData, getOrderData, getEntryOrderData } from '../services/app';
import dayjs from 'dayjs';

export default {
  namespace: 'deal',
  state: {
    entryOrderInfo: [],
    balanceInfo: {},
    orderList: []

  },
  reducers: {
    saveEntryOrderData(state, { payload }) {
      return { ...state, entryOrderInfo: payload };
    },
    saveBalance(state, { payload }) {
      return { ...state, balanceInfo: payload };
    },
    saveOrder(state, { payload }) {
      return { ...state, orderList: payload };
    }

  },
  effects: {
    * getEntryOrderData({ payload }, { call, put }) {
      const response = yield call(getEntryOrderData, payload);
      // response['coinInfo'] = payload;
      yield put({ type: 'saveEntryOrderData', payload: response.data });
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
    },

    * submitOrder({ payload }, { call, put, select }) {
      const response = JSON.parse(JSON.stringify(yield select(state => state.deal.orderList)));
      // response['coinInfo'] = payload;
      let data = {
        'id': 343,
        'side': payload.side,
        'side_msg': payload.side_msg,
        'created_at': dayjs().format('MM-DD HH:mm:ss'),
        'price': { 'title': '委托价', 'amount': 456.33, 'icon': 'https://xxxx.jpg' },
        'volume': { 'title': '委托量', 'amount': 752.33, 'icon': 'https://xxxx.jpg' },
        'remain_volume': { 'title': '剩余量', 'amount': 453.33, 'icon': 'https://xxxx.jpg' },
        'deal_volume': { 'title': '成交量', 'amount': '-', 'icon': 'https://xxxx.jpg' },
        'age_price': { 'title': '成交均价', 'amount': '-', 'icon': 'https://xxxx.jpg' },
        'label': { 'title': '撤销', 'click': 1 }
      };
      response.splice(0, 0, data);
      yield put({ type: 'saveOrder', payload: response });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {

    }
  }
};
