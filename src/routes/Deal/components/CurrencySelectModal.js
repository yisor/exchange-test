/*
 * @Author: lsl
 * @Date: 2018-08-15 16:50:14
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-22 18:23:30
 * @Desc 币种选择
 */
import React from 'react';
import { Modal, NavBar, Icon } from 'antd-mobile';
import { PriceList } from 'components';

const CurrencySelectModal = (props) => {
  const { tickers, loading, visible, onClose, onItemClick } = props;
  return (
    <Modal
      popup
      visible={visible}
      onClose={onClose}
      maskClosable={false}
      style={{ height: '100vh', width: '100vw' }}
      animationType="slide-down"
    >
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={onClose}
      >选择币种
      </NavBar>
      <PriceList
        tickers={tickers}
        loading={loading}
        onItemClick={(item) => { onClose(); onItemClick(item) }}
      />
    </Modal>
  );
};
export default CurrencySelectModal;