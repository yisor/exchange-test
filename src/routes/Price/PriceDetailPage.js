/*
 * @Author: lsl
 * @Date: 2018-08-16 09:30:43
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-17 16:26:05
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
      alignItems: 'center',
      margin: '5px 0px 5px 10px'
    }}>
    {text}
  </div>
);

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
            <Flex direction="row" align="center">
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
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
            <ActionButton
              text="买入"
              color="#35BAA0"
              onClick={() => changeUrl('/deal')}
            />
            <ActionButton
              text="卖出"
              color="#EE5C42"
              onClick={() => changeUrl('/deal')}
            />
          </div>

          <div className={styles.optionalTxt}>
            添加自选
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PriceDetailPage);