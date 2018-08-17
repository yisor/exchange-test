import React, { Component } from 'react';
import { intlShape } from 'react-intl';
import styles from './MinePage.css';
import { DocumentTitle } from 'components';

class MinePage extends Component {

  static contextTypes = { intl: intlShape }

  render() {
    const formatMsg = this.context.intl.formatMessage;
    return (
      <DocumentTitle title={formatMsg({ id: 'title.user' })}>
        <div className={styles.app}>
          <header className={styles.appHeader} />
          <div className={styles.mainContent}>
            我的
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default MinePage;