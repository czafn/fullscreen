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
import {getmedian} from '../../util/gettmputil';
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
    /*
    getOption(){
      let {data, m5data} = this.props;
      const option = {
        backgroundColor:'rgba(10, 108, 163, 0.3)',
        tooltip:{
          show:true,
          formatter: function (v) {
            if(v.name === '中位数'){
              return v.name;
            } else {
              return v.name+': '+v.value;
            }
          }
        },
        xAxis: [{
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
          name:'℃',
          nameLocation:'end',
          nameGap:5,
          nameTextStyle:{
            fontSize: 12,
            padding:[30, 0, 0, 0],
            color: 'rgba(255,255,255,1.0)',
          }
        }],
        grid:{
          bottom: 40,
          top: 20,
          right:20,
        },
        visualMap: {
          show: false,
          max:350,
          dimension: 0,
          inRange: {
            color: ['rgba(248, 99, 2, 1)', 'rgba(36, 164, 56, 1)', 'rgba(248, 99, 2, 1)']
          }
        },
        yAxis: {
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
            lable:{
              show:false,
            },
            normal: {
              opacity: 1,
              barBorderRadius: 5,
              // shadowBlur: 3,
              // color: 'rgba(0,168,255,0.2)',
              // color: 'rgba(0,168,255,1.0) ',
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
              // shadowColor: '#111'
            }
          },
          markLine: {
            label: {
              normal: {
                position:'end',
                formatter: function(params) {
                  return params.name
                }
              }
            },
            symbol:['',''],
            lineStyle: {
              normal: {
                color: "#f95c00",
                type: 'solid',
                width: 3,
              },
              emphasis: {
                color: "#d9def7"
              }
            },
            data: [{
              xAxis: 0,
              name: '中位数',
              itemStyle: {
                normal: {
                  color: "#b84a58",
                }
              }
            }]
          },
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
          return idx * 5;
        },
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      };

      if(m5data.length === 0){
        return (<div>loading</div>)
      }

      // const option = this.option;
      data = _.sortBy(m5data,(i) => i.name-0);

      option.xAxis[0].data = data.map(value => value['name']);
      option.series[0].data = data.map(value => value['value']-0);
      option.series[0].markLine.data[0].xAxis = data.length / 2;
      option.series[1].data = data.map(value => value['value']-0);
      return option;
    }
    */
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
  const dxtemperature = _.sortBy(lodashget(catlworking,'dxtemperature',[]), (l)=> l.name-0)


  const m5data = [];
  for(let i=0; i<=150; i+=5){
    const fs = _.filter(dxtemperature, (d) =>
      d.name-0 >= i && d.name-0 < i+5
    );
    const tempNum = _.reduce(fs, (memo, num) =>  memo + num.value, 0)-0
    m5data.push({
      name: `${i}`,
      value: `${tempNum}`
      // value:100
    })

  }


  const median = m5data.length/2; //需要后台传过来中位数的数据。 此处暂时模拟一个中位数。

  // let data = [
    //     {"name":"0","value":"1"},
    //     {"name":"0.1","value":"3"},
    //     {"name":"0.2","value":"2"},
    //     {"name":"0.4","value":"1"},
    //     {"name":"0.7","value":"1"},
    //     {"name":"1","value":"1"},
    //     {"name":"1.2","value":"1"},
    //     {"name":"1.5","value":"2"},
    //     {"name":"1.7","value":"2"},
    //     {"name":"1.9","value":"2"},
    //     {"name":"2.7","value":"2"},
    //     {"name":"3.9","value":"2"},
    //     {"name":"4.1","value":"4"},
    //     {"name":"4.2","value":"2"},
    //     {"name":"4.4","value":"1"},
    //     {"name":"4.5","value":"2"},
    //     {"name":"4.7","value":"1"},
    //     {"name":"5.3","value":"2"},
    //     {"name":"5.5","value":"1"},
    //     {"name":"5.6","value":"2"},
    //     {"name":"6.2","value":"6"},
    //     {"name":"6.3","value":"1"},
    //     {"name":"6.5","value":"5"},
    //     {"name":"6.6","value":"2"},
    //     {"name":"6.7","value":"3"},
    //     {"name":"6.8","value":"2"},
    //     {"name":"6.9","value":"2"},
    //     {"name":"7.1","value":"1"},
    //     {"name":"7.7","value":"4"},
    //     {"name":"7.9","value":"2"},
    //     {"name":"8","value":"1"},
    //     {"name":"8.4","value":"2"},
    //     {"name":"8.6","value":"2"},
    //     {"name":"8.9","value":"6"},
    //     {"name":"9.2","value":"4"},
    //     {"name":"9.3","value":"3"},
    //     {"name":"9.4","value":"2"},
    //     {"name":"9.6","value":"1"},
    //     {"name":"9.7","value":"1"},
    //     {"name":"10.1","value":"7"},
    //     {"name":"10.2","value":"1"},
    //     {"name":"10.3","value":"5"},
    //     {"name":"10.5","value":"5"},
    //     {"name":"10.6","value":"2"},
    //     {"name":"10.8","value":"1"},
    //     {"name":"10.9","value":"2"},
    //     {"name":"11.1","value":"4"},
    //     {"name":"11.2","value":"4"},
    //     {"name":"11.3","value":"5"},
    //     {"name":"11.4","value":"3"},
    //     {"name":"11.5","value":"2"},
    //     {"name":"11.6","value":"7"},
    //     {"name":"11.8","value":"4"},
    //     {"name":"11.9","value":"4"},
    //     {"name":"12","value":"3"},
    //     {"name":"12.1","value":"5"},
    //     {"name":"12.2","value":"4"},
    //     {"name":"12.3","value":"1"},
    //     {"name":"12.4","value":"7"},
    //     {"name":"12.5","value":"4"},
    //     {"name":"12.6","value":"2"},
    //     {"name":"12.7","value":"2"},
    //     {"name":"12.8","value":"3"},
    //     {"name":"12.9","value":"7"},
    //     {"name":"13","value":"1"},
    //     {"name":"13.1","value":"5"},
    //     {"name":"13.2","value":"9"},
    //     {"name":"13.4","value":"5"},
    //     {"name":"13.5","value":"4"},
    //     {"name":"13.6","value":"11"},
    //     {"name":"13.7","value":"4"},
    //     {"name":"13.8","value":"2"},
    //     {"name":"13.9","value":"4"},
    //     {"name":"14","value":"9"},
    //     {"name":"14.1","value":"5"},
    //     {"name":"14.2","value":"5"},
    //     {"name":"14.3","value":"7"},
    //     {"name":"14.4","value":"10"},
    //     {"name":"14.5","value":"5"},
    //     {"name":"14.7","value":"8"},
    //     {"name":"14.8","value":"4"},
    //     {"name":"14.9","value":"12"},
    //     {"name":"15","value":"8"},
    //     {"name":"15.1","value":"3"},
    //     {"name":"15.2","value":"6"},
    //     {"name":"15.3","value":"12"},
    //     {"name":"15.4","value":"6"},
    //     {"name":"15.5","value":"6"},
    //     {"name":"15.6","value":"8"},
    //     {"name":"15.7","value":"5"},
    //     {"name":"15.8","value":"13"},
    //     {"name":"16","value":"6"},
    //     {"name":"16.1","value":"4"},
    //     {"name":"16.2","value":"9"},
    //     {"name":"16.3","value":"5"},
    //     {"name":"16.4","value":"9"},
    //     {"name":"16.5","value":"4"},
    //     {"name":"16.6","value":"8"},
    //     {"name":"16.7","value":"4"},
    //     {"name":"16.8","value":"6"},
    //     {"name":"16.9","value":"4"},
    //     {"name":"17","value":"10"},
    //     {"name":"17.1","value":"6"},
    //     {"name":"17.2","value":"8"},
    //     {"name":"17.3","value":"10"},
    //     {"name":"17.4","value":"6"},
    //     {"name":"17.5","value":"9"},
    //     {"name":"17.6","value":"7"},
    //     {"name":"17.7","value":"8"},
    //     {"name":"17.8","value":"1"},
    //     {"name":"17.9","value":"14"},
    //     {"name":"18","value":"4"},
    //     {"name":"18.1","value":"7"},
    //     {"name":"18.2","value":"18"},
    //     {"name":"18.3","value":"3"},
    //     {"name":"18.4","value":"13"},
    //     {"name":"18.5","value":"10"},
    //     {"name":"18.6","value":"3"},
    //     {"name":"18.7","value":"7"},
    //     {"name":"18.8","value":"2"},
    //     {"name":"18.9","value":"6"},
    //     {"name":"19","value":"4"},
    //     {"name":"19.1","value":"11"},
    //     {"name":"19.2","value":"4"},
    //     {"name":"19.3","value":"4"},
    //     {"name":"19.4","value":"5"},
    //     {"name":"19.5","value":"2"},
    //     {"name":"19.6","value":"6"},
    //     {"name":"19.7","value":"11"},
    //     {"name":"19.8","value":"6"},
    //     {"name":"19.9","value":"10"},
    //     {"name":"20","value":"11"},
    //     {"name":"20.1","value":"4"},
    //     {"name":"20.2","value":"4"},
    //     {"name":"20.3","value":"13"},
    //     {"name":"20.4","value":"5"},
    //     {"name":"20.5","value":"8"},
    //     {"name":"20.6","value":"10"},
    //     {"name":"20.7","value":"7"},
    //     {"name":"20.8","value":"5"},
    //     {"name":"20.9","value":"6"},
    //     {"name":"21","value":"3"},
    //     {"name":"21.1","value":"3"},
    //     {"name":"21.2","value":"12"},
    //     {"name":"21.3","value":"2"},
    //     {"name":"21.4","value":"14"},
    //     {"name":"21.5","value":"2"},
    //     {"name":"21.6","value":"5"},
    //     {"name":"21.8","value":"2"},
    //     {"name":"21.9","value":"4"},
    //     {"name":"22","value":"10"},
    //     {"name":"22.1","value":"12"},
    //     {"name":"22.2","value":"6"},
    //     {"name":"22.3","value":"3"},
    //     {"name":"22.4","value":"6"},
    //     {"name":"22.5","value":"9"},
    //     {"name":"22.6","value":"5"},
    //     {"name":"22.7","value":"11"},
    //     {"name":"22.8","value":"7"},
    //     {"name":"22.9","value":"6"},
    //     {"name":"23","value":"8"},
    //     {"name":"23.1","value":"14"},
    //     {"name":"23.2","value":"7"},
    //     {"name":"23.3","value":"4"},
    //     {"name":"23.4","value":"5"},
    //     {"name":"23.5","value":"12"},
    //     {"name":"23.6","value":"9"},
    //     {"name":"23.7","value":"4"},
    //     {"name":"23.8","value":"8"},
    //     {"name":"23.9","value":"9"},
    //     {"name":"24","value":"3"},
    //     {"name":"24.1","value":"10"},
    //     {"name":"24.2","value":"10"},
    //     {"name":"24.3","value":"9"},
    //     {"name":"24.4","value":"5"},
    //     {"name":"24.5","value":"4"},
    //     {"name":"24.6","value":"5"},
    //     {"name":"24.7","value":"11"},
    //     {"name":"24.8","value":"10"},
    //     {"name":"24.9","value":"11"},
    //     {"name":"25","value":"9"},
    //     {"name":"25.1","value":"7"},
    //     {"name":"25.2","value":"7"},
    //     {"name":"25.3","value":"3"},
    //     {"name":"25.4","value":"8"},
    //     {"name":"25.5","value":"8"},
    //     {"name":"25.6","value":"15"},
    //     {"name":"25.7","value":"11"},
    //     {"name":"25.8","value":"16"},
    //     {"name":"25.9","value":"11"},
    //     {"name":"26","value":"10"},
    //     {"name":"26.1","value":"17"},
    //     {"name":"26.2","value":"14"},
    //     {"name":"26.3","value":"16"},
    //     {"name":"26.4","value":"9"},
    //     {"name":"26.5","value":"12"},
    //     {"name":"26.6","value":"11"},
    //     {"name":"26.7","value":"9"},
    //     {"name":"26.8","value":"11"},
    //     {"name":"26.9","value":"14"},
    //     {"name":"27","value":"11"},
    //     {"name":"27.1","value":"19"},
    //     {"name":"27.2","value":"21"},
    //     {"name":"27.3","value":"14"},
    //     {"name":"27.4","value":"18"},
    //     {"name":"27.5","value":"10"},
    //     {"name":"27.6","value":"20"},
    //     {"name":"27.7","value":"24"},
    //     {"name":"27.8","value":"22"},
    //     {"name":"27.9","value":"20"},
    //     {"name":"28","value":"10"},
    //     {"name":"28.1","value":"19"},
    //     {"name":"28.2","value":"24"},
    //     {"name":"28.3","value":"16"},
    //     {"name":"28.4","value":"22"},
    //     {"name":"28.5","value":"21"},
    //     {"name":"28.6","value":"29"},
    //     {"name":"28.7","value":"28"},
    //     {"name":"28.8","value":"26"},
    //     {"name":"28.9","value":"32"},
    //     {"name":"29","value":"37"},
    //     {"name":"29.1","value":"25"},
    //     {"name":"29.2","value":"28"},
    //     {"name":"29.3","value":"38"},
    //     {"name":"29.4","value":"38"},
    //     {"name":"29.5","value":"36"},
    //     {"name":"29.6","value":"36"},
    //     {"name":"29.7","value":"37"},
    //     {"name":"29.8","value":"36"},
    //     {"name":"29.9","value":"52"},
    //     {"name":"30","value":"38"},
    //     {"name":"30.1","value":"35"},
    //     {"name":"30.2","value":"45"},
    //     {"name":"30.3","value":"36"},
    //     {"name":"30.4","value":"40"},
    //     {"name":"30.5","value":"42"},
    //     {"name":"30.6","value":"37"},
    //     {"name":"30.7","value":"44"},
    //     {"name":"30.8","value":"55"},
    //     {"name":"30.9","value":"43"},
    //     {"name":"31","value":"64"},
    //     {"name":"31.1","value":"57"},
    //     {"name":"31.2","value":"62"},
    //     {"name":"31.3","value":"57"},
    //     {"name":"31.4","value":"61"},
    //     {"name":"31.5","value":"60"},
    //     {"name":"31.6","value":"61"},
    //     {"name":"31.7","value":"58"},
    //     {"name":"31.8","value":"68"},
    //     {"name":"31.9","value":"45"},
    //     {"name":"32","value":"62"},
    //     {"name":"32.1","value":"53"},
    //     {"name":"32.2","value":"53"},
    //     {"name":"32.3","value":"57"},
    //     {"name":"32.4","value":"51"},
    //     {"name":"32.5","value":"51"},
    //     {"name":"32.6","value":"67"},
    //     {"name":"32.7","value":"57"},
    //     {"name":"32.8","value":"51"},
    //     {"name":"32.9","value":"57"},
    //     {"name":"33","value":"63"},
    //     {"name":"33.1","value":"44"},
    //     {"name":"33.2","value":"72"},
    //     {"name":"33.3","value":"66"},
    //     {"name":"33.4","value":"53"},
    //     {"name":"33.5","value":"65"},
    //     {"name":"33.6","value":"61"},
    //     {"name":"33.7","value":"57"},
    //     {"name":"33.8","value":"57"},
    //     {"name":"33.9","value":"64"},
    //     {"name":"34","value":"42"},
    //     {"name":"34.1","value":"56"},
    //     {"name":"34.2","value":"64"},
    //     {"name":"34.3","value":"57"},
    //     {"name":"34.4","value":"54"},
    //     {"name":"34.5","value":"60"},
    //     {"name":"34.6","value":"52"},
    //     {"name":"34.7","value":"67"},
    //     {"name":"34.8","value":"66"},
    //     {"name":"34.9","value":"64"},
    //     {"name":"35","value":"74"},
    //     {"name":"35.1","value":"72"},
    //     {"name":"35.2","value":"69"},
    //     {"name":"35.3","value":"71"},
    //     {"name":"35.4","value":"61"},
    //     {"name":"35.5","value":"75"},
    //     {"name":"35.6","value":"75"},
    //     {"name":"35.7","value":"81"},
    //     {"name":"35.8","value":"90"},
    //     {"name":"35.9","value":"84"},
    //     {"name":"36","value":"76"},
    //     {"name":"36.1","value":"82"},
    //     {"name":"36.2","value":"86"},
    //     {"name":"36.3","value":"80"},
    //     {"name":"36.4","value":"95"},
    //     {"name":"36.5","value":"78"},
    //     {"name":"36.6","value":"89"},
    //     {"name":"36.7","value":"96"},
    //     {"name":"36.8","value":"84"},
    //     {"name":"36.9","value":"96"},
    //     {"name":"37","value":"78"},
    //     {"name":"37.1","value":"96"},
    //     {"name":"37.2","value":"105"},
    //     {"name":"37.3","value":"86"},
    //     {"name":"37.4","value":"78"},
    //     {"name":"37.5","value":"93"},
    //     {"name":"37.6","value":"97"},
    //     {"name":"37.7","value":"82"},
    //     {"name":"37.8","value":"90"},
    //     {"name":"37.9","value":"103"},
    //     {"name":"38","value":"95"},
    //     {"name":"38.1","value":"89"},
    //     {"name":"38.2","value":"109"},
    //     {"name":"38.3","value":"117"},
    //     {"name":"38.4","value":"88"},
    //     {"name":"38.5","value":"91"},
    //     {"name":"38.6","value":"104"},
    //     {"name":"38.7","value":"94"},
    //     {"name":"38.8","value":"107"},
    //     {"name":"38.9","value":"110"},
    //     {"name":"39","value":"133"},
    //     {"name":"39.1","value":"103"},
    //     {"name":"39.2","value":"116"},
    //     {"name":"39.3","value":"110"},
    //     {"name":"39.4","value":"119"},
    //     {"name":"39.5","value":"103"},
    //     {"name":"39.6","value":"111"},
    //     {"name":"39.7","value":"123"},
    //     {"name":"39.8","value":"116"},
    //     {"name":"39.9","value":"124"},
    //     {"name":"40","value":"121"},
    //     {"name":"40.1","value":"149"},
    //     {"name":"40.2","value":"123"},
    //     {"name":"40.3","value":"117"},
    //     {"name":"40.4","value":"124"},
    //     {"name":"40.5","value":"140"},
    //     {"name":"40.6","value":"123"},
    //     {"name":"40.7","value":"137"},
    //     {"name":"40.8","value":"147"},
    //     {"name":"40.9","value":"113"},
    //     {"name":"41","value":"136"},
    //     {"name":"41.1","value":"129"},
    //     {"name":"41.2","value":"123"},
    //     {"name":"41.3","value":"137"},
    //     {"name":"41.4","value":"140"},
    //     {"name":"41.5","value":"122"},
    //     {"name":"41.6","value":"132"},
    //     {"name":"41.7","value":"130"},
    //     {"name":"41.8","value":"126"},
    //     {"name":"41.9","value":"128"},
    //     {"name":"42","value":"116"},
    //     {"name":"42.1","value":"119"},
    //     {"name":"42.2","value":"113"},
    //     {"name":"42.3","value":"115"},
    //     {"name":"42.4","value":"99"},
    //     {"name":"42.5","value":"122"},
    //     {"name":"42.6","value":"120"},
    //     {"name":"42.7","value":"103"},
    //     {"name":"42.8","value":"115"},
    //     {"name":"42.9","value":"86"},
    //     {"name":"43","value":"81"},
    //     {"name":"43.1","value":"98"},
    //     {"name":"43.2","value":"96"},
    //     {"name":"43.3","value":"89"},
    //     {"name":"43.4","value":"83"},
    //     {"name":"43.5","value":"88"},
    //     {"name":"43.6","value":"75"},
    //     {"name":"43.7","value":"71"},
    //     {"name":"43.8","value":"76"},
    //     {"name":"43.9","value":"61"},
    //     {"name":"44","value":"68"},
    //     {"name":"44.1","value":"62"},
    //     {"name":"44.2","value":"49"},
    //     {"name":"44.3","value":"44"},
    //     {"name":"44.4","value":"38"},
    //     {"name":"44.5","value":"34"},
    //     {"name":"44.6","value":"42"},
    //     {"name":"44.7","value":"52"},
    //     {"name":"44.8","value":"34"},
    //     {"name":"44.9","value":"40"},
    //     {"name":"45","value":"31"},
    //     {"name":"45.1","value":"37"},
    //     {"name":"45.2","value":"27"},
    //     {"name":"45.3","value":"27"},
    //     {"name":"45.4","value":"29"},
    //     {"name":"45.5","value":"19"},
    //     {"name":"45.6","value":"21"},
    //     {"name":"45.7","value":"28"},
    //     {"name":"45.8","value":"20"},
    //     {"name":"45.9","value":"22"},
    //     {"name":"46","value":"17"},
    //     {"name":"46.1","value":"14"},
    //     {"name":"46.2","value":"22"},
    //     {"name":"46.3","value":"22"},
    //     {"name":"46.4","value":"13"},
    //     {"name":"46.5","value":"11"},
    //     {"name":"46.6","value":"7"},
    //     {"name":"46.7","value":"9"},
    //     {"name":"46.8","value":"9"},
    //     {"name":"46.9","value":"13"},
    //     {"name":"47","value":"6"},
    //     {"name":"47.1","value":"5"},
    //     {"name":"47.2","value":"1"},
    //     {"name":"47.3","value":"4"},
    //     {"name":"47.4","value":"3"},
    //     {"name":"47.5","value":"3"},
    //     {"name":"47.6","value":"8"},
    //     {"name":"47.7","value":"3"},
    //     {"name":"47.8","value":"1"},
    //     {"name":"47.9","value":"3"},
    //     {"name":"48","value":"2"},
    //     {"name":"48.1","value":"1"},
    //     {"name":"48.2","value":"1"},
    //     {"name":"48.3","value":"3"},
    //     {"name":"48.4","value":"1"},
    //     {"name":"48.7","value":"2"},
    //     {"name":"50.1","value":"1"},
    //     {"name":"54.7","value":"2"},
    //     {"name":"55.2","value":"2"},
    //     {"name":"56.9","value":"1"},
    //     {"name":"58.3","value":"1"}
    // ];
    return {data, m5data, median};
}*/


