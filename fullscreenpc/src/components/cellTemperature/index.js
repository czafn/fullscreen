/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import './cellTemperature.css';
import ReactEcharts from 'echarts-for-react';

require('echarts/map/js/china.js');

class Page extends React.Component {
  constructor(props) {
   super(props);
   this.state = this.getInitialState();
 }
 timeTicket = null;
 getInitialState = () => ({option: this.getOption()});

 componentDidMount() {
   if (this.timeTicket) {
     clearInterval(this.timeTicket);
   }
   this.timeTicket = setInterval(() => {
     const option = this.state.option;
     const r = new Date().getSeconds();
     option.title.text = 'iphone销量' + r;
     option.series[0].name = 'iphone销量' + r;
     option.legend.data[0] = 'iphone销量' + r;
     this.setState({ option: option });
   }, 1000);
 };
 componentWillUnmount() {
   if (this.timeTicket) {
     clearInterval(this.timeTicket);
   }
 };
 randomData() {
   return Math.round(Math.random()*1000);
 };
 getOption = () => {
   return {
     title: {
       text: 'iphone销量',
       subtext: '纯属虚构',
       left: 'center'
     },
     tooltip: {
       trigger: 'item'
     },
     legend: {
       orient: 'vertical',
       left: 'left',
       data:['iphone3','iphone4','iphone5']
     },
     visualMap: {
       min: 0,
       max: 2500,
       left: 'left',
       top: 'bottom',
       text: ['高','低'],       // 文本，默认为数值文本
       calculable: true
     },
     toolbox: {
       show: true,
       orient: 'vertical',
       left: 'right',
       top: 'center',
       feature: {
         dataView: {readOnly: false},
         restore: {},
         saveAsImage: {}
       }
     },
     series: [
       {
         name: 'iphone3',
         type: 'map',
         mapType: 'china',
         roam: false,
         label: {
           normal: {
             show: true
           },
           emphasis: {
             show: true
           }
         },
         data:[
           {name: '北京',value: this.randomData() },
           {name: '天津',value: this.randomData() },
           {name: '上海',value: this.randomData() },
           {name: '重庆',value: this.randomData() },
           {name: '河北',value: this.randomData() },
           {name: '河南',value: this.randomData() },
           {name: '云南',value: this.randomData() },
           {name: '辽宁',value: this.randomData() },
           {name: '黑龙江',value: this.randomData() },
           {name: '湖南',value: this.randomData() },
           {name: '安徽',value: this.randomData() },
           {name: '山东',value: this.randomData() },
           {name: '新疆',value: this.randomData() },
           {name: '江苏',value: this.randomData() },
           {name: '浙江',value: this.randomData() },
           {name: '江西',value: this.randomData() },
           {name: '湖北',value: this.randomData() },
           {name: '广西',value: this.randomData() },
           {name: '甘肃',value: this.randomData() },
           {name: '山西',value: this.randomData() },
           {name: '内蒙古',value: this.randomData() },
           {name: '陕西',value: this.randomData() },
           {name: '吉林',value: this.randomData() },
           {name: '福建',value: this.randomData() },
           {name: '贵州',value: this.randomData() },
           {name: '广东',value: this.randomData() },
           {name: '青海',value: this.randomData() },
           {name: '西藏',value: this.randomData() },
           {name: '四川',value: this.randomData() },
           {name: '宁夏',value: this.randomData() },
           {name: '海南',value: this.randomData() },
           {name: '台湾',value: this.randomData() },
           {name: '香港',value: this.randomData() },
           {name: '澳门',value: this.randomData() }
         ]
       },
       {
         name: 'iphone4',
         type: 'map',
         mapType: 'china',
         label: {
           normal: {
             show: true
           },
           emphasis: {
             show: true
           }
         },
         data:[
           {name: '北京',value: this.randomData() },
           {name: '天津',value: this.randomData() },
           {name: '上海',value: this.randomData() },
           {name: '重庆',value: this.randomData() },
           {name: '河北',value: this.randomData() },
           {name: '安徽',value: this.randomData() },
           {name: '新疆',value: this.randomData() },
           {name: '浙江',value: this.randomData() },
           {name: '江西',value: this.randomData() },
           {name: '山西',value: this.randomData() },
           {name: '内蒙古',value: this.randomData() },
           {name: '吉林',value: this.randomData() },
           {name: '福建',value: this.randomData() },
           {name: '广东',value: this.randomData() },
           {name: '西藏',value: this.randomData() },
           {name: '四川',value: this.randomData() },
           {name: '宁夏',value: this.randomData() },
           {name: '香港',value: this.randomData() },
           {name: '澳门',value: this.randomData() }
         ]
       },
       {
         name: 'iphone5',
         type: 'map',
         mapType: 'china',
         label: {
           normal: {
             show: true
           },
           emphasis: {
             show: true
           }
         },
         data:[
           {name: '北京',value: this.randomData() },
           {name: '天津',value: this.randomData() },
           {name: '上海',value: this.randomData() },
           {name: '广东',value: this.randomData() },
           {name: '台湾',value: this.randomData() },
           {name: '香港',value: this.randomData() },
           {name: '澳门',value: this.randomData() }
         ]
       }
     ]
   };
 };
 render() {
   return (
     <div className='examples'>
       <div className='parent'>
         <label> render a china map. <strong>MAP charts</strong>: </label>
         <ReactEcharts
           option={this.state.option}
           style={{height: '500px', width: '100%'}}
           className='react_for_echarts' />
       </div>
     </div>
   );
 };
}

const mapStateToProps = ({}) => {
    const listData =
    [
      {"update_time":"2017/11/18 04:26:00","RBD":"1727204012","type":"二级"},
      {"update_time":"2017/11/17 22:20:00","RBD":"1719100098","type":"二级"},
      {"update_time":"2017/11/17 22:04:00","RBD":"1627100777","type":"二级"},
      {"update_time":"2017/11/18 10:01:00","RBD":"1702101873","type":"二级"},
      {"update_time":"2017/11/18 09:44:00","RBD":"1727210879","type":"二级"},
      {"update_time":"2017/11/18 09:50:00","RBD":"1719103955","type":"二级"},
      {"update_time":"2017/11/18 10:03:00","RBD":"1724101290","type":"二级"},
      {"update_time":"2017/11/18 04:55:00","RBD":"1627100478","type":"二级"}
    ]
    return {listData};
}
export default connect(mapStateToProps)(Page);
