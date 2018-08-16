/*
 * @Author: lsl 
 * @Date: 2018-08-16 09:30:43 
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-16 11:46:15
 */
import React, { Component } from 'react';
import { NavBar, Icon, Flex } from 'antd-mobile';
import { intlShape } from 'react-intl';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './Optional.css';
import { SearchBar } from 'components';


class OptionalAddPage extends Component {
  static contextTypes = {
    intl: intlShape
  }

  render() {
    const { goBack, changeUrl } = this.props;
    const formatMsg = this.context.intl.formatMessage;
    return (
      <div className={styles.container}>
        <SearchBar
          placeholder={formatMsg({ id: 'price.search' })}
          maxLength={20}
          onChange={(text) => { console.log('输入框：', text) }}
          showCancelButton
          onCancel={() => { goBack() }}
        />
        <div className={styles.mainContent} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  },
  goBack: () => {
    dispatch(routerRedux.goBack());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionalAddPage);