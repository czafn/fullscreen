/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/dist/echarts.common';
import ecStat from 'echarts-stat';
import styled from 'styled-components';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import {getmedian2} from '../../util/gettmputil';

const _ = require('underscore');
const Chart = styled.div`
  .singleBarChart {
    width: 95%;
	height: 95%;
	overflow: hidden;
  }
`;


class Page extends React.Component {
    constructor(props) {
        super(props);

    }

    /*
    getOption(){
      let {data, areaParam, median} = this.props;
      console.log(data)
      const  option = {
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
            },
            interval:4,

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
            max:99,
            seriesIndex: [1],
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
          z: 10,
            min:0
        },
        series: [ {
          name: 'Simulate Shadow',
          type: 'line',
          data: [],
          z: 0,
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
          },
        },{
          // name: 'back',
          type: 'bar',
          data: [],
          z: 0,
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
                color: "rgb(255, 179, 1)",
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
          markArea: {
            silent: true,
            itemStyle: {
              normal: {
                color: 'rgba(248, 99, 2, 0.1)',
                borderColor: 'rgb(248, 99, 2)',
                borderWidth: 2,
                // borderType: 'dashed'
              }
            },
            label:{
              normal:{
                position: ['0%', '-15'],
                // fontSize:18,
                color: "rgb(248, 99, 2)"
              }

            },
            data: []
          },
        },{
          type:'line',
          color:"red",//折线图颜色
          z:100,
          label:{
            normal: {
              show: false,
              position: 'bottom',
              color:"#3497cb"
            }
          },
          lineStyle:{
            width:4
          },
          symbolSize:0,
          smooth:true,//是否平滑处理值0-1,true相当于0.5
          data:[]
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

      if(data.length === 0){
        return (<div>loading</div>)
      }
      data = _.sortBy(data,(i) => i.name-0);
      option.xAxis[0].data = data.map(value => value['name']);
      option.series[0].data = data.map(value => value['value']-0);
      option.series[1].markLine.data[0].xAxis = median;
      option.series[1].markArea.data[0] = [{
        name: '90%区间',
        xAxis: areaParam.start,
        yAxis: 'min'
      }, {
        xAxis: areaParam.end,
        yAxis: 'max'
      }]
      option.series[1].data = data.map(value => value['value']-0);
      option.series[2].data = data.map(value => value['curve']-0);
      return option;
    }
    */

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

        // if(data.length === 0){
        //   return (<div>loading</div>)
        // }
        // const option = this.option;
        // data = _.sortBy(data,(i) => i.name-0);
        // option.xAxis[0].data = data.map(value => value['name']);
        // option.series[0].data = data.map(value => value['value']-0);
        // option.series[1].markLine.data[0].xAxis = data.length / 2;
        // option.series[1].markArea.data[0] = [{
        //                                         name: '90%区间',
        //                                         xAxis: areaParam.start,
        //                                         yAxis: 'min'
        //                                     }, {
        //                                         xAxis: areaParam.end,
        //                                         yAxis: 'max'
        //                                     }]
        // option.series[1].data = data.map(value => value['value']-0);
        // option.series[2].data = data.map(value => value['curve']-0);
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
  const cycle = lodashget(catlworking,'celltemperature',[]);

  const m1data = [];
  for(let i=0; i<=30; i++){
    const fs = _.filter(cycle, (d) =>
      d.name-0 === i
    );
    const tempNum = _.reduce(fs, (memo, num) =>  memo + num.value, 0)-0
    m1data.push({
      name: i,
      value: tempNum
    })

  }

  const curveTemp = []
  lodashmap(m1data,(v)=>{
      curveTemp.push([lodashget(v,'name',0)-0,lodashget(v,'value',0)-0])
  });
  const  curve = ecStat.regression('polynomial', curveTemp,3)
  lodashmap(m1data,(v,i)=>{
    data.push({
      name:`${lodashget(v,'name',0)}`,
      value:`${lodashget(v,'value',0)}`,
      curve:curve.points[i][1],
    });
  });


  const {areaParam,median} = getmedian2(data);

