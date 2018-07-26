/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/dist/echarts.common';
import styled from 'styled-components';
const _ = require('underscore');
const Chart = styled.div`
  .singleBarChart {
    width: 95%;
    height: 95%;
    overflow: hidden;
    ;
  }
`;


class Page extends React.Component {
    constructor(props) {
        super(props);
        // this.timeTicket = null;
    }
    shouldComponentUpdate(nextProps, nextState) {
      const nextData = lodashget(nextProps,'option.series[1].data',[]);
      const curData = lodashget(this.props,'option.series[1].data',[]);
      if( nextData.length === curData.length ){
        if(JSON.stringify(nextData) === JSON.stringify(curData)){
          return false;
        }
      }
      return true;//render
    }

    render() {
        let {option} = this.props;

        return (
            <Chart >
              <ReactEcharts
                  option={option}
                  // lazyUpdate={false}
                  // style={{height: '500px', width: '100%',background: '#ffffff'}}
                  className='singleBarChart' />
            </Chart>
        );
    };
}
/*
const mapStateToProps = ({catlworking}) => {
  const data = [];
  const cycle = lodashget(catlworking,'cycle',[]);
  lodashmap(cycle,(v)=>{
    data.push({
      name:`${lodashget(v,'name',0)}`,
      value:`${lodashget(v,'value',0)}`,
    });
  });
  // console.log(data);
  // let data = [
  //     {"name":"0","value":"132"},
  //     {"name":"0.01","value":"36"},
  //     {"name":"0.02","value":"8"},
  //     {"name":"0.03","value":"18"},
  //     {"name":"0.04","value":"8"},
  //     {"name":"0.05","value":"18"},
  //     {"name":"0.06","value":"7"},
  //     {"name":"0.07","value":"8"},
  //     {"name":"0.08","value":"4"},
  //     {"name":"0.09","value":"4"},
  //     {"name":"0.1","value":"6"},
  //     {"name":"0.11","value":"5"},
  //     {"name":"0.12","value":"5"},
  //     {"name":"0.13","value":"12"},
  //     {"name":"0.14","value":"3"},
  //     {"name":"0.15","value":"3"},
  //     {"name":"0.16","value":"5"},
  //     {"name":"0.17","value":"2"},
  //     {"name":"0.18","value":"5"},
  //     {"name":"0.19","value":"3"},
  //     {"name":"0.2","value":"5"},
  //     {"name":"0.21","value":"2"},
  //     {"name":"0.22","value":"2"},
  //     {"name":"0.23","value":"5"},
  //     {"name":"0.24","value":"3"},
  //     {"name":"0.25","value":"3"},
  //     {"name":"0.26","value":"11"},
  //     {"name":"0.27","value":"1"},
  //     {"name":"0.28","value":"14"},
  //     {"name":"0.29","value":"10"},
  //     {"name":"0.3","value":"17"},
  //     {"name":"0.31","value":"4"},
  //     {"name":"0.32","value":"19"},
  //     {"name":"0.33","value":"13"},
  //     {"name":"0.34","value":"22"},
  //     {"name":"0.35","value":"14"},
  //     {"name":"0.36","value":"13"},
  //     {"name":"0.37","value":"21"},
  //     {"name":"0.38","value":"10"},
  //     {"name":"0.39","value":"23"},
  //     {"name":"0.4","value":"8"},
  //     {"name":"0.41","value":"8"},
  //     {"name":"0.42","value":"18"},
  //     {"name":"0.43","value":"14"},
  //     {"name":"0.44","value":"15"},
  //     {"name":"0.45","value":"15"},
  //     {"name":"0.46","value":"16"},
  //     {"name":"0.47","value":"17"},
  //     {"name":"0.48","value":"22"},
  //     {"name":"0.49","value":"18"},
  //     {"name":"0.5","value":"12"},
  //     {"name":"0.51","value":"8"},
  //     {"name":"0.52","value":"5"},
  //     {"name":"0.53","value":"2"},
  //     {"name":"0.54","value":"7"},
  //     {"name":"0.55","value":"10"},
  //     {"name":"0.56","value":"17"},
  //     {"name":"0.57","value":"16"},
  //     {"name":"0.58","value":"11"},
  //     {"name":"0.59","value":"18"},
  //     {"name":"0.6","value":"19"},
  //     {"name":"0.61","value":"12"},
  //     {"name":"0.62","value":"24"},
  //     {"name":"0.63","value":"30"},
  //     {"name":"0.64","value":"25"},
  //     {"name":"0.65","value":"14"},
  //     {"name":"0.66","value":"27"},
  //     {"name":"0.67","value":"20"},
  //     {"name":"0.68","value":"25"},
  //     {"name":"0.69","value":"22"},
  //     {"name":"0.7","value":"39"},
  //     {"name":"0.71","value":"30"},
  //     {"name":"0.72","value":"32"},
  //     {"name":"0.73","value":"27"},
  //     {"name":"0.74","value":"27"},
  //     {"name":"0.75","value":"51"},
  //     {"name":"0.76","value":"24"},
  //     {"name":"0.77","value":"42"},
  //     {"name":"0.78","value":"31"},
  //     {"name":"0.79","value":"32"},
  //     {"name":"0.8","value":"41"},
  //     {"name":"0.81","value":"56"},
  //     {"name":"0.82","value":"37"},
  //     {"name":"0.83","value":"50"},
  //     {"name":"0.84","value":"36"},
  //     {"name":"0.85","value":"48"},
  //     {"name":"0.86","value":"47"},
  //     {"name":"0.87","value":"49"},
  //     {"name":"0.88","value":"61"},
  //     {"name":"0.89","value":"48"},
  //     {"name":"0.9","value":"46"},
  //     {"name":"0.91","value":"63"},
  //     {"name":"0.92","value":"55"},
  //     {"name":"0.93","value":"71"},
  //     {"name":"0.94","value":"48"},
  //     {"name":"0.95","value":"55"},
  //     {"name":"0.96","value":"71"},
  //     {"name":"0.97","value":"56"},
  //     {"name":"0.98","value":"70"},
  //     {"name":"0.99","value":"60"},
  //     {"name":"1","value":"70"},
  //     {"name":"1.01","value":"71"},
  //     {"name":"1.02","value":"78"},
  //     {"name":"1.03","value":"60"},
  //     {"name":"1.04","value":"75"},
  //     {"name":"1.05","value":"69"},
  //     {"name":"1.06","value":"55"},
  //     {"name":"1.07","value":"83"},
  //     {"name":"1.08","value":"60"},
  //     {"name":"1.09","value":"67"},
  //     {"name":"1.1","value":"83"},
  //     {"name":"1.11","value":"73"},
  //     {"name":"1.12","value":"68"},
  //     {"name":"1.13","value":"80"},
  //     {"name":"1.14","value":"96"},
  //     {"name":"1.15","value":"72"},
  //     {"name":"1.16","value":"77"},
  //     {"name":"1.17","value":"76"},
  //     {"name":"1.18","value":"90"},
  //     {"name":"1.19","value":"65"},
  //     {"name":"1.2","value":"58"},
  //     {"name":"1.21","value":"89"},
  //     {"name":"1.22","value":"82"},
  //     {"name":"1.23","value":"87"},
  //     {"name":"1.24","value":"80"},
  //     {"name":"1.25","value":"70"},
  //     {"name":"1.26","value":"78"},
  //     {"name":"1.27","value":"83"},
  //     {"name":"1.28","value":"110"},
  //     {"name":"1.29","value":"113"},
  //     {"name":"1.3","value":"90"},
  //     {"name":"1.31","value":"93"},
  //     {"name":"1.32","value":"100"},
  //     {"name":"1.33","value":"101"},
  //     {"name":"1.34","value":"139"},
  //     {"name":"1.35","value":"111"},
  //     {"name":"1.36","value":"136"},
  //     {"name":"1.37","value":"157"},
  //     {"name":"1.38","value":"146"},
  //     {"name":"1.39","value":"144"},
  //     {"name":"1.4","value":"142"},
  //     {"name":"1.41","value":"143"},
  //     {"name":"1.42","value":"131"},
  //     {"name":"1.43","value":"133"},
  //     {"name":"1.44","value":"125"},
  //     {"name":"1.45","value":"157"},
  //     {"name":"1.46","value":"138"},
  //     {"name":"1.47","value":"142"},
  //     {"name":"1.48","value":"166"},
  //     {"name":"1.49","value":"134"},
  //     {"name":"1.5","value":"151"},
  //     {"name":"1.51","value":"127"},
  //     {"name":"1.52","value":"142"},
  //     {"name":"1.53","value":"141"},
  //     {"name":"1.54","value":"142"},
  //     {"name":"1.55","value":"146"},
  //     {"name":"1.56","value":"170"},
  //     {"name":"1.57","value":"161"},
  //     {"name":"1.58","value":"160"},
  //     {"name":"1.59","value":"167"},
  //     {"name":"1.6","value":"169"},
  //     {"name":"1.61","value":"163"},
  //     {"name":"1.62","value":"147"},
  //     {"name":"1.63","value":"174"},
  //     {"name":"1.64","value":"168"},
  //     {"name":"1.65","value":"178"},
  //     {"name":"1.66","value":"208"},
  //     {"name":"1.67","value":"158"},
  //     {"name":"1.68","value":"194"},
  //     {"name":"1.69","value":"182"},
  //     {"name":"1.7","value":"172"},
  //     {"name":"1.71","value":"180"},
  //     {"name":"1.72","value":"170"},
  //     {"name":"1.73","value":"159"},
  //     {"name":"1.74","value":"155"},
  //     {"name":"1.75","value":"151"},
  //     {"name":"1.76","value":"146"},
  //     {"name":"1.77","value":"151"},
  //     {"name":"1.78","value":"148"},
  //     {"name":"1.79","value":"155"},
  //     {"name":"1.8","value":"161"},
  //     {"name":"1.81","value":"154"},
  //     {"name":"1.82","value":"124"},
  //     {"name":"1.83","value":"156"},
  //     {"name":"1.84","value":"155"},
  //     {"name":"1.85","value":"117"},
  //     {"name":"1.86","value":"118"},
  //     {"name":"1.87","value":"123"},
  //     {"name":"1.88","value":"104"},
  //     {"name":"1.89","value":"84"},
  //     {"name":"1.9","value":"109"},
  //     {"name":"1.91","value":"82"},
  //     {"name":"1.92","value":"104"},
  //     {"name":"1.93","value":"82"},
  //     {"name":"1.94","value":"74"},
  //     {"name":"1.95","value":"69"},
  //     {"name":"1.96","value":"59"},
  //     {"name":"1.97","value":"75"},
  //     {"name":"1.98","value":"44"},
  //     {"name":"1.99","value":"67"},
  //     {"name":"2","value":"60"},
  //     {"name":"2.01","value":"48"},
  //     {"name":"2.02","value":"55"},
  //     {"name":"2.03","value":"30"},
  //     {"name":"2.04","value":"43"},
  //     {"name":"2.05","value":"32"},
  //     {"name":"2.06","value":"31"},
  //     {"name":"2.07","value":"31"},
  //     {"name":"2.08","value":"25"},
  //     {"name":"2.09","value":"35"},
  //     {"name":"2.1","value":"22"},
  //     {"name":"2.11","value":"30"},
  //     {"name":"2.12","value":"16"},
  //     {"name":"2.13","value":"22"},
  //     {"name":"2.14","value":"22"},
  //     {"name":"2.15","value":"12"},
  //     {"name":"2.16","value":"15"},
  //     {"name":"2.17","value":"6"},
  //     {"name":"2.18","value":"10"},
  //     {"name":"2.19","value":"8"},
  //     {"name":"2.2","value":"13"},
  //     {"name":"2.21","value":"4"},
  //     {"name":"2.22","value":"3"},
  //     {"name":"2.23","value":"4"},
  //     {"name":"2.24","value":"2"},
  //     {"name":"2.25","value":"3"},
  //     {"name":"2.26","value":"6"},
  //     {"name":"2.27","value":"3"},
  //     {"name":"2.28","value":"3"},
  //     {"name":"2.29","value":"4"},
  //     {"name":"2.3","value":"4"},
  //     {"name":"2.31","value":"2"},
  //     {"name":"2.32","value":"1"},
  //     {"name":"2.33","value":"1"},
  //     {"name":"2.35","value":"1"},
  //     {"name":"2.36","value":"1"},
  //     {"name":"2.42","value":"2"},
  //     {"name":"2.44","value":"2"},
  //     {"name":"2.55","value":"1"},
  //     {"name":"2.72","value":"2"},
  //     {"name":"2.96","value":"2"},
  //     {"name":"3.4","value":"2"}
  // ];
  return {data};
}*/

