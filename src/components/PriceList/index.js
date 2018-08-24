/*
 * @Author: lsl
 * @Date: 2018-08-16 09:31:49
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-24 16:37:22
 */
import React, { Component } from 'react';
import { intlShape } from 'react-intl';
import { Tabs } from 'antd-mobile';
import { ListView, SearchBar } from 'components';

const tabs = (formatMessage) => (
  [
    { title: formatMessage({ id: 'price.favorites' }) },
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
    </div>
  );
};

class PriceList extends Component {

  static contextTypes = {
    intl: intlShape
  }

  state = {
    curTickers: null,
  }

  onTabChange = (tab, index) => {
    // tab切换
  }

  onItemClick = (item) => {
    const { onItemClick } = this.props;
    onItemClick && onItemClick(item);
  }

  filterTickers = (currency) => {
    const { tickers } = this.props;
    const curTickers = tickers.filter((item) => {
      const { baseCoin, quoteCoin } = item.coinInfo;
      return baseCoin.indexOf(currency) !== -1 || quoteCoin.indexOf(currency) !== -1;
    });
    this.setState({ curTickers });
  }

  render() {
    const { curTickers } = this.state;
    const formatMsg = this.context.intl.formatMessage;
    const { tickers, loading, onCancel, showCancelButton = false } = this.props;
    return (
      <div>
        <SearchBar
          placeholder={formatMsg({ id: 'price.search' })}
          maxLength={20}
          showCancelButton={showCancelButton}
          onCancel={() => { onCancel() }}
          onChange={(text) => {
            this.filterTickers(text);
          }}
        />
        <Tabs
          tabs={tabs(formatMsg)}
          initialPage={1}
          tabBarActiveTextColor="#35BAA0"
          tabBarInactiveTextColor="#797F85"
          onChange={this.onTabChange}
        >
          <ListView
            data={curTickers ? curTickers : tickers}
            ListItem={PriceItem}
            loading={loading}
            onItemClick={this.onItemClick}
            offsetHeight={100}
          />
        </Tabs>
      </div>
    );
  }
}

export default PriceList;

const styles = {
  container: {
    display: 'flex',
    flex: 1,
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