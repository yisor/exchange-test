import React, { Component } from 'react';
import { connect } from 'dva';
import dayjs from 'dayjs';
import { intlShape } from "react-intl";
import { routerRedux } from 'dva/router';
import { Flex, PullToRefresh } from 'antd-mobile';
import MarketPage from './Market';
import DealView from './DealView';
import { DocumentTitle } from 'components';
import CurrencySelectModal from './components/CurrencySelectModal';


const Header = ({ data, onSwitch = () => { } }) => {
  return (
    <Flex style={{ height: 64, margin: 10, }}>
      <img
        onClick={onSwitch}
        src={require('../../assets/deal/change.svg')}
        style={{ width: 24, height: 24, marginRight: 12, marginLeft: 10 }} alt="" />
      <div style={{ fontSize: 16, fontWeight: "bold" }}>BTC/USDT</div>
    </Flex>
  )
}

class DealPage extends Component {

  static contextTypes = {
    intl: intlShape
  }

  state = {
    switchVisible: false,
    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight,
    selectPrice: 0,
  };

  componentDidMount() { }

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
  }

  onSelectPrice = (data) => {
    this.setState({
      selectPrice: data,
    });
  }

  render() {
    const { loading, tickers } = this.props;
    const formatMessage = this.context.intl.formatMessage;
    return (
      <DocumentTitle title={formatMessage({ id: 'title.deal' })}>
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header onSwitch={this.showModal('switchVisible')} />
          <MarketPage onClick={this.onSelectPrice} />

          <PullToRefresh
            damping={100}
            ref={el => this.ptr = el}
            style={{
              // height: this.state.height,
              overflow: 'auto',
            }}
            indicator={{ activate: `下拉刷新,更新时间:${this.state.date}`, finish: `更新完成，最后时间:${this.state.date}` }}
            direction={'down'}
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({
                refreshing: true,
                selectPrice: 2222222,
              });
              setTimeout(() => {
                this.setState({
                  refreshing: false,
                  date: dayjs().format('MM-DD HH:mm:ss')
                });
              }, 1000);
            }}
          >
            <div>
              <DealView selectPrice={this.state.selectPrice}
                onSubmit={this.onSubmit}
              />
            </div>
          </PullToRefresh>
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

})

const mapDispatchToProps = (dispatch) => ({
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DealPage);
