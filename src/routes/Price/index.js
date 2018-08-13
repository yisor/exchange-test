import React, { Component } from 'react';
import { connect } from 'dva';
import { ListView, } from 'components';
import { Tabs, SearchBar } from 'antd-mobile';
import { routerRedux } from 'dva/router';

const tabs = [
  { title: '自选' },
  { title: 'USDT' },
  { title: 'BTC' },
  { title: 'ETH' },
  { title: 'HT' }
];

const PriceItem = (props) => {
  const item = props.itemInfo;
  return (
    <div style={styles.container}>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={styles.font16}>
          BTC<font style={styles.font11}>/USDT</font>
        </div>
        <div style={[styles.font11, { marginTop: 9 }]}>
          {`24h量 ${item.vol}`}
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
      }}>
        <div style={styles.font16}>{` ${item.last}`}</div>
        <div style={[styles.font11, { marginTop: 9 }]}>￥1600.38</div>
      </div>
      <div style={styles.button}>
        -0.25%
      </div>
    </div>
  )
}

class PricePage extends Component {

  componentDidMount() {
    const { symbols, getTicker } = this.props;
    symbols.forEach(ele => {
      getTicker(ele.symbol);
    });
  }

  onTabChange = (tab, index) => {
    console.log('onTabChange', index, tab);
  }

  render() {
    const { tickers, loading } = this.props;
    return (
      <div>
        <SearchBar
          placeholder="搜索币种"
          maxLength={20}
          showCancelButton={false}
          style={{
            textAlign: 'left',
            backgroundColor: 'white',
            borderBottom: '1px solid #ddd',
          }} />
        <Tabs
          tabs={tabs}
          initialPage={1}
          tabBarActiveTextColor="#35BAA0"
          tabBarInactiveTextColor="#797F85"
          onChange={this.onTabChange}
        >
          <ListView
            data={tickers}
            ListItem={PriceItem}
            loading={loading}
          />
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  symbols: state.symbols,
  tickers: state.price.tickers,
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
    color: '#323B43', fontSize: 16
  }
}