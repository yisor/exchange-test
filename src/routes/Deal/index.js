import React, { Component } from 'react';
import { connect } from 'dva';
import ReactDOM from 'react-dom';
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
    <Flex style={{ height: 44, marginLeft: 10,marginRight:10,marginTop:5 }}>
      <img
        onClick={onSwitch}
        src={require('../../assets/deal/change.svg')}
        style={{ width: 24, height: 24, marginRight: 12, marginLeft: 10 }} alt="" />
      <div style={{ fontSize: 16, fontWeight: "bold" }}>{data&&data['name']}</div>
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
    height: document.documentElement.clientHeight/2,
    selectPrice: 0,
    day:dayjs().format('MM-DD HH:mm:ss'),
    data:{}
  };

  componentDidMount() {
    const height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.ptr).parentNode.offsetTop;
    this.setState({
      height:height,
      data:{
        "high":1,
        "vol":10232.26315789,
        "last":173.60263169,
        "low":0.01,
        "buy":"0.01000000",
        "sell":"1.12345680",
        "time":1514448473626,
        "coinInfo":{
          "pricePrecision":8,
          "minVolume":"0.01",
          "minPrice":"0.00000001",
          "name":"BTH/USDT",
          "dept":["0.00000001","0.000001","0.0001"],
          "volumePrecision":2,
          "key":"ltcbtc"
        }
      }
    });
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
      data: item,
    });
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
      <DocumentTitle title={formatMessage({id: 'title.deal'})}>
        <div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Header onSwitch={this.showModal('switchVisible')} data={this.state.data['coinInfo']}/>
            <MarketPage onClick={this.onSelectPrice}/>
          </div>

          <div style={{display: 'flex', flexDirection: 'column'}}>
            <PullToRefresh
              damping={100}
              ref={el => this.ptr = el}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              indicator={{activate: `下拉刷新,更新时间:${this.state.day}`, finish: `更新完成，最后时间:${this.state.day}`}}
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
                }, 1000);
              }}
            >
                <DealView selectPrice={this.state.selectPrice}
                          onSubmit={this.onSubmit}
                          data={this.state.data}
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
})

const mapDispatchToProps = (dispatch) => ({
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DealPage);
