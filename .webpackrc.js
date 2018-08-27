import { resolve } from 'path';
export default {
  "publicPath": "/",
  "theme": "./theme-config.js",
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        ["module-resolver", { "alias": { "dva": "dva-react-router-3" } }],
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib", "style": true }]
      ]
    },
    production: {
      extraBabelPlugins: [
        ["module-resolver", { "alias": { "dva": "dva-react-router-3" } }],
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib", "style": true }]
      ]
    }
  },
  extraBabelIncludes: [],
  "proxy": {
    "/exchange": {
      "target": "http://192.168.1.149:6674/exchange",
      "changeOrigin": true,
      "pathRewrite": { "^/exchange": "" }
    }
  },
  alias: {
    components: resolve(__dirname, "./src/components"),
    utils: resolve(__dirname, "./src/utils"),
    services: resolve(__dirname, "./src/services"),
    models: resolve(__dirname, "./src/models"),
    routes: resolve(__dirname, "./src/routes"),
    locales: resolve(__dirname, "./src/locales"),
    assets: resolve(__dirname, "./src/assets"),
    constants: resolve(__dirname, "./src/constants")
  }
}