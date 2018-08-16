/*
 * @Author: lsl 
 * @Date: 2018-08-16 09:30:43 
 * @Last Modified by:   lsl 
 * @Last Modified time: 2018-08-16 09:30:43 
 */
import React, { Component } from 'react';
import { NavBar, Icon, Flex } from 'antd-mobile';
import { intlShape } from 'react-intl';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './Price.css';

const ActionButton = ({ text, onClick, color }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      flex: 1,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    {text}
  </div>
)

class PriceDetailPage extends Component {
  static contextTypes = {
    intl: intlShape
  }

  render() {
    const { goBack, changeUrl } = this.props;
    return (
      <div className={styles.container}>
        <NavBar
          mode="dark"
          icon={
            <Flex direction='row' align="center">
              <Icon type="left" />
              <span style={{ marginLeft: 8, fontSize: 14 }}>
                BTC/USDT
              </span>
            </Flex>
          }
          onLeftClick={goBack}
        />
        <div className={styles.mainContent} />
        <div className={styles.tabbar}>
          <ActionButton
            text="买入"
            color="green"
            onClick={() => changeUrl('/deal')} />
          <ActionButton
            text="卖出"
            color="red"
            onClick={() => changeUrl('/deal')} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading.effects['price/getTicker']
})

const mapDispatchToProps = (dispatch) => ({
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  },
  goBack: () => {
    dispatch(routerRedux.goBack());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PriceDetailPage);