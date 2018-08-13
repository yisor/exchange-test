import { routerRedux } from 'dva/router';
import { login } from '../services/app';

export default {

  namespace: 'user',

  state: { name: '测试', id: 1 },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *login({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(login);
      console.log('Mock返回:', JSON.stringify(response))
      yield put({ type: 'save', payload });
      if (response) {
        yield put({ type: 'price/save', response });
        yield put(routerRedux.push('/price'));
      }
    },
  },

  reducers: {
    save(state, action) {
      return action.payload;
    },
  },

};
