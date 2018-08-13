import dva from 'dva';
import ReactDOM from 'react-dom';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';
import { IntlProvider, addLocaleData } from 'react-intl';
import './index.css';
import { TranslatUtil } from 'utils';

// 1. Initialize
const app = dva({
  history: browserHistory,
  initialState: {},
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/login').default);
app.model(require('./models/price').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
const App = app.start();

const lang = TranslatUtil.getLocale('en-US');
addLocaleData(lang.data);

ReactDOM.render(
  <IntlProvider
    locale={lang.locale}
    messages={lang.messages}
  >
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
