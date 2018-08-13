import React, { Component } from 'react';
import { connect } from 'dva';
import { ListView } from 'components';
import { SearchBar, Tabs } from 'antd-mobile';
import { routerRedux } from 'dva/router';

const tabs = [
  { title: '自选' },
  { title: 'USDT' },
  { title: 'BTC' },
  { title: 'ETH' },
  { title: 'HT' }
];

const PriceItem = (props) => {
  const item = props.itemInfo
  return (
    <div style={styles.container}>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={styles.font16}>BTC/USDT</div>
        <div style={styles.font11}>24h量 160007</div>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
      }}>
        <div style={styles.font16}>  6956.09</div>
        <div style={styles.font11}>￥1600.38</div>
      </div>
      <div style={styles.button}>
        -0.25%
      </div>
    </div>
  )
}

class PricePage extends Component {

  componentDidMount() {
    this.props.getTicker();
  }

  render() {
    const { ticker, loading } = this.props;
    return (
      <div>
        <SearchBar
          placeholder="搜索币种"
          maxLength={20} />
        <Tabs
          tabs={tabs}
          initialPage={1}
          tabBarActiveTextColor="#35BAA0"
          tabBarInactiveTextColor="#797F85"
          onChange={(tab, index) => { 
            console.log('onChange', index, tab); 
          }}
          onTabClick={(tab, index) => {
             console.log('onTabClick', index, tab); 
            }}
        >
          <ListView
            data={ticker}
            ListItem={PriceItem}
            loading={loading}
          />
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ticker: state.price.ticker,
  loading: state.loading.effects['price/fetch']
})

const mapDispatchToProps = (dispatch) => ({
  getTicker: () => {
    dispatch({ type: 'price/fetch' });
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
    height: 45,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E26A6A',
    height: 30,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font11: {
    color: '#797F85', fontSize: 11, marginTop: 8
  },
  font16: {
    color: '#323B43', fontSize: 16
  }
}