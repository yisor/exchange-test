import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { TabBar } from 'antd-mobile';
import { injectIntl } from 'react-intl';
import styles from './AppLayout.css';

import tabbarPriceSelect from 'assets/tabbar/tabbar_price.svg';
import tabbarPriceUnselect from 'assets/tabbar/tabbar_price2.svg';
import tabbarDealSelect from 'assets/tabbar/tabbar_deal.svg';
import tabbarDealUnselect from 'assets/tabbar/tabbar_deal.svg';
import tabbarUserSelect from 'assets/tabbar/tabbar_user.svg';
import tabbarUserUnselect from 'assets/tabbar/tabbar_user2.svg';

class AppLayout extends Component {
  render() {
    const { children, changeUrl, intl } = this.props;
    return (
      <div className={styles.app}>
        {children}
        <div className={styles.appTab}>
          <TabBar
            unselectedTintColor="#949494"
            barTintColor="white"
            hidden={false}
          >
            <TabBar.Item
              key="price"
              title={intl.formatMessage({ id: 'tab.price' })}
              icon={
                <img
                  src={tabbarPriceSelect}
                  style={{ width: 22, height: 22 }} alt="" />
              }
              selectedIcon={
                <img
                  src={tabbarPriceUnselect}
                  style={{ width: 22, height: 22 }} alt="" />
              }
              onPress={() => { changeUrl('/') }}
            />

            <TabBar.Item
              key="deal"
              title={intl.formatMessage({ id: 'tab.deal' })}
              icon={
                <img
                  src={tabbarDealSelect}
                  style={{ width: 22, height: 22 }} alt="" />
              }
              selectedIcon={
                <img
                  src={tabbarDealUnselect}
                  style={{ width: 22, height: 22 }} alt="" />
              }
            />

            <TabBar.Item
              key="mine"
              title={intl.formatMessage({ id: 'tab.mine' })}
              icon={
                <img
                  src={tabbarUserSelect}
                  style={{ width: 22, height: 22 }} alt="" />
              }
              selectedIcon={
                <img
                  src={tabbarUserUnselect}
                  style={{ width: 22, height: 22 }} alt="" />
              }
              onPress={() => { changeUrl('/mine') }}
            />
          </TabBar>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AppLayout));
