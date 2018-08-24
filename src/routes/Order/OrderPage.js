import React, { Component } from 'react';
import { intlShape } from 'react-intl';
import { DocumentTitle, ListView } from 'components';
import { NavBar, Icon, Flex, Tabs } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Circle from 'react-circle';

const tabs = (formatMsg) => (
  [
    { title: '当前订单', key: '1' },
    { title: '历史订单', key: '2' },
    { title: '成交订单', key: '3' },
  ]);
const orderTitle = [
  ['市场', '价格', '数量'],
  ['市场', '价格/成交均价', '数量/成交数量'],
  ['市场', '价格', '数量'],
];


class OrderPage extends Component {

  static contextTypes = { intl: intlShape }
  state={
    tab: 0
  }
  changeState= (tab, index) => {
    this.setState({
      tab: index
    });
  }

  OrderItem = (item) => {
    let index = item.itemInfo;
    return (
      <div style={styles.container} key={index}>
        {
          this.state.tab === 0 ?
            <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Circle
                animate={true}
                animationDuration="1s"
                responsive={false} // Boolean: Make SVG adapt to parent size
                size={50} // Number: Defines the size of the circle.
                lineWidth={40} // Number: Defines the thickness of the circle's stroke.
                progress={14.3} // Number: Update to change the progress and percentage.
                progressColor="#1D74A8"  // String: Color of "progress" portion of circle.
                bgColor="#1D2C3C" // String: Color of "empty" portion of circle.
                textColor="#fff" // String: Color of percentage text color.
                textStyle={{font: 'bold 5rem Helvetica, Arial, sans-serif'}}
                percentSpacing={20} // Number: Adjust spacing of "%" symbol and number.
                roundedStroke={true} // Boolean: Rounded/Flat line ends
                showPercentage={true} // Boolean: Show/hide percentage.
                showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
              />
            </div> : null
        }
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'left',
          }}>
            <div style={styles.font16}>BTC/USFT</div>
            <div style={{ color: index % 2 === 0 ? '#E26A6A' : '#35BAA0' }}>({item % 2 === 0 ? '买' : '卖'})</div>
          </div>
          <div style={{
            paddingTop: '10px',
            color: '#a3a3a3',
            fontSize: '12px'
          }}>20180814 11:27:15</div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left'
        }}>
          <div style={styles.font14}> 6956.09</div>
          {
            this.state.tab === 1 ?
              <div style={styles.font14Padding}> 5468532.09</div> : null
          }

        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={styles.font14}> 193676</div>
          {
            this.state.tab === 0 ?
              <div style={styles.button}
                onClick={() => {
                  console.log('1111');
                }}>
                取消
              </div> : null
          }
        </div>
      </div>
    );
  }


  OrderListTitle = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        background: '#18253e',
        color: '#6e889e',
        padding: '10px',
        fontSize: '12px'
      }}>
        {
          this.state.tab === 0 ?
            <div style={{flex: '0 0 40px'}}>{null}</div> : null
        }
        <div style={{minWidth: this.state.tab === 1 ? '28%' : '10%'}}>{orderTitle[this.state.tab][0]}</div>
        <div>{orderTitle[this.state.tab][1]}</div>
        <div>{orderTitle[this.state.tab][2]}</div>
      </div>
    );
  }

  render() {
    const formatMsg = this.context.intl.formatMessage;
    const { goBack } = this.props;
    return (
      <DocumentTitle title={formatMsg({ id: 'title.order' })}>
        <div>
          <NavBar
            mode="dark"
            icon={
              <Flex direction="row" align="center">
                <Icon type="left" />
              </Flex>
            }
            onLeftClick={goBack}
          >订单管理</NavBar>
          <Tabs
            tabs={tabs(1)}
            initialPage={0}
            useOnPan={false}
            tabBarActiveTextColor="#35BAA0"
            tabBarInactiveTextColor="#797F85"
            onChange={this.changeState}
          >
            <div style={{background: '#152137'}}>
              <this.OrderListTitle />
              <ListView
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                ListItem={this.OrderItem}
                onItemClick={this.onItemClick}
                offsetHeight={150}
              /> : null
            </div>
          </Tabs>
        </div>
      </DocumentTitle>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.loading.effects['price/getTicker']
});

const mapDispatchToProps = (dispatch) => ({
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  },
  goBack: () => {
    dispatch(routerRedux.goBack());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px 10px 10px',
    borderBottom: '1px solid rgba(255,255,255,0.5)'
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: '#E26A6A',
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    color: '#7d96ac',
    borderWidth: 1,
    borderStyle: 'slid',
    borderColor: '#D9D9D9',
    padding: '2px 0',
    border: '1px solid #7d96ac'
  },
  font11: {
    color: '#797F85', fontSize: 11, marginTop: 8
  },
  font14: {
    color: '#fff', fontSize: 14
  },
  font14Padding: {
    color: '#fff', fontSize: 14, paddingTop: '10px'
  },
  font16: {
    color: '#fff', fontSize: 16
  },

};