const catlworkingSelector = state => state.catlworking;
const cycleSelector = createSelector(
  catlworkingSelector,
  (catlworking) => {
    const {cycle} = catlworking;
    return cycle;
  }
);

const getOptionSelector = createSelector(
  cycleSelector,
  (cycle) => {
    let data = [];
    lodashmap(cycle,(v)=>{
      data.push({
        name:`${lodashget(v,'name',0)}`,
        value:`${lodashget(v,'value',0)}`,
      });
    });

    const getOption = () => {
      return {
        backgroundColor:'rgba(10, 108, 163, 0.3)',
        tooltip:{
          show:true,
          // trigger: 'axis'
        },
        xAxis: [{
          name:'个',
          nameLocation:'end',
          nameGap:3,
          nameTextStyle:{
            fontSize: 12,
            padding:[30, 0, 0, 0],
            color: 'rgba(255,255,255,1.0)',
          },
          show: true,
          data: [],
          axisTick: {
            show: true,
          },
          axisLine: {
            show: true
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: 'rgba(255,255,255,1.0)',

            }
          },
        }],
        grid:{
          bottom: 40,
          top: 30,
          right:20,
        },
        visualMap: {
          show: false,
          max:100,
          dimension: 0,
          inRange: {
            color: ['#37b7fb', '#37b7fb']
          }
        },
        yAxis: {
          name:'车次         ',
          // nameLocation:'middle',
          nameGap:'13',
          nameTextStyle:{
            fontSize: 12,
            padding:[30, 0, 0, 0],
            color: 'rgba(255,255,255,1.0)',
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#aaa'
            }
          },
          // max: 200,
          axisTick: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              width: 2,
              color: '#07111f',
            }
          },
          z: 10
        },
        series: [{
          // name: 'back',
          type: 'bar',
          data: [],
          z: 10,
          itemStyle: {
            normal: {
              opacity: 1,
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,168,255,1)'
                },
                  {
                    offset: 1,
                    color: 'rgba(0,168,255,1)'
                  }
                ]
              ),
            }
          }
        }, {
          name: 'Simulate Shadow',
          type: 'line',
          data: [],
          z: 2,
          showSymbol: false,
          animationDelay: 0,
          animationEasing: 'linear',
          animationDuration: 1200,
          lineStyle: {
            normal: {
              color: 'transparent'
            }
          },
          areaStyle: {
            normal: {
              color: '#08263a',
              shadowBlur: 50,
              shadowColor: '#000'
            }
          }
        }],
        animationEasing: 'elasticOut',
        animationEasingUpdate: 'elasticOut',
        animationDelay: function (idx) {
          return idx * 10;
        },
        animationDelayUpdate: function (idx) {
          return idx * 10;
        }
      };
    };
    let option = getOption();

    if(data.length === 0){
      return (<div>loading</div>)
    }
    data = _.sortBy(data,(i) => i.name-0);
    option.xAxis[0].data = data.map(value => value['name']);
    option.series[0].data = data.map(value => value['value']-0);
    option.series[1].data = data.map(value => value['value']-0);

    return option;
  }
);

const mapStateToProps = (state) => {
  const option = getOptionSelector(state);
  return {option};
}
export default connect(mapStateToProps)(Page);
