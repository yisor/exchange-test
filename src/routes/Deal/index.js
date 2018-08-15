import React, { Component } from 'react';
import { connect } from 'dva';
import { ListView } from 'components';
import { Flex, PullToRefresh } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import MarketPage from './Market'
import DealView from './DealView'


const header = ({data,onClick=()=>{}}) => {
  return (
    <Flex style={{height:44}}>
      <img
        src={require('../../assets/Deal/change.png')}
        style={{ width: 24, height: 24,marginRight:12,marginLeft:10 }} alt="" />
      <div style={{fontSize:16,fontWeight:"bold"}}>BTC/USDT</div>
    </Flex>
  )
}

class DealPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
    };
  }

  componentDidMount() {
    this.props.getTicker();
  }

  render() {
    const { ticker, loading } = this.props;
    return (
      <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
        {header(1, 1)}
        <MarketPage/>

        {/*<div style={{display: 'flex', flex: 1, width: '100%', overflowY: "auto"}}>*/}
          <PullToRefresh
            damping={60}
            ref={el => this.ptr = el}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}
            indicator={{activate:'您hhhhh',deactivate: '上拉可以刷新'}}
            direction={'down'}
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({refreshing: true});
              setTimeout(() => {
                this.setState({refreshing: false});
              }, 1000);
            }}
          >
            <div>
              <DealView/>
            </div>
          </PullToRefresh>
        {/*</div>*/}

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
