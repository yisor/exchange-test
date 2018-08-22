import React, { Component } from 'react';
import { connect } from 'dva';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import { intlShape } from 'react-intl';
import { routerRedux } from 'dva/router';
import { Flex, PullToRefresh } from 'antd-mobile';
import MarketPage from './Market';
import DealView from './DealView';
import { DocumentTitle } from 'components';
import CurrencySelectModal from './components/CurrencySelectModal';


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
    const height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.ptr).parentNode.offsetTop;
    this.setState({
      height: height,
    });
    this.props.getRestingData();
    this.props.getBalanceData();
    this.props.getOrderList();
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
    // let data = this.props.balanceInfo.map((item,index)=>{})
    this.setState({
      data: item,
    });
  }

  onSelectPrice = (data) => {
    this.setState({
      selectPrice: data,
    });
  }

  onSubmit = (params, type) => {
    alert(`提交${params + '----' + type}`);
  }

  render() {
    const { loading, tickers, restingInfo, balanceInfo, orderList } = this.props;
    const formatMessage = this.context.intl.formatMessage;
    return (
      <DocumentTitle title={formatMessage({ id: 'title.deal' })}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header onSwitch={this.showModal('switchVisible')} data={this.state.data} />
            <MarketPage onClick={this.onSelectPrice} restingInfo={restingInfo} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
  restingInfo: state.deal.restingInfo,
  balanceInfo: state.deal.balanceInfo,
  orderList: state.deal.orderList
});

const mapDispatchToProps = (dispatch) => ({
  getRestingData: (payload) => {
    dispatch({ type: 'deal/getRestingData', payload: payload });
  },
  getBalanceData: (payload) => {
    dispatch({ type: 'deal/getBalanceData', payload: payload });
  },
  getOrderList: (payload) => {
    dispatch({ type: 'deal/getOrderList', payload: payload });
  },
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DealPage);
