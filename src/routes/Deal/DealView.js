/**
 * Created by zhoujianxin on 2018/8/13.
 * @Desc
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex, Button, Modal, List, } from 'antd-mobile';
import { ListView,} from 'components';
import DealCss from './DealPage.css'
import { intlShape } from 'react-intl';

const styleArr = [
  { borderWidth: 1, borderColor: '#35BAA0', borderStyle: 'solid', marginRight: 10, width: 50, },
  { borderWidth: 1, borderColor: '#D9D9D9', borderStyle: 'solid', marginRight: 10, width: 50, },
]
const textStyleArr = [
  { margin: 5, color: '#35BAA0', textAlign: 'center' },
  { margin: 5, color: '#D9D9D9', textAlign: 'center' },
]

const DealItem = (props) => {
  const item = props.itemInfo
  return (
    <div style={styles.container}>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={styles.font16}>进度{item * 13}%</div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left'
      }}>
        <div style={styles.font16}>BTC/USFT</div>
        <div style={{ color: item % 2 === 0 ? '#E26A6A' : '#35BAA0' }}>({item % 2 === 0 ? '买' : '卖'})</div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
      }}>
        <div style={styles.font16}> 6956.09</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={styles.font16}> 1936</div>
        <div style={styles.button}>
          取消
      </div>
      </div>
    </div>
  )
}

class DealView extends Component {

  static contextTypes = {
    intl: intlShape
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      val: '',
      buyOrSell: 0,//0 是买入 1是卖出
      coinPrice: 0,
      coinNum: 0,
      available: 0,
      sub: false,
      add: false
    };
  }

  componentDidMount() {
    const formatMessage = this.context.intl.formatMessage;
    const { selectPrice } = this.props;
    this.setState({
      coinPrice: selectPrice,
      coinNum: 0,
      val:formatMessage({id:'deal.limit'}),
      available: 133.4444222,
      sub: this.state.coinPrice > 0 ? true : false

    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      coinPrice: nextProps.selectPrice,
      available: 133.4444,
    })
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    })
  };

  onClose = key => () => {
    this.setState({
      [key]: false,
    })
  };

  onChance = (item, key) => {
    this.setState({
      [key]: false,
      val: item
    })
  };

  buyOrSellStatus = (key) => {
    if (key === 0) {
      this.setState({
        buyOrSell: 0
      });
    } else {
      this.setState({
        buyOrSell: 1
      })
    }
  }


  render() {
    const formatMessage = this.context.intl.formatMessage;
    return (
      <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>

        <div>
          <Flex style={{marginLeft: 10, height: 60}}>

            <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
              <div style={this.state.buyOrSell === 0 ? styleArr[0] : styleArr[1]}
                   onClick={() => this.buyOrSellStatus(0)}>
                <div style={this.state.buyOrSell === 0 ? textStyleArr[0] : textStyleArr[1]}>
                  {formatMessage({id: 'deal.buy'})}
                </div>
              </div>

              <div style={this.state.buyOrSell === 1 ? styleArr[0] : styleArr[1]}
                   onClick={() => this.buyOrSellStatus(1)}>
                <div style={this.state.buyOrSell === 1 ? textStyleArr[0] : textStyleArr[1]}>
                  {formatMessage({id: 'deal.sell'})}
                </div>
              </div>
            </div>
            <div style={{textAlign: 'right', marginTop: 10}}>
              <div style={{marginRight: 10, alignItems: "center"}} onClick={this.showModal('modal')}>
                {this.state.val}
                <img
                  src={require('../../assets/Deal/change.png')}
                  style={{width: 12, height: 12, marginRight: 12, marginLeft: 10}} alt=""/>
              </div>
            </div>
          </Flex>
        </div>

        {this.renderInputBtn()}

        <div>
          <div style={{
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            backgroundColor: this.state.buyOrSell === 0 ? '#4DCC7B' : '#CC4D4D'
          }}
               onClick={() => {
                 this.props.onSubmit && this.props.onSubmit({1: 222, 2: 3333})
               }}>
            <div style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
              {this.state.buyOrSell === 0 ? formatMessage({id: 'deal.buy'}) : formatMessage({id: 'deal.sell'})}BTC
            </div>
          </div>
        </div>

        <div style={{width: '100%', height: 8, backgroundColor: '#F0F0F0'}}/>

        {this.renderList()}
        <Modal
          popup
          visible={this.state.modal}
          onClose={this.onClose('modal')}
          animationType="slide-up"
        >
          <List>
            {[formatMessage({id: 'deal.market'}), formatMessage({id: 'deal.limit'})].map((i, index) => (
              <List.Item key={index} onClick={() => this.onChance(i, 'modal')}>{i}</List.Item>
            ))}
            <List.Item>
              <Button style={{backgroundColor: '#4DCC7B'}} type="primary" onClick={this.onClose('modal')}>取消</Button>
            </List.Item>
          </List>
        </Modal>
      </div>
    );
  }

  renderList = () => {
    const formatMessage = this.context.intl.formatMessage;
    return (
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <div>
          <Flex style={{ marginTop: 10, marginBottom: 10 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 10, flex: 1 }}>
              {formatMessage({id:'deal.currentorder'})}
              </div>

            <div style={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}>
              <img
                src={require('../../assets/Deal/change.png')}
                style={{ width: 12, height: 12, marginRight: 12, marginLeft: 10 }} alt="" />
              <div>{formatMessage({id:'deal.all'})}</div>
            </div>
          </Flex>
        </div>
        <ListView
          data={[1, 2, 3, 4]}
          ListItem={DealItem}
        />
      </div>
    );
  }

  renderInputBtn = () => {
    const formatMessage = this.context.intl.formatMessage;
    const { coinNum, coinPrice, available } = this.state;
    let price = coinPrice > 0 && coinNum > 0 ? coinNum * coinPrice : 0;
    return (
      <div style={{marginBottom: 4}}>
        {this.state.val === '限价' || this.state.val === 'Limit' ?
          <Flex style={styles.moneyInput}>
            <div style={{display: 'flex', flex: 3, flexDirection: 'row', justifyContent: 'center',}}>
              <input type="text" value={coinPrice > 0 ? coinPrice : ''}
                     style={{border: 'none', marginLeft: 10}}
                     onChange={this.handleInputChange}
              />
              <div style={{marginRight: 10, fontSize: 16, color: '#A0A4A8'}}>USDT</div>
            </div>
            <div style={styles.btnsStyle}>
              <button className={DealCss.btn} type="button"
                      disabled={this.state.sub}
                      style={styles.btnStyle}
                      onClick={() => {
                        this.addOrSub('-')
                      }}>-
              </button>
              <div style={{height: 16, width: 1, backgroundColor: '#A0A4A8'}}/>
              <button className={DealCss.btn} type="button"
                      disabled={this.state.add}
                      style={styles.btnStyle}
                      onClick={() => {
                        this.addOrSub('+')
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
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <input type="text" value={coinNum > 0 ? coinNum : ''}
                   style={{flex: 1, border: 'none', marginLeft: 10}}
                   onChange={this.handleTextareaChange}
                   placeholder={formatMessage({id: 'deal.number'})}
            />
            <div style={{marginRight: 10, fontSize: 14, color: '#A0A4A8',}}>BTC</div>
          </div>
          <div style={styles.btnsStyle}>
            <button className={DealCss.btn} type="button" style={styles.btnStyle} onClick={() => {
              this.coinNumClick('1/4')
            }}>1/4
            </button>
            <div style={{height: 16, width: 1, backgroundColor: '#A0A4A8'}}/>
            <button className={DealCss.btn} type="button" style={styles.btnStyle} onClick={() => {
              this.coinNumClick('1/2')
            }}>1/2
            </button>
            <div style={{height: 16, width: 1, backgroundColor: '#A0A4A8'}}/>
            <button className={DealCss.btn} type="button" style={styles.btnStyle} onClick={() => {
              this.coinNumClick('1')
            }}>
              {formatMessage({id: 'deal.all'})}
            </button>
          </div>
        </Flex>
        <div style={{marginLeft: 10, color: '#A0A4A8',}}>{formatMessage({id:'deal.avail'})} {available} USDT</div>
        <Flex style={{marginTop: 15, marginBottom: 15}}>
          <div style={{flex: 1, marginLeft: 10, color: '#797F85', fontSize: 18, fontWeight: 'bold'}}>
            {formatMessage({id: 'deal.volumeoftrade'})}
          </div>
          <div style={{marginRight: 10, color: '#A0A4A8'}}>{price}</div>
        </Flex>

      </div>
    )
  }

  //设置inputValue
  handleInputChange = (e) => {
    console.log('e')
    this.setState({
      coinPrice: e.target.value
    });
  }
  //设置textareaValue
  handleTextareaChange = (e) => {
    console.log(e.target.value)
    this.setState({
      coinNum: e.target.value
    })
  }

  addOrSub = (type) => {
    if (type === '-') {
      this.setState({
        sub: this.state.coinPrice > 0 ? false : true,
        coinPrice: this.state.coinPrice > 0 ? Number(this.state.coinPrice) - 1 : 0,
        add: false
      })
    } else if (type === '+') {
      this.setState({
        sub: false,
        coinPrice: Number(this.state.coinPrice) + 1
      })
    }
  }

  coinNumClick = (type) => {
    if (type === '1/4') {
      this.setState({
        coinNum: this.state.available / 4
      })
    } else if (type === '1/2') {
      this.setState({
        coinNum: this.state.available / 2
      })
    } else if (type === '1') {
      this.setState({
        coinNum: this.state.available / 1
      })
    }
  }

}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DealView);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
    margin: 10,
    alignItems: 'center'
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E26A6A',
    justifyContent: 'center',
    alignItems: 'center',
    width: 44
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
    borderWidth: 0.5,
    borderStyle: 'solid',
    height: 44,
    margin: 10
  },
  moneyInput: {
    borderColor: '#D9D9D9',
    borderWidth: 0.5,
    borderStyle: 'solid',
    height: 44,
    margin: 10,
  },
  moneyInput2: {
    borderColor: '#D9D9D9',
    borderWidth: 0.5,
    borderStyle: 'solid',
    height: 44,
    margin: 10,
    backgroundColor: '#F0F0F0'
  },
  btnsStyle: {
    display: 'flex',
    flexDirection: 'row',
    flex: 2,
    height: 44,
    borderLeftColor: '#D9D9D9',
    borderLeftWidth: 0.5,
    borderLeftStyle: 'solid',
    alignItems: 'center'
  },
  btnStyle: {
    flex: 1, height: 44,
    color: '#A0A4A8',
    fontSize: 14
  }
}
