/**
 * 获取国际化资源文件
 *
 * @param {string} lang
 * @returns
 */
const getLocale = (lang) => {
  let result = {};
  switch (lang) {
  case 'zh-CN':
    result = require('locales/zh-CN');
    break;
  case 'en-US':
    result = require('locales/en-US');
    break;
  default:
    result = require('locales/zh-CN');
  }
  return result.default || result;
};

export default{
  getLocale,
};