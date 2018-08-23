import React, { Component } from 'react';
import { List, WhiteSpace  } from 'antd-mobile';
import styles from './MinePage.css';


import orderImg from '../../assets/mine/mine_order.svg';
const Item = List.Item;

class MineListView extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div className={styles.MineList}>
        <WhiteSpace/>
        <List>
          <Item
            thumb={orderImg}
            arrow="horizontal"
            onClick={console.log("订单详情页")}
            extra={<img src={orderImg}/>}
          >
            我的订单
          </Item>
          <Item
            thumb={orderImg}
            arrow="horizontal"
            onClick={console.log("订单详情页")}
          >
            我的订单
          </Item>

        </List>
        <WhiteSpace/>
      </div>
    )
  }
}

export default MineListView;
