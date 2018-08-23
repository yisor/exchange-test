import React, { Component } from 'react';
import { intlShape } from 'react-intl';
import { DocumentTitle, ListView } from 'components';
import { NavBar, Icon, Flex, Tabs } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const tabs = (formatMsg) => (
  [
    { title: '当前订单', key: '1' },
    { title: '历史订单', key: '2' },
    { title: '成交订单', key: '3' },
  ]);

const OrderItem = (item) => {
  let index = item.itemInfo;
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
        <div style={styles.font16}>BTC/USFT</div>
        <div style={{ color: index % 2 === 0 ? '#E26A6A' : '#35BAA0' }}>({item % 2 === 0 ? '买' : '卖'})</div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
      }}>
        <div style={styles.font16}> 6956.09</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={styles.font16}> 193676</div>
        <div style={styles.button}
          onClick={() => {
            console.log('1111');
          }}>
          取消
        </div>
      </div>
    </div>
  );
};



class OrderPage extends Component {

  static contextTypes = { intl: intlShape }

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
            initialPage={1}
            tabBarActiveTextColor="#35BAA0"
            tabBarInactiveTextColor="#797F85"
          >
            <div>
              <ListView
                data={[1, 2, 3, 4, 5]}
                ListItem={OrderItem}
                onItemClick={this.onItemClick}
                offsetHeight={100}
              />          </div>
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
    paddingTop: 5,
    paddingBottom: 5,
    margin: 10,
    alignItems: 'center'
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