  // const areaParam = {
  //     start: '10',
  //     end: '25'
  // }
  // const median = m1data.length/2; //需要后台传过来中位数的数据。 此处暂时模拟一个中位数。
  //


  // console.log(data);
  //   let data = [
  //       {"name":"0.6","value":"2"},
  //       {"name":"0.7","value":"2"},
  //       {"name":"0.9","value":"2"},
  //       {"name":"1","value":"31"},
  //       {"name":"1.1","value":"14"},
  //       {"name":"1.2","value":"7"},
  //       {"name":"1.3","value":"15"},
  //       {"name":"1.4","value":"28"},
  //       {"name":"1.5","value":"28"},
  //       {"name":"1.6","value":"16"},
  //       {"name":"1.7","value":"26"},
  //       {"name":"1.8","value":"15"},
  //       {"name":"1.9","value":"39"},
  //       {"name":"2","value":"63"},
  //       {"name":"2.1","value":"27"},
  //       {"name":"2.2","value":"34"},
  //       {"name":"2.3","value":"37"},
  //       {"name":"2.4","value":"40"},
  //       {"name":"2.5","value":"54"},
  //       {"name":"2.6","value":"39"},
  //       {"name":"2.7","value":"34"},
  //       {"name":"2.8","value":"50"},
  //       {"name":"2.9","value":"67"},
  //       {"name":"3","value":"66"},
  //       {"name":"3.1","value":"61"},
  //       {"name":"3.2","value":"73"},
  //       {"name":"3.3","value":"113"},
  //       {"name":"3.4","value":"107"},
  //       {"name":"3.5","value":"136"},
  //       {"name":"3.6","value":"158"},
  //       {"name":"3.7","value":"184"},
  //       {"name":"3.8","value":"213"},
  //       {"name":"3.9","value":"255"},
  //       {"name":"4","value":"287"},
  //       {"name":"4.1","value":"313"},
  //       {"name":"4.2","value":"315"},
  //       {"name":"4.3","value":"376"},
  //       {"name":"4.4","value":"393"},
  //       {"name":"4.5","value":"415"},
  //       {"name":"4.6","value":"409"},
  //       {"name":"4.7","value":"459"},
  //       {"name":"4.8","value":"430"},
  //       {"name":"4.9","value":"426"},
  //       {"name":"5","value":"440"},
  //       {"name":"5.1","value":"363"},
  //       {"name":"5.2","value":"392"},
  //       {"name":"5.3","value":"383"},
  //       {"name":"5.4","value":"350"},
  //       {"name":"5.5","value":"384"},
  //       {"name":"5.6","value":"366"},
  //       {"name":"5.7","value":"363"},
  //       {"name":"5.8","value":"388"},
  //       {"name":"5.9","value":"383"},
  //       {"name":"6","value":"376"},
  //       {"name":"6.1","value":"379"},
  //       {"name":"6.2","value":"367"},
  //       {"name":"6.3","value":"379"},
  //       {"name":"6.4","value":"386"},
  //       {"name":"6.5","value":"360"},
  //       {"name":"6.6","value":"345"},
  //       {"name":"6.7","value":"328"},
  //       {"name":"6.8","value":"278"},
  //       {"name":"6.9","value":"291"},
  //       {"name":"7","value":"232"},
  //       {"name":"7.1","value":"215"},
  //       {"name":"7.2","value":"171"},
  //       {"name":"7.3","value":"158"},
  //       {"name":"7.4","value":"124"},
  //       {"name":"7.5","value":"115"},
  //       {"name":"7.6","value":"89"},
  //       {"name":"7.7","value":"86"},
  //       {"name":"7.8","value":"69"},
  //       {"name":"7.9","value":"77"},
  //       {"name":"8","value":"60"},
  //       {"name":"8.1","value":"70"},
  //       {"name":"8.2","value":"43"},
  //       {"name":"8.3","value":"38"},
  //       {"name":"8.4","value":"24"},
  //       {"name":"8.5","value":"23"},
  //       {"name":"8.6","value":"13"},
  //       {"name":"8.7","value":"12"},
  //       {"name":"8.8","value":"12"},
  //       {"name":"8.9","value":"7"},
  //       {"name":"9","value":"6"},
  //       {"name":"9.1","value":"3"},
  //       {"name":"9.2","value":"4"},
  //       {"name":"9.3","value":"7"},
  //       {"name":"9.5","value":"8"},
  //       {"name":"9.6","value":"1"},
  //       {"name":"9.7","value":"1"},
  //       {"name":"9.8","value":"3"},
  //       {"name":"9.9","value":"3"},
  //       {"name":"10","value":"1"},
  //       {"name":"10.1","value":"2"},
  //       {"name":"10.2","value":"1"},
  //       {"name":"10.3","value":"1"},
  //       {"name":"10.4","value":"2"},
  //       {"name":"10.6","value":"1"},
  //       {"name":"11","value":"1"}
  //   ];
    return {data, areaParam, median};
}*/


