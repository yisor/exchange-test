/*
 * @Author: lsl
 * @Date: 2018-08-16 09:30:43
 * @Last Modified by: lsl
 * @Last Modified time: 2018-08-24 16:43:47
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { intlShape } from 'react-intl';
import { Flex, Icon, Toast } from 'antd-mobile';
import { SearchBar, ListView } from 'components';

const SymbolItem = (props) => {
  const { itemInfo, onItemClick, addFavorites } = props;
  return (
    <Flex align="center" justify="between">
      <div
        onClick={() => onItemClick(itemInfo)}
        style={{
          flex: 1,
          margin: 10,
          fontSize: 16,
          color: '#323B43',
        }}>
        {itemInfo.baseCoin.toUpperCase()}
        <font style={{ color: '#797F85', fontSize: 11, marginLeft: 7 }}>
          {`/${itemInfo.quoteCoin.toUpperCase()}`}
        </font>
      </div>
      <Icon
        type="check-circle-o"
        style={{ margin: 10 }}
        onClick={() => addFavorites(itemInfo)}
      />
    </Flex>
  );
};

class OptionalAddPage extends Component {
  static contextTypes = { intl: intlShape }

  state = { searchSymbols: [] }

  onSearch = (txt) => {
    const { coinPairs } = this.props;
    const searchSymbols = coinPairs.filter((item) => {
      const { baseCoin, quoteCoin } = item;
      return quoteCoin.indexOf(txt) !== -1 || baseCoin.indexOf(txt) !== -1;
    });
    this.setState({ searchSymbols });
  }

  // 点击子项
  onItemClick = (item) => {
    const { baseCoin, quoteCoin } = item;
    const name = `${baseCoin.toUpperCase()}/${quoteCoin.toUpperCase()}`;
    const path = {
      pathname: '/deal',
      state: { name, key: item.key, type: 1 }
    };
    this.props.changeUrl(path);
  }

  // 添加到自选
  addFavorites = (item) => {
    Toast.info('添加自选成功');
  }

  render() {
    const { goBack } = this.props;
    const formatMsg = this.context.intl.formatMessage;
    return (
      <div>
        <SearchBar
          placeholder={formatMsg({ id: 'price.search' })}
          maxLength={20}
          onChange={this.onSearch}
          showCancelButton
          onCancel={() => { goBack() }}
        />
        <ListView
          ref={listview => { this.lv = listview }}
          data={this.state.searchSymbols}
          ListItem={SymbolItem}
          onItemClick={this.onItemClick}
          addFavorites={this.addFavorites}
          offsetHeight={60}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coinPairs: state.app.coinPairs
});

const mapDispatchToProps = (dispatch) => ({
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  },
  goBack: () => {
    dispatch(routerRedux.goBack());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionalAddPage);