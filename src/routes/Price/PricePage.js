import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Tabs } from 'antd-mobile';
import { intlShape } from 'react-intl';
import { ListView, SearchBar, DocumentTitle } from 'components';

const tabs = (formatMsg) => (
  [
    { title: formatMsg({ id: 'price.favorites' }) },
    { title: 'USDT' },
    { title: 'BTC' },
    { title: 'ETH' },
    { title: 'HT' }
  ]);

const PriceItem = (props) => {
  const { itemInfo, onItemClick } = props;
  return (
    <div style={styles.container} onClick={() => onItemClick(itemInfo)}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
        <div style={styles.font16}>
          BTC<font style={{ ...styles.font11, marginLeft: 7 }}>/USDT</font>
        </div>
        <div style={{ ...styles.font11, marginTop: 8 }}>
          {`24h量 ${itemInfo.vol}`}
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
      }}>
        <div style={styles.font16}>{` ${itemInfo.last}`}</div>
        <div style={{ ...styles.font11, marginTop: 8 }}>￥1600.38</div>
      </div>
      <div style={styles.button}>
        -0.25%
      </div>
    </div>
  )
}

class PricePage extends Component {

  static contextTypes = {
    intl: intlShape
  }

  componentDidMount() {
    const { symbols } = this.props;
    this.fetchTicker(symbols);
  }

  fetchTicker = (symbols) => {
    const { getTicker } = this.props;
    symbols.forEach(ele => {
      getTicker(ele.symbol);
    });
  }

  onTabChange = (tab, index) => {
    const { optionals, symbols } = this.props;
    switch (index) {
      case 0:
        // 自选
        this.fetchTicker(optionals);
        break;
      case 2:
        this.fetchTicker(symbols);
        break;
      default: break;
    }
  }

  onItemClick = (item) => {
    // alert('点击：' + item.vol);
    const { changeUrl } = this.props;
    changeUrl('/price/detail');
  }

  render() {
    const { tickers, loading } = this.props;
    const formatMessage = this.context.intl.formatMessage;
    return (
      <DocumentTitle title={formatMessage({ id: 'title.price' })}>
        <div>
          <SearchBar
            placeholder={formatMessage({ id: 'price.search' })}
            maxLength={20}
            onChange={(text) => { console.log('输入框：', text) }}
          />
          <Tabs
            tabs={tabs(formatMessage)}
            initialPage={1}
            tabBarActiveTextColor="#35BAA0"
            tabBarInactiveTextColor="#797F85"
            onChange={this.onTabChange}
          >
            <ListView
              data={tickers}
              ListItem={PriceItem}
              loading={loading}
              onItemClick={this.onItemClick}
            />
          </Tabs>
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state) => ({
  symbols: state.app.symbols,
  tickers: state.price.tickers,
  optionals: state.app.optionals,
  loading: state.loading.effects['price/getTicker']
})

const mapDispatchToProps = (dispatch) => ({
  getTicker: (symbol) => {
    dispatch({ type: 'price/getTicker', payload: symbol });
  },
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PricePage);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px 10px 5px 10px'
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E26A6A',
    height: 30,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  font11: {
    color: '#797F85', fontSize: 11,
  },
  font16: {
    color: '#323B43',
    fontSize: 16,
  }
}