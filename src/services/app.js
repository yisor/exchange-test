import request from '../utils/request';
import api from 'constants/api';

/**
 * 登录
 * @param {*} params
 */
export function login(params) {
  return request(api.login, params, 'post');
}

/**
 * 登出
 */
export function logout() {
  return request(api.logout);
}

/**
 * 查询系统支持的所有交易对及精度
 */
export function getSymbol() {
  return request(api.commonSymbol);
}

/**
 * 查询汇率
 */
export function queryRate() {
  return request(api.publicRate);
}

/**
 * 获取当前行情
 * @param {*} symbol 市场标记
 */
export function getTicker(symbol) {
  return request(api.getTicker, symbol);
}

/**
 * 获取当前挂单
 * @param {*} symbol 市场标记
 */
export function getEntryOrderData(payload) {
  return request(api.getEntryOrderData, payload);
}


/**
 * 获取当前用户余额
 * @param {*} symbol 市场标记
 */
export function getBalanceData(payload) {
  return request(api.getBalanceData, payload);
}

/**
 * 获取最新订单
 * @param {*} symbol 市场标记
 */
export function getOrderData(payload) {
  return request(api.getOrderData, payload);
}
