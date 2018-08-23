/**
 * Created by zhoujianxin on 2018/8/13.
 * @Desc
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex } from 'antd-mobile';
import Stepper from './components/Stepper';
import { EntryOrder } from 'components';
import { intlShape } from 'react-intl';


class MarketPage extends Component {
  static contextTypes = {
    intl: intlShape
  }

  constructor(props) {
    super(props);
    this.state = {
      val: 1,
      data: ''
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        data: 1,
      });
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  onChange = (val) => {
    this.setState({ val });
  }

  onClick = (data) => {
    this.props.onClick && this.props.onClick(data);
  }

  currentPrice = (bids, asks) => {
    let buy = bids && bids[0];
    let sell = asks && asks[0];
    if (buy && sell) {
      // if (buy.price >= sell.price) {
      if (Math.ceil(Math.random() * 100) > 50) {
        return { price: buy.price, color: '#35BAA0' };
      } else {
        return { price: sell.price, color: '#E26A6A' };
      }
    }
    return { price: 0, color: '#35BAA0' };
  }

  render() {
    // const formatMessage = this.context.intl.formatMessage;
    const { entryOrderInfo, rates } = this.props;
    let currentPrice = this.currentPrice(entryOrderInfo['bids'], entryOrderInfo['asks']);
    return (
      <div>
        <Flex style={{ display: 'flex', marginBottom: 15.0 }}>
          <div style={{ fontSize: 20, marginLeft: 10, color: currentPrice.color }}>{currentPrice.price}</div>
          <div style={styles.price}>
            {`≈${rates && rates['zh'] ? rates['zh']['btc'] * currentPrice.price : 0} CNY`}
          </div>
          <Stepper maxNum={6}
            onClick={this.onChange}
            defaultVal={this.state.val}
          />
        </Flex>
        <EntryOrder
          onItemClick={(data) => this.onClick(data)}
          buyData={entryOrderInfo['bids'] ? entryOrderInfo['bids'].slice(0, 5) : []}
          sellData={entryOrderInfo['asks'] ? entryOrderInfo['asks'].slice(0, 5) : []}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rates: state.app.rates
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);

const styles = {
  price: {
    flex: 1,
    color: '#A0A4A8',
    fontSize: 11,
    marginTop: 7
  }
};
