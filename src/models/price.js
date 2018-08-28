import { eventChannel } from 'redux-saga';
import * as SocketUtil from 'utils/SocketUtil';


const createEventChannel = (param) => {
  return eventChannel(emit => {
    SocketUtil.createWebSocket(param, (data) => emit({ data: JSON.parse(data) }));
    return () => { };
  });
};

export default {
  namespace: 'price',
  state: {
    tickers: []
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, tickers: payload };
    },
  },
  effects: {
    * getTicker({ payload }, { call, put, take }) {
      const channel = yield call(createEventChannel, payload);
      while (true) {
        const res = (yield take(channel)).data;
        console.log('返回', JSON.stringify(res));
        yield put({ type: 'save', payload: res.data });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // subscriptions
    }
  }
};
