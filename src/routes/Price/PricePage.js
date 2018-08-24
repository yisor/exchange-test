/*
 * @Author: lsl
 * @Date: 2018-08-16 09:30:36
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-24 17:52:14
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Tabs, Button } from 'antd-mobile';
import { intlShape } from 'react-intl';
import { ListView, SearchBar, DocumentTitle } from 'components';

const tabs = (formatMsg) => (
  [
    { title: formatMsg({ id: 'price.favorites' }), key: 'favorites' },
    { title: 'USDT', key: 'usdt' },
    { title: 'BTC', key: 'btc' },
    { title: 'ETH', key: 'eth' },
    { title: 'HT', key: 'ht' }
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
          {itemInfo.coinInfo.baseCoin.toUpperCase()}
          <font style={{ ...styles.font11, marginLeft: 7 }}>
            {`/${itemInfo.coinInfo.quoteCoin.toUpperCase()}`}
          </font>
        </div>
        <div style={{ ...styles.font11, marginTop: 8 }}>
          {`24h量 ${Math.round(itemInfo.vol)}`}
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
        {`${(itemInfo.rose).toFixed(2)}%`}
      </div>
    </div >
  );
};


const AddOptionalView = ({ addOptional }) => (
  <div style={{
    display: 'flex',
    height: '70vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <Button
      onClick={addOptional}
      style={{
        fontSize: 14,
        color: '#35BAA0',
        height: 44,
        width: 115
      }}
    >
      添加自选
    </Button>
  </div>
);

class PricePage extends Component {

  static contextTypes = {
    intl: intlShape
  }

  state = {
    curTickers: null,
    selectOptionalEmpty: false
  }

  componentDidMount() {
    const { coinPairs } = this.props;
    if (coinPairs && coinPairs.length > 0) {
      this.fetchTicker(coinPairs);
    }
  }

  fetchTicker = (symbols) => {
    const { getTicker } = this.props;
    symbols.forEach(ele => {
      getTicker(ele);
    });
  }

  filterTickers = (currency) => {
    const { tickers } = this.props;
    const curTickers = tickers.filter((item) => {
      const { baseCoin, quoteCoin } = item.coinInfo;
      return baseCoin.indexOf(currency) !== -1 || quoteCoin.indexOf(currency) !== -1;
    });
    this.setState({ curTickers });
  }

  onTabChange = (tab, index) => {
    console.log('onTabChange:', JSON.stringify(tab));
    const { optionals, coinPairs } = this.props;
    switch (tab.key) {
      case 'favorites':
        // 自选
        this.fetchTicker(optionals);
        this.setState({ selectOptionalEmpty: optionals.length < 1 });
        break;
      default:
        this.fetchTicker(coinPairs);
        this.setState({ selectOptionalEmpty: false });
        break;
    }
  }

  onItemClick = (item) => {
    const path = {
      pathname: '/price/detail',
      state: item
    };
    this.props.changeUrl(path);
  }

  render() {
    const { selectOptionalEmpty, curTickers } = this.state;
    const { tickers, loading, changeUrl, rates } = this.props;
    const zh = rates.filter((item, index) => (item.legalCoinType === 'zh'))[0];
    console.log('汇率:', JSON.stringify(zh));
    const formatMessage = this.context.intl.formatMessage;
    return (
      <DocumentTitle title={formatMessage({ id: 'title.price' })}>
        <div>
          <SearchBar
            placeholder={formatMessage({ id: 'price.search' })}
            maxLength={20}
            onChange={(text) => {
              this.filterTickers(text);
            }}
          />
          <Tabs
            tabs={tabs(formatMessage)}
            initialPage={1}
            tabBarActiveTextColor="#35BAA0"
            tabBarInactiveTextColor="#797F85"
            onChange={this.onTabChange}
          >
            {
              selectOptionalEmpty ?
                <AddOptionalView addOptional={() => changeUrl('/optional')} /> :
                <ListView
                  data={curTickers ? curTickers : tickers}
                  ListItem={PriceItem}
                  loading={loading}
                  onItemClick={this.onItemClick}
                  offsetHeight={100}
                />
            }
          </Tabs>
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state) => ({
  rates: state.app.rates,
  coinPairs: state.app.coinPairs,
  tickers: state.price.tickers,
  optionals: state.app.optionals,
  loading: state.loading.effects['price/getTicker']
});

const mapDispatchToProps = (dispatch) => ({
  getTicker: (symbol) => {
    dispatch({ type: 'price/getTicker', payload: symbol });
  },
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  }
});

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
};