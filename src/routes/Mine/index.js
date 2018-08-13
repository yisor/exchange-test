import React, { Component } from 'react';
import styles from './MinePage.css';

class MinePage extends Component {
  render() {
    return (
      <div className={styles.app}>
        <header className={styles.appHeader} />
        <div className={styles.mainContent}>
          我的
        </div>
      </div>
    );
  }
}

export default MinePage;