import React, { Component } from 'react';
import { intlShape } from 'react-intl';
import styles from './MinePage.css';
import { DocumentTitle } from 'components';

import MineTop from './MineTop';
import MineListView from './MineListView';

class MinePage extends Component {

  static contextTypes = { intl: intlShape }

  render() {
    const formatMsg = this.context.intl.formatMessage;
    return (
      <DocumentTitle title={formatMsg({ id: 'title.user' })}>
        <div className={styles.app}>
          <div className={styles.mainContent}>
            <MineTop />
            <MineListView />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default MinePage;
