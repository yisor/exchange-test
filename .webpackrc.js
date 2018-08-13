import { resolve } from 'path';
export default {
  "theme": "./theme-config.js",
  "extraBabelPlugins": [
    ["module-resolver", { "alias": { "dva": "dva-react-router-3" } }],
    ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib", "style": true }]
  ],
  "proxy": {
    // "/api": {
    //   "target": " http://staging.365os.com/exchange-api/",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api": "" }
    // }
  },
  alias: {
    components: resolve(__dirname, "./src/components"),
    utils: resolve(__dirname, "./src/utils"),
    services: resolve(__dirname, "./src/services"),
    models: resolve(__dirname, "./src/models"),
    routes: resolve(__dirname, "./src/routes"),
    locales: resolve(__dirname, "./src/locales"),
    assets: resolve(__dirname, "./src/assets")
  }
}