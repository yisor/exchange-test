import request from '../utils/request';

export function query() {
  return request('/api/users');
}

/**
 * 登录
 * @param {*} params 
 */
export function login(params) {
  return request('/api/login', params, 'post');
}

/**
 * 登出
 */
export function logout() {
  return request('/api/logout');
}

/**
 * 获取当前行情
 * @param {*} params 
 */
export function getTicker(params) {
  return request('/api/get_ticker', params);
}

/**
 * 查询系统支持的所有交易对及精度
 */
export function getSymbols() {
  return request('/api/common/symbols');
}
