import React, { Component } from 'react';
import { intlShape } from 'react-intl';
import styles from './MinePage.css';
import { DocumentTitle } from 'components';
import { candlestickOption, depthmapOption } from 'components/Charts/options';

import { asyncComponent } from 'utils';
const Candlestick = asyncComponent(() => import('components/Charts/Candlestick'));
const Depthmap = asyncComponent(() => import('components/Charts/Depthmap'))

class MinePage extends Component {

  static contextTypes = { intl: intlShape }

  render() {
    const formatMsg = this.context.intl.formatMessage;
    console.log(candlestickOption);
    
    return (
      <DocumentTitle title={formatMsg({ id: 'title.user' })}>
        <div className={styles.app}>
          <header className={styles.appHeader} />
          <div className={styles.mainContent}>
          <Candlestick option={candlestickOption} />
          <Depthmap option={depthmapOption} />
        </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default MinePage;