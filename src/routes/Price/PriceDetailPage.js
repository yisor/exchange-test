/*
 * @Author: lsl
 * @Date: 2018-08-16 09:30:43
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-22 17:06:41
 */
import React, { Component } from 'react';
import { NavBar, Icon, Flex, Tabs } from 'antd-mobile';
import { intlShape } from 'react-intl';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './Price.css';
import { asyncComponent } from 'utils';
import { RestingOrder } from 'components';
import { candlestickOption, depthmapOption } from 'components/Charts/options';

const Candlestick = asyncComponent(() => import('components/Charts/Candlestick'));
const Depthmap = asyncComponent(() => import('components/Charts/Depthmap'));

const mockTrades = [
  { time: '15:32:20', price: '0.00862', amount: '2.44002', direction: '买入' },
  { time: '01:02:20', price: '0.00862', amount: '0.0025', direction: '卖出' },
  { time: '01:02:20', price: '0.00862', amount: '0.0025', direction: '卖出' },
  { time: '01:02:20', price: '0.00862', amount: '0.0025', direction: '卖出' },
];

const ActionButton = ({ text, onClick, color }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      flex: 1,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5px 0px 5px 10px'
    }}>
    {text}
  </div>
);

const TradeHeader = () => (
  <Flex
    direction="row"
    justify="between"
    align="center"
    style={{ paddingLeft: 15, paddingRight: 15, height: 40 }}
  >
    <Flex.Item>时间</Flex.Item>
    <Flex.Item>方向</Flex.Item>
    <Flex.Item>价格</Flex.Item>
    <Flex direction="row-reverse" style={{ flex: 1 }}>数量</Flex>
  </Flex>
);

const TradeItem = ({ item }) => (
  <Flex
    direction="row"
    justify="between"
    align="center"
    style={{ height: 45, paddingLeft: 15, paddingRight: 15 }}
  >
    <Flex.Item>{item.time}</Flex.Item>
    <Flex.Item>{item.direction}</Flex.Item>
    <Flex.Item>{item.price}</Flex.Item>
    <Flex direction="row-reverse" style={{ flex: 1 }}>{item.amount}</Flex>
  </Flex>
);

class PriceDetailPage extends Component {
  static contextTypes = {
    intl: intlShape
  }

  componentDidMount() {
    this.props.getRestingData();
  }

  onTabChange = (tab, index) => {

  }

  // 顶部基础数据
  renderTopView() {
    const { state } = this.props.location;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: 18, color: '#35BAA0' }}>{state.last}</div>
          <div style={{ color: '#797F85', marginTop: 8 }}>≈46513.64CNY
            <font style={{ color: '#35BAA0', marginLeft: 5 }}>{`${state.rose}%`}</font>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 120
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}>
            <div>{state.high}</div>
            <div style={{ color: '#797F85' }}>高</div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            marginTop: 8,
            marginBottom: 8
          }}>
            <div>{state.low}</div>
            <div style={{ color: '#797F85' }}>低</div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}>
            <div>{Math.round(state.vol)}</div>
            <div style={{ color: '#797F85' }}>24H量</div>
          </div>
        </div>
      </div>
    );
  }

  renderChartLayout() {
    return (
      <Candlestick option={candlestickOption} />
    );
  }

  renderTabLayout() {
    const { restingInfo } = this.props;
    return (
      <Tabs
        tabs={[{ title: '深度' }, { title: '成交' }]}
        tabBarActiveTextColor="#35BAA0"
        tabBarInactiveTextColor="#797F85"
        onChange={this.onTabChange}
      >
        <div className={styles.mainContent}>
          <Depthmap option={depthmapOption} />
          <RestingOrder
            buyData={restingInfo['bids']}
            sellData={restingInfo['asks']}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        </div>
        <div style={{ marginBottom: 30 }}>
          <TradeHeader />
          {
            mockTrades.map((item, index) => (
              <TradeItem key={index} item={item} />
            ))
          }
        </div>

      </Tabs>
    );
  }

  /**
   * 底部
   */
  renderBottomView() {
    const { changeUrl } = this.props;
    return (
      <div className={styles.tabbar}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
          <ActionButton
            text="买入"
            color="#35BAA0"
            onClick={() => changeUrl('/deal')}
          />
          <ActionButton
            text="卖出"
            color="#EE5C42"
            onClick={() => changeUrl('/deal')}
          />
        </div>
        <div className={styles.optionalTxt}>
          添加自选
        </div>
      </div>
    );
  }

  renderNavBar() {
    const { goBack } = this.props;
    return (
      <NavBar
        mode="dark"
        icon={
          <Flex direction="row" align="center">
            <Icon type="left" />
            <span style={{ marginLeft: 8, fontSize: 14 }}>
              BTC/USDT
            </span>
          </Flex>
        }
        onLeftClick={goBack}
      />
    );
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderNavBar()}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {this.renderTopView()}
          {this.renderChartLayout()}
          {this.renderTabLayout()}
        </div>
        {this.renderBottomView()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading.effects['price/getTicker'],
  restingInfo: state.deal.restingInfo,
});

const mapDispatchToProps = (dispatch) => ({
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  },
  goBack: () => {
    dispatch(routerRedux.goBack());
  },
  getRestingData: () => {
    dispatch({ type: 'deal/getRestingData' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceDetailPage);