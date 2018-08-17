/**
 * Created by zhoujianxin on 2018/8/13.
 * @Desc
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex } from 'antd-mobile';
import Stepper from './components/Stepper'
import { RestingOrder } from 'components'
import { intlShape } from "react-intl";


class MarketPage extends Component {
  static contextTypes = {
    intl: intlShape
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPrice: 19999,
      val: 1,
      data: ''
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        data: 1,
      });
    }, 1000)
  }

  componentWillUnmount(){
    this.timer && clearTimeout(this.timer);
  }

  render() {
    // const formatMessage = this.context.intl.formatMessage;
    return (
      <div >
        <Flex style={{ marginBottom: 15 }} >

          <div style={styles.price}>{this.state.currentPrice}0000000000</div>

          <div style={{ color: '#A0A4A8', fontSize: 11, marginTop: 7 }}>{'≈' + this.state.currentPrice}CNY</div>
          <Stepper maxNum={6}
            onClick={this.onChange}
            defaultVal={this.state.val}
          />
        </Flex>
        <RestingOrder onItemClick={(data) => this.onClick(data)}
          data={{ '1': [1, 2, 3, 4, 5], '2': [1, 2, 3, 4, 5] }}
        />
      </div>
    );
  }

  onChange = (val) => {
    this.setState({ val });
  }
  onClick = (data) => {
    this.props.onClick && this.props.onClick(data)
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);

const styles = {
  price: {
    color: '#35BAA0',
    fontSize: 20,
    marginLeft: 10
  },
}
