/*
 * @Author: lsl
 * @Date: 2018-08-15 16:50:14
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-23 15:10:24
 * @Desc 币种选择
 */
import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { PriceList } from 'components';


class CurrencySelectModal extends Component {

  render() {
    const { tickers, loading, visible, onClose, onItemClick } = this.props;
    return (
      <Modal
        popup
        visible={visible}
        onClose={onClose}
        maskClosable={false}
        style={{ height: '100vh', width: '100vw' }}
        animationType="slide-down"
      >
        <PriceList
          onCancel={() => { onClose() }}
          showCancelButton
          tickers={tickers}
          loading={loading}
          onItemClick={(item) => { onClose(); onItemClick(item) }}
        />
      </Modal>
    );
  }
}

export default CurrencySelectModal;