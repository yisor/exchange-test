
import React from 'react';
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/chart/candlestick' //引入K线
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/dataZoom'


export default class Candlestick extends React.Component {

  constructor(props) {
    super(props);
    this.initChart = this.initChart.bind(this);
  }
  
  initChart() {
    const { option={} } = this.props;
    console.log(option);
    
    let myChart = echarts.init(this.ID)

    //设置options
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
  }

  componentDidMount() {
    this.initChart()
  }

  UNSAFE_componentWillUpdate() {
    this.initChart()
  }
  
  render() {
    const { width='100%', height='400px' } = this.props;
    return <div ref={ID => this.ID = ID} style={{width, height}}></div>
  }
}
