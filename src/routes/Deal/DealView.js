/**
 * Created by zhoujianxin on 2018/8/13.
 * @Desc
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex, Button, Modal, List, InputItem } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import DealCss from './DealPage.css';
import { intlShape } from 'react-intl';

const styleArr = [
  { borderWidth: 1, borderColor: '#35BAA0', borderStyle: 'solid', marginRight: 10, width: 50, },
  { borderWidth: 1, borderColor: '#D9D9D9', borderStyle: 'solid', marginRight: 10, width: 50, },
  { borderWidth: 1, borderColor: '#CC4D4D', borderStyle: 'solid', marginRight: 10, width: 50, },
];
const textStyleArr = [
  { margin: 5, color: '#35BAA0', textAlign: 'center' },
  { margin: 5, color: '#D9D9D9', textAlign: 'center' },
  { margin: 5, color: '#CC4D4D', textAlign: 'center' }
];

const DealItem = (item, index, data) => {
  let name = data ? data.name : '';
  return (
    <div style={styles.container} key={index}>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={styles.font16}>进度{index * 13}%</div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left'
      }}>
        <div style={styles.font16}>{name}</div>
        <div style={{ color: item.side === 'sell' ? '#E26A6A' : '#35BAA0' }}>({item.side === 'buy' ? '买' : '卖'})</div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
      }}>
        <div style={styles.font16}> {item.price['amount']}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={styles.font16}> {item.volume['amount']}</div>
        {item.label['click'] === 1 ?
          <div style={styles.button}>
            <div className={DealCss.btn} style={{ color: '#353237' }}
              onClick={() => {
                console.log('1111');
              }}>
              取消
            </div>
          </div> : null
        }
      </div>
    </div>
  );
};

class DealView extends Component {

  static contextTypes = {
    intl: intlShape
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      val: '',
      buyOrSell: 0, // 0 是买入 1是卖出
      coinPrice: 0,
      coinNum: 0,
      available: 0,
      sub: false,
      add: false,
    };
  }

  componentDidMount() {
    const formatMessage = this.context.intl.formatMessage;
    const { selectPrice, data } = this.props;
    this.setState({
      priceName: '',
      coinPrice: selectPrice,
      coinNumName: '',
      coinNum: 0,
      buyOrSell: data.type ? data.type : 0,
      val: formatMessage({ id: 'deal.limit' }),
      available: 133.4444222,
      sub: this.state.coinPrice > 0 ? true : false,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectPrice !== 0 && nextProps.selectPrice !== this.state.coinPrice) {
      let balanceData = nextProps.balanceInfo;
      balanceData['coinInfoName'] = nextProps.data && nextProps.data.name;
      let arr = nextProps.data && nextProps.data.name.split('/');
      this.setState({
        coinPrice: nextProps.selectPrice,
        priceName: arr[1],
        coinNumName: arr[0],
        available: 133.4444222,
        balanceInfo: balanceData,
        buyOrSell: nextProps.data.type ? nextProps.data.type : 0,

      });
    } else {
      let arr = nextProps.data && nextProps.data.name.split('/');
      this.setState({
        priceName: arr[1],
        coinNumName: arr[0],
      });
    }
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };

  onChance = (item, key) => {
    this.setState({
      [key]: false,
      val: item
    });
  };

  buyOrSellStatus = (key) => {
    if (key === 0) {
      this.setState({
        buyOrSell: 0
      });
    } else {
      this.setState({
        buyOrSell: 1
      });
    }
  }



  renderList = () => {
    const formatMessage = this.context.intl.formatMessage;
    const { orderList, data } = this.props;
    return (
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <div>
          <Flex style={{ marginTop: 10, marginBottom: 10 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 10, flex: 1 }}>
              {formatMessage({ id: 'deal.currentorder' })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}
              onClick={() => this.props.changeUrl('/order')}
            >
              <img
                src={require('../../assets/deal/change.svg')}
                style={{ width: 12, height: 12, marginRight: 12, marginLeft: 10 }} alt=""
              />
              <div>{formatMessage({ id: 'deal.all' })}</div>
            </div>
          </Flex>
        </div>
        <div style={{ marginBottom: 64 }}>
          {orderList && orderList.slice(0, 10).map((item, index) => (
            DealItem(item, index, data)
          ))
          }
        </div>
      </div>
    );
  }

  renderInputBtn = () => {
    const formatMessage = this.context.intl.formatMessage;
    const { rates } = this.props;
    const { coinNum, coinPrice, available, priceName, coinNumName } = this.state;
    let price = coinPrice > 0 && coinNum > 0 ? coinNum * coinPrice : 0;
    return (
      <div >
        {this.state.val === '限价' || this.state.val === 'Limit' ?
          <Flex style={styles.moneyInput}>
            <div style={{ display: 'flex', flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
              <List style={{flex: 1 }}>
                <InputItem type="digit" value={coinPrice > 0 ? coinPrice : ''}
                  maxLength={8}
                  style={{ border: 'none', marginLeft: 10, fontSize: 16 }}
                  onChange={this.coinPriceChange}
                  placeholder={formatMessage({ id: 'deal.price' })}
                />
              </List>
              <div style={{display: 'flex', alignItems: 'center' }}>
                <div className={DealCss['product-buyer-name']} style={{ marginRight: 10, fontSize: 12, color: '#A0A4A8', marginTop: 4 }}>
                  {`≈${priceName && rates && rates['zh'] ? (rates['zh'][priceName.toLowerCase()] * coinPrice).toFixed(2) : 0} CNY`}
                </div>
                <div style={{ marginRight: 10, fontSize: 16, color: '#A0A4A8' }}>{priceName}</div>
              </div>
            </div>
            <div style={styles.btnsStyle}>
              <button className={DealCss.btn} type="button"
                disabled={this.state.sub}
                style={styles.btnStyle}
                onClick={() => {
                  this.addOrSub('-');
                }}>-
              </button>
              <div style={{ height: 16, width: 1, backgroundColor: '#A0A4A8' }} />
              <button className={DealCss.btn} type="button"
                disabled={this.state.add}
                style={styles.btnStyle}
                onClick={() => {
                  this.addOrSub('+');
                }}>+
              </button>
            </div>
          </Flex> :
          <Flex style={styles.moneyInput2}>
            <div style={{
              display: 'flex',
              flex: 1, flexDirection: 'row', marginLeft: 10, color: '#A0A4A8',
              alignItems: 'center',
            }}>
              以当前最优价格交易
            </div>
          </Flex>
        }

        <Flex style={styles.numberInput}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <List>
              <InputItem type="digit" value={coinNum > 0 ? coinNum : ''}
                style={{ flex: 1, border: 'none', marginLeft: 10, fontSize: 16 }}
                onChange={this.coinNumChange}
                placeholder={formatMessage({ id: 'deal.number' })}
              />
            </List>
            <div style={{display: 'flex', marginRight: 10, alignItems: 'center' }}>
              <div style={{fontSize: 14, color: '#A0A4A8', }}>
                {coinNumName}
              </div>
            </div>
          </div>
          <div style={styles.btnsStyle}>
            <button className={DealCss.btn} type="button" style={styles.btnStyle1} onClick={() => {
              this.coinNumClick('1/4');
            }}>1/4
            </button>
            <div style={{ height: 16, width: 1, backgroundColor: '#A0A4A8' }} />
            <button className={DealCss.btn} type="button" style={styles.btnStyle1} onClick={() => {
              this.coinNumClick('1/2');
            }}>1/2
            </button>
            <div style={{ height: 16, width: 1, backgroundColor: '#A0A4A8' }} />
            <button className={DealCss.btn} type="button" style={styles.btnStyle1} onClick={() => {
              this.coinNumClick('1');
            }}>
              {formatMessage({ id: 'deal.all' })}
            </button>
          </div>
        </Flex>

        <div style={{ marginLeft: 10, color: '#A0A4A8', }}>
          {formatMessage({ id: 'deal.avail' })} {available} {priceName}
        </div>
        {this.state.val === '限价' || this.state.val === 'Limit' ?
          <Flex style={{ marginTop: 15 }}>
            <div style={{ flex: 1, marginLeft: 10, color: '#797F85', fontSize: 18, fontWeight: 'bold' }}>
              {formatMessage({ id: 'deal.volumeoftrade' })}
            </div>
            <div style={{ marginRight: 10, color: '#A0A4A8' }}>{price}</div>
          </Flex> :
          <div style={{ height: 20, marginTop: 15 }} />
        }

      </div>
    );
  }

  // 设置inputValue
  coinPriceChange = (e) => {
    this.setState({
      coinPrice: e
    });
  }
  // 设置textareaValue
  coinNumChange = (e) => {
    console.log(e + '*****' + this.state.available);
    if (e <= this.state.available) {
      this.setState({
        coinNum: e
      });
    }
  }

  addOrSub = (type) => {
    if (type === '-') {
      this.setState({
        sub: this.state.coinPrice > 0 ? false : true,
        coinPrice: this.state.coinPrice > 0 ? Number(this.state.coinPrice) - 1 : 0,
        add: false
      });
    } else if (type === '+') {
      this.setState({
        sub: false,
        coinPrice: Number(this.state.coinPrice) + 1
      });
    }
  }

  coinNumClick = (type) => {
    if (type === '1/4') {
      this.setState({
        coinNum: this.state.available / 4
      });
    } else if (type === '1/2') {
      this.setState({
        coinNum: this.state.available / 2
      });
    } else if (type === '1') {
      this.setState({
        coinNum: this.state.available / 1
      });
    }
  }

  onSubmit = () => {
    let type = this.state.val === '限价' || this.state.val === 'Limit' ? 'limitPriceEntrust' : 'marketPriceEntrust';

    let params = {
      coinPrice: this.state.coinPrice,
      coinNum: this.state.coinNum,
      val: this.state.val,
      available: 133.12,
      type: type,
    };
    this.props.onSubmit && this.props.onSubmit(params, this.state.buyOrSell);
  }

  render() {
    const formatMessage = this.context.intl.formatMessage;
    const { coinNumName } = this.state;
    return (
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column', marginTop: 5 }} >
        <div>
          <Flex style={{ marginLeft: 10, height: 60 }}>

            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
              <div style={this.state.buyOrSell === 0 ? styleArr[0] : styleArr[1]}
                onClick={() => this.buyOrSellStatus(0)}>
                <div style={this.state.buyOrSell === 0 ? textStyleArr[0] : textStyleArr[1]}>
                  {formatMessage({ id: 'deal.buy' })}
                </div>
              </div>

              <div style={this.state.buyOrSell === 1 ? styleArr[2] : styleArr[1]}
                onClick={() => this.buyOrSellStatus(1)}>
                <div style={this.state.buyOrSell === 1 ? textStyleArr[2] : textStyleArr[1]}>
                  {formatMessage({ id: 'deal.sell' })}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right', marginTop: 10 }}>
              <div style={{ marginRight: 10, alignItems: 'center' }} onClick={this.showModal('modal')}>
                {this.state.val}
                <img
                  src={require('../../assets/deal/change.svg')}
                  style={{ width: 12, height: 12, marginRight: 12, marginLeft: 10 }} alt=""
                />
              </div>
            </div>
          </Flex>
        </div>

        {this.renderInputBtn()}

        <div>
          <div className={DealCss.btn}
            style={{
              display: 'flex',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
              backgroundColor: this.state.buyOrSell === 0 ? '#4DCC7B' : '#CC4D4D'
            }}
            onClick={() => {
              this.onSubmit();
            }}>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
              {this.state.buyOrSell === 0 ? formatMessage({ id: 'deal.buy' }) : formatMessage({ id: 'deal.sell' })}{coinNumName}
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: 8, backgroundColor: '#F0F0F0' }} />

        {this.renderList()}
        <Modal
          popup
          visible={this.state.modal}
          onClose={this.onClose('modal')}
          animationType="slide-up"
        >
          <List>
            {[formatMessage({ id: 'deal.market' }), formatMessage({ id: 'deal.limit' })].map((i, index) => (
              <List.Item key={index} onClick={() => this.onChance(i, 'modal')}>{i}</List.Item>
            ))}
            <List.Item>
              <Button style={{ backgroundColor: '#4DCC7B' }} type="primary" onClick={this.onClose('modal')}>取消</Button>
            </List.Item>
          </List>
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  rates: state.app.rates

});

const mapDispatchToProps = (dispatch) => ({
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DealView);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
    margin: 10,
    alignItems: 'center'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    // backgroundColor: '#E26A6A',
    borderColor: '#817c77',
    borderStyle: 'solid',
    borderWidth: 1
  },
  font11: {
    color: '#797F85', fontSize: 11, marginTop: 8
  },
  font16: {
    color: '#323B43', fontSize: 16
  },
  triangle: {
    height: 0,
    width: 100,
    bordertop: '100px solid red',
    borderright: '37px solid transparent',
  },
  submitBtn: {
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  numberInput: {
    flex: 3,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 44,
    margin: 10
  },
  moneyInput: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 44,
    marginLeft: 10,
    marginRight: 10,
  },
  moneyInput2: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 44,
    margin: 10,
    backgroundColor: '#F0F0F0'
  },
  btnsStyle: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: 44,
    borderLeftColor: '#D9D9D9',
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  btnStyle1: {
    flex: 1,
    height: 40,
    color: '#A0A4A8',
    fontSize: 14
  },
  btnStyle: {
    flex: 1,
    height: 44,
    color: '#A0A4A8',
    fontSize: 14
  }
};
