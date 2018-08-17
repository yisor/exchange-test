/*
 * @Author: lsl
 * @Date: 2018-08-16 09:31:49
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-17 16:08:17
 */
import React, { Component } from 'react';
import { intlShape } from 'react-intl';
import { Tabs } from 'antd-mobile';
import { ListView } from 'components';

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
  );
};

class PriceList extends Component {

  static contextTypes = {
    intl: intlShape
  }

  onTabChange = (tab, index) => {
    // tab切换
  }

  onItemClick = (item) => {
    const { onItemClick } = this.props;
    onItemClick && onItemClick(item);
  }

  render() {
    const { tickers, loading } = this.props;
    const formatMessage = this.context.intl.formatMessage;
    return (
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