import React, { Component } from 'react';
import { connect } from 'dva';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import { intlShape } from 'react-intl';
import { routerRedux } from 'dva/router';
import { Flex, PullToRefresh } from 'antd-mobile';
import MarketView from './Market';
import DealView from './DealView';
import { DocumentTitle } from 'components';
import CurrencySelectModal from './components/CurrencySelectModal';
import OrderList from './OrderList';


const Header = ({ data, onSwitch = () => { } }) => {
  return (
    <Flex style={{ height: 44, marginLeft: 10, marginRight: 10, marginTop: 5 }}>
      <img
        onClick={onSwitch}
        src={require('../../assets/deal/change.svg')}
        style={{ width: 24, height: 24, marginRight: 12, marginLeft: 10 }} alt=""
      />
      <div style={{ fontSize: 16, fontWeight: 'bold' }}>{data && data['name']}</div>
    </Flex>
  );
};

class DealPage extends Component {

  static contextTypes = {
    intl: intlShape
  }

  state = {
    switchVisible: false,
    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight / 2,
    selectPrice: 0,
    day: dayjs().format('MM-DD HH:mm:ss'),
    data: { 'name': 'LTC/BTC', 'key': 'ltcbtc' }
  };

  componentDidMount() {
    const data = this.props.location.state;
    console.log(data);
    const height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.ptr).parentNode.offsetTop;
    this.setState({
      height: height,
      data: data ? data : this.state.data,
    });
    this.props.getEntryOrderData();
    this.props.getBalanceData();
    this.props.getOrderList();
    this.props.queryRate();
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  onItemClick = (item) => {
    console.log('选择币种：' + JSON.stringify(item));
    this.setState({
      data: { 'name': item.coinInfo['name'], 'key': item.coinInfo['key'] },
    });
  }

  onSelectPrice = (data) => {
    this.setState({
      selectPrice: data,
    });
  }

  onSubmit = (item, type) => {
    if ((item.type === 'marketPriceEntrust' || item.coinPrice > 0) && item.coinNum > 0) {
      this.setState({
        selectPrice: 0,
      });

      let params = {
        'baseCoin': '',
        'name': item.name,
        'key': item.key,
        'type': item.type,
        'side': type === 0 ? 'buy' : 'sell',
        'side_msg': type === 0 ? '买入' : '卖出',
        'volume': '',
        'symbol': '',
        'quoteCoin': '',
        'feeIsUserPlatformCoin': '',


      };
      this.props.submitOrder(params);
    }
  }

  render() {
    const { loading, tickers, entryOrderInfo, balanceInfo, orderList } = this.props;
    const formatMessage = this.context.intl.formatMessage;
    return (
      <DocumentTitle title={formatMessage({ id: 'title.deal' })}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header onSwitch={this.showModal('switchVisible')} data={this.state.data} />
            <MarketView onClick={this.onSelectPrice} entryOrderInfo={entryOrderInfo} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
            <PullToRefresh
              damping={100}
              ref={el => { this.ptr = el }}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              indicator={{
                activate: `下拉刷新,上次刷新时间:${this.state.day}`,
                // release: `刷新中，刷新时间:${this.state.day}...`,
                finish: `更新完成，最后时间:${this.state.day}`
              }}
              direction={'down'}
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({
                  refreshing: true,
                  // selectPrice: 2222222,
                });
                setTimeout(() => {
                  this.setState({
                    refreshing: false,
                    day: dayjs().format('MM-DD HH:mm:ss')
                  });
                }, 1500);
              }}
            >
              <DealView selectPrice={this.state.selectPrice}
                onSubmit={this.onSubmit}
                data={this.state.data}
                orderList={orderList}
                balanceInfo={balanceInfo}
              />
              <OrderList
                data={this.state.data}
                orderList={orderList}
              />
            </PullToRefresh>
          </div>

          <CurrencySelectModal
            tickers={tickers}
            loading={loading}
            visible={this.state.switchVisible}
            onItemClick={this.onItemClick}
            onClose={this.onClose('switchVisible')}
          />
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state) => ({
  tickers: state.price.tickers,
  entryOrderInfo: state.deal.entryOrderInfo,
  balanceInfo: state.deal.balanceInfo,
  orderList: state.deal.orderList
});

const mapDispatchToProps = (dispatch) => ({
  getEntryOrderData: (payload) => {
    dispatch({ type: 'deal/getEntryOrderData', payload: payload });
  },
  getBalanceData: (payload) => {
    dispatch({ type: 'deal/getBalanceData', payload: payload });
  },
  getOrderList: (payload) => {
    dispatch({ type: 'deal/getOrderList', payload: payload });
  },
  queryRate: (payload) => {
    dispatch({ type: 'app/queryRate', payload: payload });
  },
  submitOrder: (payload) => {
    dispatch({ type: 'deal/submitOrder', payload: payload });
  },
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DealPage);
