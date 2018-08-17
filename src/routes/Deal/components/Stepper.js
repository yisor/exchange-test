import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex,Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';


class stepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val:1,
      add:false,
      sub:false,
    };
  }
  componentDidMount() {
    this.setState({
      val:this.props.defaultVal?this.props.defaultVal:1,
      sub:this.state.val===1?true:false
    })
  }

  render() {
    const {  hideVal } = this.props;
    return (
      <div style={styles.container}>
        <Flex>
          <Button onClick={()=>this.onClick('-')} style={styles.button} disabled={this.state.sub}>-</Button>
          {!hideVal?<div>{this.state.val}</div>:null}
          <Button onClick={()=>this.onClick('+')} style={styles.button} disabled={this.state.add}>+</Button>
        </Flex>
      </div>
    );
  }

  onClick=(type)=>{
    const {maxNum} = this.props;
    if(type==='-'){
      this.setState({
        sub:this.state.val>2?false:true,
        val:this.state.val>1?this.state.val-1:1,
        add:false
      },()=>{
        this.props.onClick&&this.props.onClick(this.state.val);
      })
    }else if(type==='+') {
      this.setState({
        add:this.state.val<maxNum-1?false:true,
        val:this.state.val<maxNum?this.state.val+1:maxNum,
        sub:false
      },()=>{
        this.props.onClick&&this.props.onClick(this.state.val);
      })
    }
  }

}

const mapStateToProps = (state) => ({
  ticker: state.price.ticker,
  loading: state.loading.effects['price/fetch']
})

const mapDispatchToProps = (dispatch) => ({
  getTicker: () => {
    dispatch({ type: 'price/fetch' });
  },
  changeUrl: (url) => {
    dispatch(routerRedux.push(url));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(stepper);

const styles = {
  container: {
    display: 'flex',
    margin:5

  },
  button: {
    display: 'flex',
    // backgroundColor: '#E26A6A',
    height: 20,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
}
