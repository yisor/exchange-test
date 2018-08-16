import React, { Component } from 'react';
import { connect } from 'dva';
import { DocumentTitle } from 'components';
import { Flex, PullToRefresh } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import MarketPage from './Market';
import DealView from './DealView';
import { intlShape } from "react-intl";
import CurrencySelectModal from './components/CurrencySelectModal';


const Header = ({ data, onSwitch = () => { } }) => {
  return (
    <Flex style={{ height: 44 }}>
      <img
        onClick={onSwitch}
        src={require('../../assets/Deal/change.png')}
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
  };

  componentDidMount() {
    this.props.getTicker();
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
  }

  render() {
    const { loading, tickers } = this.props;
    const formatMessage = this.context.intl.formatMessage;
    return (
      <DocumentTitle title={formatMessage({ id: 'title.deal' })}>
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header onSwitch={this.showModal('switchVisible')} />
          <MarketPage />

          <PullToRefresh
            damping={60}
            ref={el => this.ptr = el}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}
            indicator={{ deactivate: '上拉可以刷新' }}
            direction='down'
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({ refreshing: true });
              setTimeout(() => {
                this.setState({ refreshing: false });
              }, 1000);
            }}
          >
            <div>
              <DealView />
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
  tickers: state.price.tickers,
  loading: state.loading.effects['price/getTicker']
})

const mapDispatchToProps = (dispatch) => ({
  getTicker: (symbol) => {
    dispatch({ type: 'price/getTicker', payload: symbol });
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
