/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/dist/echarts.common';
import styled from 'styled-components';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';

const _ = require('underscore');
const Chart = styled.div`
  .singleBarChart {
    width: 100%;
	height: 95%;
	overflow: hidden;
  }
`;


class Page extends React.Component {
    constructor(props) {
        super(props);
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
              <ReactEcharts option={option} className='singleBarChart' />
            </Chart>
        );
    };
}
/*
const mapStateToProps = ({catlworking}) => {
  const data = [];
  const cycle = lodashget(catlworking,'cyclecount',[]);
  lodashmap(cycle,(v)=>{
    data.push({
      name:`${lodashget(v,'name',0)}`,
      value:`${lodashget(v,'value',0)}`,
    });
  });
  // console.log(data);
    // let data = [
    //     {"name":"0","value":"5445"},
    //     {"name":"1","value":"1991"},
    //     {"name":"2","value":"1952"},
    //     {"name":"3","value":"1703"},
    //     {"name":"4","value":"1395"},
    //     {"name":"5","value":"997"},
    //     {"name":"6","value":"653"},
    //     {"name":"7","value":"373"},
    //     {"name":"8","value":"195"},
    //     {"name":"9","value":"96"},
    //     {"name":"10","value":"31"},
    //     {"name":"11","value":"7"},
    //     {"name":"12","value":"5"}
    // ];
    return {data};
}*/

const catlworkingSelector = state => state.catlworking;
const cyclecountSelector = createSelector(
  catlworkingSelector,
  (catlworking) => {
    const {cyclecount} = catlworking;
    return cyclecount;
  }
);

const getOptionSelector = createSelector(
  cyclecountSelector,
  (cyclecount) => {
    let data = [];
    lodashmap(cyclecount,(v)=>{
      data.push({
        name:`${lodashget(v,'name',0)}`,
        value:`${lodashget(v,'value',0)}`,
      });
    });

    const getOption = () => {
      return {
        backgroundColor:'rgba(10, 108, 163, 0.3)',
        tooltip:{
          show:true
        },
        xAxis: [{
          name:'次',
          nameLocation:'end',
          nameGap:8,
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
          right:30,
        },
        visualMap: {
          show: false,
          max:100,
          dimension: 0,
          inRange: {
            // color: ['#37b7fb', '#37b7fb']
          }
        },
        yAxis: {
          name:'车次         ',
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
          barWidth:'50%',
          itemStyle: {
            normal: {
              opacity: 1,

              barBorderRadius: 8,
              shadowBlur: 3,
              // color: 'rgba(0,168,255,0.2)',
              // color: 'rgba(0,168,255,1.0) ',
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: '#ffb301'
                },
                  {
                    offset: 1,
                    color: '#ffb301'
                  }
                ]
              ),
              shadowColor: '#111'
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
