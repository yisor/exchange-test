/**
 * Created by zhoujianxin on 2018/8/13.
 * @Desc
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex } from 'antd-mobile';
import Stepper from './components/stepper'
import DealPage from './DealPage.css'
import {intlShape} from "react-intl";

const PriceItem = (data, type = false,onClick) => {
  const item = data;
  let arr = []
  for (let i = 0; i < 5; i++) {
    let width = (i+1)*15+'%';
    let left = type?'0':`${100-(i+1)*15}%`;
    arr.push(
      <div style={{display:'flex',flexDirection:'row',position:'relative'}} key={type + i}>
      <div style={{position:'absolute',left:left,backgroundColor: type?'#E26A6A':'#35BAA0',
                    zIndex:1,width:width,height:'100%',opacity:0.15}}
      />

      <Flex style={styles.container} onClick={() => {onClick(6336.09 + i)}} >
        {type ?
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            flex: 4,
            marginLeft:4
          }}>
            <div style={{color: type ? '#E26A6A' : '#35BAA0', fontSize: 11}}> {6336.09 + i}</div>
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
          <div style={{textAlign: type ? 'left' : 'right', color: '#A0A4A8'}}>99</div>
        </div>

        {type ?
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}>
            <div style={styles.font11}>{5 - i}</div>
          </div> :
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'right',
            flex: 4,
            marginRight:4
          }}>
            <div style={{color: type ? '#E26A6A' : '#35BAA0', fontSize: 11}}> {6956.09 + i}</div>
          </div>
        }
      </Flex>
      </div>
    )
  }
  return arr;
}

class MarketPage extends Component {
  static contextTypes = {
    intl: intlShape
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPrice: 19999,
      val: 1
    };
  }

  componentDidMount() { }

  render() {
    const formatMessage = this.context.intl.formatMessage;
    return (
      <div >
        <Flex style={{marginBottom:15}} >
        <div style={{color:'#35BAA0',fontSize:20,marginLeft:10}}>{this.state.currentPrice}0000000000</div>
        <div style={{color:'#A0A4A8',fontSize:11,marginTop:7}}>{'≈'+this.state.currentPrice}CNY</div>
          <Stepper maxNum = {6}
                   onClick={this.onChange}
                   defaultVal={this.state.val}
          />
        </Flex>

        <Flex>
          <div style={{flex:1}}>
            <Flex>
              <div style={{ flex: 1, textAlign: "center", color: '#A0A4A8' }}>买</div>
              <div style={{ flex: 3, textAlign: "right", color: '#A0A4A8' }}>数量</div>
              <div style={{ flex: 4, textAlign: "right", color: '#A0A4A8',marginRight:4 }}>价格</div>
            </Flex>
            {PriceItem(1,false,this.onClick)}
          </div>

          <div style={{flex:1}}>
            <Flex>
              <div style={{ flex: 4, textAlign: "left", color: '#A0A4A8',marginLeft:4 }}>价格</div>
              <div style={{ flex: 3, textAlign: "left", color: '#A0A4A8' }}>数量</div>
              <div style={{ flex: 1, textAlign: "center", color: '#A0A4A8' }}>卖</div>
            </Flex>
            {PriceItem(1,true,this.onClick)}
          </div>
        </Flex>
      </div>
    );
  }

  onChange = (val) => {
    this.setState({ val });
  }
  onClick = (data)=>{
    this.props.onClick&&this.props.onClick(data)
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MarketPage);

const styles = {
  container: {
    zIndex:2,
    display: 'flex',
    flex:1,
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
}
