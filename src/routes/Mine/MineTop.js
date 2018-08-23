import  { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './MinePage.css';
import orderImg from '../../assets/mine/mine_order.svg';


class MineTop extends Component {

  render() {
    return (
      <div className={styles.mineTop}>
        <Flex style={{
          textAlign: 'left',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '30px'
        }}>
          <Flex.Item style={{
            flexGrow: '0.1',
            textAlign: 'center'
          }}>
            <img src={orderImg} />
          </Flex.Item>
          <Flex.Item>
            <div className={styles.userName}>
              {'Hi,739191589@qq.com'}
            </div>
            <div className={styles.userId}>
              {'UID:50664855'}
            </div>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default MineTop;
