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
    console.log(item);
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

          <Flex style={styles.container} onClick={() => { this.onClick(6336.09 + i) }} >
            {type ?
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                flex: 4,
                marginLeft: 4
              }}>
                <div style={{ color: sellTextColor, fontSize: 11 }}> {6336.09 + i}</div>
              </div> :
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'right',
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
              <div style={{ textAlign: type ? 'left' : 'right', color: '#A0A4A8' }}>99</div>
            </div>

            {type ?
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}>
                <div style={styles.font11}>{item.length - i}</div>
              </div> :
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'right',
                flex: 4,
                marginRight: 4
              }}>
                <div style={{ color: buyTextColor, fontSize: 11 }}> {6956.09 + i}</div>
              </div>
            }
          </Flex>
        </div>
      );
    }
    return arr;
  }

  render() {
    const { data, titleColor, style } = this.props;
    const formatMessage = this.context.intl.formatMessage;
    return (
      <div style={{ ...style }}>
        <Flex>
          <div style={{ flex: 1 }}>
            <Flex>
              <div style={{ flex: 1, textAlign: 'center', color: titleColor }}>{formatMessage({ id: 'deal.buy' })}</div>
              <div style={{ flex: 3, textAlign: 'right', color: titleColor }}>{formatMessage({ id: 'deal.number' })}</div>
              <div style={{ flex: 4, textAlign: 'right', color: titleColor, marginRight: 4 }}>{formatMessage({ id: 'deal.price' })}</div>
            </Flex>
            {this.renderItem(data['1'], false)}
          </div>

          <div style={{ flex: 1 }}>
            <Flex>
              <div style={{ flex: 4, textAlign: 'left', color: titleColor, marginLeft: 4 }}>{formatMessage({ id: 'deal.price' })}</div>
              <div style={{ flex: 3, textAlign: 'left', color: titleColor }}>{formatMessage({ id: 'deal.number' })}</div>
              <div style={{ flex: 1, textAlign: 'center', color: titleColor }}>{formatMessage({ id: 'deal.sell' })}</div>
            </Flex>
            {this.renderItem(data['2'], true)}
          </div>
        </Flex>
      </div>
    );
  }
}

RestingOrderItem.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  style: PropTypes.object,
  titleColor: PropTypes.string,
  viewColor: PropTypes.string,
  buyTextColor: PropTypes.string,
  buyBgColor: PropTypes.string,
  sellTextColor: PropTypes.string,
  sellBgColor: PropTypes.string

};

RestingOrderItem.defaultProps = {
  data: {},
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
    height: 30,
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
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
