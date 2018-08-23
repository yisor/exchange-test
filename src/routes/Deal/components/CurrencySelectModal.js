/*
 * @Author: lsl
 * @Date: 2018-08-15 16:50:14
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-23 13:41:43
 * @Desc 币种选择
 */
import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { intlShape } from 'react-intl';
import { PriceList, SearchBar } from 'components';


class CurrencySelectModal extends Component {

  static contextTypes = {
    intl: intlShape
  }

  state = {
    curTickers: null,
  }

  filterTickers = (currency) => {
    const { tickers } = this.props;
    const curTickers = tickers.filter((item) => {
      const { name, key } = item.coinInfo;
      return name.indexOf(currency) !== -1 || key.indexOf(currency) !== -1;
    });
    this.setState({ curTickers });
  }
  render() {
    const formatMsg = this.context.intl.formatMessage;
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
        <SearchBar
          placeholder={formatMsg({ id: 'price.search' })}
          maxLength={20}
          showCancelButton
          onCancel={() => { onClose() }}
          onChange={(text) => {
            this.filterTickers(text);
          }}
        />
        <PriceList
          tickers={this.state.curTickers ? this.state.curTickers : tickers}
          loading={loading}
          onItemClick={(item) => { onClose(); onItemClick(item) }}
        />
      </Modal>
    );
  }
}

export default CurrencySelectModal;