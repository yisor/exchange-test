import React, { Component } from 'react';
import { connect } from 'dva';
import { ListView, DocumentTitle } from 'components';
import { Flex, PullToRefresh } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import MarketPage from './Market'
import DealView from './DealView'
import {intlShape} from "react-intl";
import dayjs from 'dayjs'

const header = (data,onClick) => {
  return (
    <Flex style={{height:64, margin:10}}>
      <div onClick={()=>{onClick()}}>
      <img
        src={require('../../assets/Deal/change.png')}
        style={{ width: 24, height: 24,marginRight:12, }} alt="" />
      </div>
      <div style={{fontSize:16,fontWeight:"bold"}}>BTC/USDT</div>
    </Flex>
  )
}

class DealPage extends Component {

  static contextTypes = {
    intl: intlShape
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
      date:dayjs().format('MM-DD HH:mm:ss'),
      selectPrice:''
    };
  }

  componentDidMount() {
    this.props.getTicker();
  }

  deepClick=(data)=>{
    alert(data)
  }

  updateMarket = (data)=>{
    this.setState({
      selectPrice:data
    })
  }

  onSubmit = (data)=>{
    alert(data)
  }

  render() {
    const { ticker, loading } = this.props;

    const formatMessage = this.context.intl.formatMessage;
    return (
      <DocumentTitle title={formatMessage({ id: 'title.deal' })}>
      <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
        {header(1, this.deepClick)}
        <MarketPage onClick={this.updateMarket}/>

        {/*<div style={{display: 'flex', flex: 1, width: '100%', overflowY: "auto"}}>*/}
          <PullToRefresh
            damping={100}
            ref={el => this.ptr = el}
            style={{
              // height: this.state.height,
              overflow: 'auto',
            }}
            indicator={{activate:`下拉刷新,更新时间:${this.state.date}`,finish: `更新完成，最后时间:${this.state.date}`}}
            direction={'down'}
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({
                refreshing: true,
                selectPrice:2222222,
              });
              setTimeout(() => {
                this.setState({
                  refreshing: false,
                  date:dayjs().format('MM-DD HH:mm:ss')
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
        {/*</div>*/}

      </div>
      </DocumentTitle>
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

export default connect(mapStateToProps, mapDispatchToProps)(DealPage);

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
  },
}
