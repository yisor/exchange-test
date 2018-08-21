/*
 * @Author: lsl
 * @Date: 2018-08-16 09:30:43
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-21 15:09:10
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

  // 顶部基础数据
  renderTopView() {
    const { state } = this.props.location;
    console.log('传参：', JSON.stringify(state));
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: 18, color: '#35BAA0' }}>6513.64</div>
          <div style={{ color: '#797F85', marginTop: 8 }}>≈46513.64CNY
            <font style={{ color: '#35BAA0', marginLeft: 5 }}>+1.60%</font>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 120
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}>
            <div>{state.high}</div>
            <div style={{ color: '#797F85' }}>高</div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            marginTop: 8,
            marginBottom: 8
          }}>
            <div>{state.low}</div>
            <div style={{ color: '#797F85' }}>低</div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}>
            <div>{Math.round(state.vol)}</div>
            <div style={{ color: '#797F85' }}>24H量</div>
          </div>
        </div>
      </div>
    );
  }

  renderChartLayout() {
    // TODO 图表
  }

  renderTabLayout() {
    // TODO 图表
  }

  /**
   * 底部
   */
  renderBottomView() {
    const { changeUrl } = this.props;
    return (
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
    );
  }

  render() {
    const { goBack } = this.props;
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
        {this.renderTopView()}
        <div className={styles.mainContent} />
        {this.renderChartLayout()}
        {this.renderTabLayout()}
        {this.renderBottomView()}
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