## 项目结构
```
|- mock
|- node_modules
|- package.json
|- public
|- src
    |- asserts
    |- components
    |- layouts
    |- locales
    |- models
    |- routes
    |- services
    |- utils
    |- router.js
    |- index.js
    |- index.css
|- .editorconfig
|- .eslintrc
|- .gitignore
|- .roadhogrc.mock.js
|- .webpackrc
```

* mock 存放用于 mock 数据的文件；
* public 一般用于存放静态文件，打包时会被直接复制到输出目录(./dist)；
* src 文件夹用于存放项目源代码；
  - asserts 用于存放静态资源，打包时会经过 webpack 处理；
  - components 用于存放 React 组件，一般是该项目公用的无状态组件；
  - layouts 用于存放应用布局文件；
  - locales 用于存放国际化资源；
  - models 用于存放模型文件
  - routes 用于存放需要 connect model 的路由组件；
  - services 用于存放服务文件，一般是网络请求等；
  - utils 工具类库
  - router.js 路由文件
  - index.js 项目的入口文件
  - index.css 一般是共用的样式
* .themes 针对ant-design-mobile文件
* .editorconfig 编辑器配置文件
* .eslintrc ESLint配置文件
* .gitignore Git忽略文件
* .roadhogrc.mock.js Mock配置文件
* .webpackrc 自定义的webpack配置文件，JSON格式，如果需要 JS 格式，可修改为 .webpackrc.js
