import React, { Component } from 'react';
import { intlShape } from 'react-intl';
import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';



class RestingOrderItem extends Component {

  static contextTypes = {
    intl: intlShape
  }

  onClick = (item) => {
    const { onItemClick } = this.props;
    onItemClick && onItemClick(item);
  }

  renderItem = (data, type = false) => {
    const { buyTextColor, sellTextColor, buyBgColor, sellBgColor } = this.props;
    const item = data;
    let arr = [];
    for (let i = 0; i < item.length; i++) {
      let width = Math.ceil(Math.random() * 100);
      let left = type ? '0' : `${100 - width}%`;
      arr.push(
        <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }} key={type + i}>
          <div style={{
            position: 'absolute', left: left, backgroundColor: type ? sellBgColor : buyBgColor,
            zIndex: 1, width: `${width}%`, height: '100%', opacity: 0.15
          }}
          />

          <div style={styles.container} onClick={() => {
            this.onClick(item[i].price);
          }}>
            {type ?
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                flex: 4,
                marginLeft: 4
              }}>
                <div style={{ color: sellTextColor, fontSize: 11 }}>
                  {item[i].price}
                </div>
              </div> :
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
              }}>
                <div style={styles.font11}>{i + 1}</div>
              </div>

            }

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 3,
            }}>
              <div style={{ textAlign: type ? 'left' : 'right', color: '#A0A4A8' }}>
                {item[i].dealVolume}
              </div>
            </div>

            {type ?
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}>
                <div style={styles.font11}>{i + 1}</div>
              </div> :
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'right',
                flex: 4,
                marginRight: 4
              }}>
                <div style={{ color: buyTextColor, fontSize: 11 }}>
                  {item[i].price}
                </div>
              </div>
            }
          </div>
        </div>
      );
    }
    return arr;
  }

  render() {
    const { titleColor, style, buyData, sellData } = this.props;
    const formatMessage = this.context.intl.formatMessage;
    return (
      <div style={{ ...style }}>
        <Flex style={{ alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <Flex>
              <div style={{ flex: 1, textAlign: 'center', color: titleColor }}>{formatMessage({ id: 'deal.buy' })}</div>
              <div style={{ flex: 3, textAlign: 'right', color: titleColor }}>{formatMessage({ id: 'deal.number' })}</div>
              <div style={{ flex: 4, textAlign: 'right', color: titleColor, marginRight: 4 }}>{formatMessage({ id: 'deal.price' })}</div>
            </Flex>
            {this.renderItem(buyData, false)}
          </div>

          <div style={{ flex: 1 }}>
            <Flex>
              <div style={{ flex: 4, textAlign: 'left', color: titleColor, marginLeft: 4 }}>{formatMessage({ id: 'deal.price' })}</div>
              <div style={{ flex: 3, textAlign: 'left', color: titleColor }}>{formatMessage({ id: 'deal.number' })}</div>
              <div style={{ flex: 1, textAlign: 'center', color: titleColor }}>{formatMessage({ id: 'deal.sell' })}</div>
            </Flex>
            {this.renderItem(sellData, true)}
          </div>
        </Flex>
      </div>
    );
  }
}

RestingOrderItem.propTypes = {
  buyData: PropTypes.array,
  sellData: PropTypes.array,
  onClick: PropTypes.func,
  style: PropTypes.object,
  titleColor: PropTypes.string,
  viewColor: PropTypes.string,
  buyTextColor: PropTypes.string,
  buyBgColor: PropTypes.string,
  sellTextColor: PropTypes.string,
  sellBgColor: PropTypes.string,

};

RestingOrderItem.defaultProps = {
  buyData: [],
  sellData: [],
  titleColor: '#A0A4A8',
  buyTextColor: '#35BAA0',
  buyBgColor: '#35BAA0',
  sellTextColor: '#E26A6A',
  sellBgColor: '#E26A6A'
};

export default RestingOrderItem;

const styles = {
  container: {
    zIndex: 2,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: 25,
    justifyContent: 'space-between',
    cursor: 'pointer',
    alignItems: 'center'
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E26A6A',
    height: 30,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font11: {
    color: '#A0A4A8',
    fontSize: 11,
    textAlign: 'center'
  },
  font16: {
    fontSize: 16
  }
};
