// # Link https://github.com/AlloyTeam/eslint-config-alloy/blob/master/react.js
module.exports = {
  parser: "babel-eslint",
  extends: "eslint-config-alloy/react",
  rules: {
    'indent': ["error", 2, { SwitchCase: 1, flatTernaryExpressions: true }],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "no-empty-function": "off",
    "no-trailing-spaces": "off",
    'react/jsx-wrap-multilines': "error",
    'react/no-find-dom-node': 'off'
  }
}
