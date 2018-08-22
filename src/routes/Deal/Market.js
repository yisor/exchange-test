/**
 * Created by zhoujianxin on 2018/8/13.
 * @Desc
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex } from 'antd-mobile';
import Stepper from './components/Stepper';
import { RestingOrder } from 'components';
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
      if (buy.price >= sell.price) {
        return { price: buy.price, color: '#35BAA0' };
      } else {
        return { price: sell.price, color: '#E26A6A' };
      }
    }
    return { price: 0, color: '#35BAA0' };
  }

  render() {
    // const formatMessage = this.context.intl.formatMessage;
    const { restingInfo } = this.props;
    let currentPrice = this.currentPrice(restingInfo['bids'], restingInfo['asks']);
    return (
      <div>
        <Flex style={{ display: 'flex', marginBottom: 15.0 }}>
          <div style={{ fontSize: 20, marginLeft: 10, color: currentPrice.color }}>{currentPrice.price}</div>
          <div style={{ flex: 1, color: '#A0A4A8', fontSize: 11, marginTop: 7 }}>
            {'≈' + 11111}CNY
          </div>
          <Stepper maxNum={6}
            onClick={this.onChange}
            defaultVal={this.state.val}
          />
        </Flex>
        <RestingOrder
          onItemClick={(data) => this.onClick(data)}
          buyData={restingInfo['bids']}
          sellData={restingInfo['asks']}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);

const styles = {

};