const catlworkingSelector = state => state.catlworking;
const dxtemperatureSelector = createSelector(
  catlworkingSelector,
  (catlworking) => {
    const {dxtemperature} = catlworking;
    return dxtemperature;
  }
);

const getOptionSelector = createSelector(
  dxtemperatureSelector,
  (dxtemperature) => {
    let data = [];
    dxtemperature = _.sortBy(dxtemperature, (l)=> l.name-0)
    const m5data = [];
    for(let i=0; i<=150; i+=5){
      const fs = _.filter(dxtemperature, (d) =>
        d.name-0 >= i && d.name-0 < i+5
      );
      const tempNum = _.reduce(fs, (memo, num) =>  memo + num.value, 0)-0
      m5data.push({
        name: `${i}`,
        value: `${tempNum}`
        // value:100
      })
    }

    const median = getmedian(m5data);//m5data.length/2; //需要后台传过来中位数的数据。 此处暂时模拟一个中位数。


    const getOption = () => {
      return {
        backgroundColor:'rgba(10, 108, 163, 0.3)',
        tooltip:{
          show:true,
          formatter: function (v) {
            if(v.name === '中位数'){
              return v.name;
            } else {
              return v.name+': '+v.value;
            }
          }
        },
        xAxis: [{
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
          name:'℃',
          nameLocation:'end',
          nameGap:5,
          nameTextStyle:{
            fontSize: 12,
            padding:[30, 0, 0, 0],
            color: 'rgba(255,255,255,1.0)',
          }
        }],
        grid:{
          bottom: 40,
          top: 30,
          right:20,
        },
        visualMap: {
          show: false,
          max:350,
          dimension: 0,
          inRange: {
            color: ['rgba(248, 99, 2, 1)', 'rgba(36, 164, 56, 1)', 'rgba(248, 99, 2, 1)']
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
          itemStyle: {
            lable:{
              show:false,
            },
            normal: {
              opacity: 1,
              barBorderRadius: 5,
              // shadowBlur: 3,
              // color: 'rgba(0,168,255,0.2)',
              // color: 'rgba(0,168,255,1.0) ',
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
              // shadowColor: '#111'
            }
          },
          markLine: {
            label: {
              normal: {
                position:'end',
                formatter: function(params) {
                  return params.name
                }
              }
            },
            symbol:['',''],
            lineStyle: {
              normal: {
                color: "#f95c00",
                type: 'solid',
                width: 3,
              },
              emphasis: {
                color: "#d9def7"
              }
            },
            data: [{
              xAxis: 0,
              name: '中位数',
              itemStyle: {
                normal: {
                  color: "#b84a58",
                }
              }
            }]
          },
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
          return idx * 5;
        },
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      };
    };
    let option = getOption();

    if(m5data.length === 0){
      return (<div>loading</div>)
    }

    // const option = this.option;
    data = _.sortBy(m5data,(i) => i.name-0);

    option.xAxis[0].data = data.map(value => value['name']);
    option.series[0].data = data.map(value => value['value']-0);
    option.series[0].markLine.data[0].xAxis = median;
    option.series[1].data = data.map(value => value['value']-0);
    return option;
  }
);

const mapStateToProps = (state) => {
  const option = getOptionSelector(state);
  return {option};
}
export default connect(mapStateToProps)(Page);
