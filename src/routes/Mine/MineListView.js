import React from 'react';
import { List, WhiteSpace  } from 'antd-mobile';
import styles from './MinePage.css';


import orderImg from '../../assets/mine/mine_order.svg';
const Item = List.Item;

class MineListView extends React.Component {


  render() {
    return (
      <div className={styles.MineList}>
        <WhiteSpace />
        <List>
          <Item
            thumb={orderImg}
            arrow="horizontal"
            extra={<img src={orderImg} />}
          >
            我的订单
          </Item>
          <Item
            thumb={orderImg}
            arrow="horizontal"
          >
            我的订单
          </Item>

        </List>
        <WhiteSpace />
      </div>
    );
  }
}

export default MineListView;
