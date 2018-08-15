/**
 * Created by zhoujianxin on 2018/8/13.
 * @Desc
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex } from 'antd-mobile';
import Stepper from './components/stepper'


const PriceItem = (data, type = false) => {
  const item = data;
  let arr = []
  for (let i = 0; i < 5; i++) {
    arr.push(
      <Flex style={styles.container} key={type + i}>

        {type ?
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            flex: 4
          }}>
            <div style={{ color: type ? '#E26A6A' : '#35BAA0', fontSize: 11 }}> 6956.09</div>
          </div> :
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'right',
            flex: 1
          }}>
            <div style={styles.font11}>{i + 1}</div>
          </div>

        }

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 3,
        }}>
          <div style={{ textAlign: type ? 'left' : 'right', color: '#A0A4A8' }}>160007</div>
        </div>

        {type ?
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}>
            <div style={styles.font11}>{5 - i}</div>
          </div> :
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'right',
            flex: 4
          }}>
            <div style={{ color: type ? '#E26A6A' : '#35BAA0', fontSize: 11 }}> 6956.09</div>
          </div>
        }

      </Flex>
    )
  }
  return arr;
}

class MarketPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: 19999,
      val: 1
    };
  }

  componentDidMount() { }

  render() {
    return (
      <div >
        <Flex style={{ marginBottom: 15 }} >
          <div style={{ color: '#35BAA0', fontSize: 25, marginLeft: 10 }}>{this.state.currentPrice}</div>
          <div style={{ flex: 2, color: '#A0A4A8', fontSize: 11, marginTop: 7 }}>{'≈' + this.state.currentPrice}CNY</div>
          <Stepper maxNum={6}
            onClick={this.onChange}
            defaultVal={this.state.val}
          />
        </Flex>

        <Flex>
          <Flex.Item>
            <Flex>
              <div style={{ flex: 1, textAlign: "center", color: '#A0A4A8' }}>买</div>
              <div style={{ flex: 3, textAlign: "right", color: '#A0A4A8' }}>数量</div>
              <div style={{ flex: 4, textAlign: "right", color: '#A0A4A8' }}>价格</div>
            </Flex>
            {PriceItem(1, false)}
          </Flex.Item>

          <Flex.Item>
            <Flex>
              <div style={{ flex: 4, textAlign: "left", color: '#A0A4A8' }}>价格</div>
              <div style={{ flex: 3, textAlign: "left", color: '#A0A4A8' }}>数量</div>
              <div style={{ flex: 1, textAlign: "center", color: '#A0A4A8' }}>卖</div>
            </Flex>
            {PriceItem(1, true)}
          </Flex.Item>
        </Flex>

      </div>
    );
  }

  onChange = (val) => {
    this.setState({ val });
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
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
    color: '#A0A4A8',
    fontSize: 11,
    textAlign: 'center'
  },
  font16: {
    fontSize: 16
  }
}