const catlworkingSelector = state => state.catlworking;
const celltemperatureSelector = createSelector(
  catlworkingSelector,
  (catlworking) => {
    const {celltemperature} = catlworking;
    return celltemperature;
  }
);

const getOptionSelector = createSelector(
  celltemperatureSelector,
  (celltemperature) => {
    let data = [];
    celltemperature = _.sortBy(celltemperature, (l)=> l.name-0)

    const m1data = [];
    for(let i=0; i<=30; i++){
      const fs = _.filter(celltemperature, (d) =>
        d.name-0 === i
      );
      const tempNum = _.reduce(fs, (memo, num) =>  memo + num.value, 0)-0
      m1data.push({
        name: i,
        value: tempNum
      })

    }

    const curveTemp = []
    lodashmap(m1data,(v)=>{
      curveTemp.push([lodashget(v,'name',0)-0,lodashget(v,'value',0)-0])
    });
    const  curve = ecStat.regression('polynomial', curveTemp,3)
    lodashmap(m1data,(v,i)=>{
      data.push({
        name:`${lodashget(v,'name',0)}`,
        value:`${lodashget(v,'value',0)}`,
        curve:curve.points[i][1],
      });
    });


    const {areaParam,median} = getmedian2(data);

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
            },
            interval:4,

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
          max:99,
          seriesIndex: [1],
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
          z: 10,
          min:0
        },
        series: [ {
          name: 'Simulate Shadow',
          type: 'line',
          data: [],
          z: 0,
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
          },
        },{
          // name: 'back',
          type: 'bar',
          data: [],
          z: 0,
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
                color: "rgb(255, 179, 1)",
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
          markArea: {
            silent: true,
            itemStyle: {
              normal: {
                color: 'rgba(248, 99, 2, 0.1)',
                borderColor: 'rgb(248, 99, 2)',
                borderWidth: 2,
                // borderType: 'dashed'
              }
            },
            label:{
              normal:{
                position: ['0%', '-25'],
                // fontSize:18,
                color: "rgb(248, 99, 2)"
              }

            },
            data: []
          },
        },{
          type:'line',
          color:"red",//折线图颜色
          z:100,
          label:{
            normal: {
              show: false,
              position: 'bottom',
              color:"#3497cb"
            }
          },
          lineStyle:{
            width:4
          },
          symbolSize:0,
          smooth:true,//是否平滑处理值0-1,true相当于0.5
          data:[]
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


    if(data.length === 0){
      return (<div>loading</div>)
    }
    data = _.sortBy(data,(i) => i.name-0);
    option.xAxis[0].data = data.map(value => value['name']);
    option.series[0].data = data.map(value => value['value']-0);
    option.series[1].markLine.data[0].xAxis = median;
    option.series[1].markArea.data[0] = [{
      name: '90%区间',
      xAxis: areaParam.start,
      yAxis: 'min'
    }, {
      xAxis: areaParam.end,
      yAxis: 'max'
    }]
    option.series[1].data = data.map(value => value['value']-0);
    option.series[2].data = data.map(value => value['curve']-0);
    return option;
  }
);

const mapStateToProps = (state) => {
  const option = getOptionSelector(state);
  return {option};
}
export default connect(mapStateToProps)(Page);
