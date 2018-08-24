/**
 * Created by zhoujianxin on 2018/8/24.
 * @Desc
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {Flex} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import DealCss from './DealPage.css';
import { intlShape } from 'react-intl';

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

class OrderList extends Component {

  static contextTypes = {
    intl: intlShape
  }
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    const formatMessage = this.context.intl.formatMessage;
    const { orderList, data } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10, marginRight: 10}}>
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
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);

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
    color: '#797F85',
    fontSize: 11,
    textAlign: 'center'
  },
  font16: {
    fontSize: 16
  }
};
