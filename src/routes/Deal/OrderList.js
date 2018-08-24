/**
 * Created by zhoujianxin on 2018/8/24.
 * @Desc
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {Flex} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import Circle from 'react-circle';
import { intlShape } from 'react-intl';

const DealItem = (item, index) => {
  console.log(item);
  return (
    <div style={styles.container} key={index}>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Circle
          animate={true}
          animationDuration="1s"
          responsive={false} // Boolean: Make SVG adapt to parent size
          size={60} // Number: Defines the size of the circle.
          lineWidth={20} // Number: Defines the thickness of the circle's stroke.
          progress={69} // Number: Update to change the progress and percentage.
          progressColor="cornflowerblue"  // String: Color of "progress" portion of circle.
          bgColor="whitesmoke" // String: Color of "empty" portion of circle.
          textColor="hotpink" // String: Color of percentage text color.
          textStyle={{font: 'bold 5rem Helvetica, Arial, sans-serif'}}
          percentSpacing={20} // Number: Adjust spacing of "%" symbol and number.
          roundedStroke={true} // Boolean: Rounded/Flat line ends
          showPercentage={true} // Boolean: Show/hide percentage.
          showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
        />
      </div>
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'left'
        }}>
          <div style={styles.font16}>BTC/LCT</div>
          <div style={{ color: index % 2 === 0 ? '#E26A6A' : '#35BAA0' }}>({item.side === 'buy' ? '买' : '卖'})</div>
        </div>
        <div style={{marginTop: 26}}>{item.created_at}</div>
      </div>


      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
      }}>
        <div style={styles.font16}> 6956.09</div>
      </div>
      {item.label.click === 1 ?
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={styles.font16}> 193676</div>
          <div style={{...styles.button, marginTop: 26}}
            onClick={() => {
              console.log('1111');
            }}>
          取消
          </div>
        </div> : null
      }
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
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{flex: 1}}></div>
          <div style={{flex: 1}}>市场</div>
          <div style={{flex: 1}}>价格</div>
          <div style={{flex: 1}}>数量</div>
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
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
    margin: 10,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: '#E26A6A',
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    color: '#797F85',
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
};
