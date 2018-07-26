/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ReactEcharts from 'echarts-for-react';
import lodashget from 'lodash.get';
import echarts from 'echarts/dist/echarts.common';
import { Picker, List ,Flex, WingBlank} from 'antd-mobile';
import {setquery_deviceext_request,settype_deviceext} from '../../actions';

import styled from 'styled-components';
const _ = require('underscore');
const Chart = styled.div`
  .singleBarChart {
    width: 100%;
	height: 100%;
	overflow: hidden;
  }

  .flex-container{
    margin: 0px 0px;
  }
  .am-list-item .am-list-line .am-list-content{
    font-size:14px
  }
  .am-list-item .am-list-line .am-list-extra{
    font-size:14px;
    flex-basis: 60%;
  }
`;


class Page extends React.Component {
    constructor(props) {
        super(props);
        let sProvince = ['全部'];
        if(!!props.query.province){
          sProvince = [props.query.province];
        }
        this.state = {
          sProvince,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
      const nextQuery = lodashget(nextProps,'query',{});
      const nextcarNum = lodashget(nextProps,'option.series["0"].data',[]);
      const nextbusNum = lodashget(nextProps,'option.series["1"].data',[]);
      const nextnames = lodashget(nextProps,'option.xAxis.data',[]);
      const nextlegend = lodashget(nextProps,'option.legend.selected',{});

      const curQuery = lodashget(this.props,'query',{});
      const curcarNum = lodashget(this.props,'option.series["0"].data',[]);
      const curbusNum = lodashget(this.props,'option.series["1"].data',[]);
      const curnames = lodashget(this.props,'option.xAxis.data',[]);
      const curlegend = lodashget(this.props,'option.legend.selected',{});

      if( nextcarNum.length === curcarNum.length
        && nextbusNum.length === curbusNum.length
        && nextnames.length === curnames.length
        && curlegend.length === curlegend.length
      ){
        if(JSON.stringify(nextcarNum) === JSON.stringify(curcarNum)){
          if(JSON.stringify(nextbusNum) === JSON.stringify(curbusNum)){
            if(JSON.stringify(nextnames) === JSON.stringify(curnames)){
              if(JSON.stringify(nextlegend) === JSON.stringify(curlegend)){
                if(JSON.stringify(nextQuery) === JSON.stringify(curQuery)){
                  return false;
                }
              }
            }
          }
        }
      }
      return true;//render
    }

    onChartClick(param, echart){ //地图点击事件，点击后
      // debugger
      if(param === undefined){
        let query = this.props.query;
        delete query.catlprojectname;
        this.props.dispatch(setquery_deviceext_request(query));
      } else if(param.name !== undefined){
        //应该首先清理 item变量的值
        // param.name; //获取省份名字； 省份名字 简称 山东、山西、黑龙江、内蒙古、上海等。
        param.event.event.stopImmediatePropagation()
        let query = this.props.query;
        delete query.province
        query['catlprojectname'] = param.name;
        this.props.dispatch(setquery_deviceext_request(query));
      }
    }


    onChartLegendselectchanged = (param, echart) => { // CAR BUS Legend点击事件 点击后 用来同步改变项目Echart的值
      console.log(param, echart);
      this.props.dispatch(settype_deviceext(param.selected));
    };

    onChangeProvince = (value) => {
      this.setState({
        sProvince: value,
      });

      let query = this.props.query;
      delete query.catlprojectname
      // this.setState({
      //   sProject: ['全部'],
      // });
      if(value[0] === '全部'){
        delete query.province
      } else {
        query['province'] = value[0];
      }

      this.props.dispatch(setquery_deviceext_request(query));
    }
    render() {
        let {option, pickerProvice} = this.props;
        // if(data.length === 0){
        //   return (<div>loading</div>)
        // }
        let onEvents = {
          // 'legendselectchanged': this.onChartLegendselectchanged.bind(this),
          // 'click': this.onChartClick.bind(this)
        }
        return (
            <Chart onClick={() => this.onChartClick()}>
              <div className="crumbsTitle">各项目车辆分布TOP20</div>
              <div className="flex-container">
                <Flex>
                  <Flex.Item>
                    <Picker
                      data={pickerProvice}
                      value={this.props.sProvince}
                      cols={1}
                      onChange={v=>{this.onChangeProvince(v)}}
                      onOk={v => {
                        console.log(v)
                        this.setState({ sProvince: v })
                      }}
                    >
                      <List.Item arrow="horizontal">省份</List.Item>
                    </Picker>
                  </Flex.Item>
                </Flex>
              </div>
              <ReactEcharts option={option} style={{height:'450px'}} ref={'itemChart'} onEvents={onEvents}  className='singleBarChart' />
            </Chart>
        );
    };
}

const deviceextSelector = state => state.deviceext;
const typeSelector = createSelector(
  deviceextSelector,
  (deviceext) => {
    const {type} = deviceext;
    return type;
  }
);

const statcatlprojectSelector = createSelector(
  [deviceextSelector,typeSelector],
  (deviceext,type) => {
    const {statcatlproject} = deviceext;
    let data = statcatlproject;
    const getOption = () => {
      return {
        // backgroundColor:'rgba(10, 108, 163, 0.3)',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: 15,
          top: 20,
          right: 15,
          bottom: 5,
          containLabel: true,
        },
        legend: {//图例组件，颜色和名字
          // right:'60%',
          top:5,
          itemGap: 16,
          itemWidth: 18,
          itemHeight: 10,
          data:['乘用车', '客车'],
          textStyle: {
            color: '#a8aab0',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12,
          }
        },
        yAxis: {
          type: 'value',
          offset: 5,
          axisLabel: {
            textStyle: {
              color: 'rgba(18,28,38,1.0)',
            },
            // formatter: '{value}h'
            formatter: function(value, index) {
              if (index === 0) {
                return value;
              } else {
                return value;
              }
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            lineStyle: {
              color: '#000'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              width: 1,
              color: '#020617',
            }
          },
          boundaryGap: [0, 0.1],
          z: 10
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: 'rgba(18,28,38,1.0)',
            },
            // interval:1,
            interval:0,
            formatter: function (value, index) {
              if(index %2 ==0)
              // return value.substring(0,5)+'\n'+value.substring(5,value.length);
                return value;
              else
                return value;
            },
            rotate:50,
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: []
        },
        series: [
          {
            name: '乘用车',
            type: 'bar',
            barWidth: '25%',
            itemStyle: {
              normal: {
                barBorderRadius: 3,
                // 左上右下
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,168,255,1)'
                }, {
                  offset: 1.0,
                  color: 'rgba(0,168,255,0.2) '
                }], false),
              }
            },
            data: []
          },
          {
            name: '客车',
            type: 'bar',
            barWidth: '25%',
            itemStyle: {
              normal: {
                // 左上右下
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255, 179, 1, 1)'
                }, {
                  offset: 1.0,
                  color: 'rgba(255, 179, 1, 0.4)'
                }], false),
              }
            },
            data: []
          }
        ]
      }
    };
    let option = getOption();

    if(!!data){
      option.legend.selected = type
    }
    data = _.sortBy(data,(i) => -i.value);
    let group = _.groupBy(data,'type');
    let carNum = [];
    let busNum = [];
    let bus = group['BUS']||[], car = group['CAR']||[];
    let names = _.uniq(_.pluck(data,'name'));
    for (let i = 0; i < names.length; i++) {
      let a = _.find(car, b => b.name === names[i])
      carNum.push(a ? a.value-0 : 0);
      let b = _.find(bus, b => b.name === names[i])
      busNum.push(b ? b.value-0 : 0);
    }
    option.xAxis.data = names;
    option.series["0"].data = carNum;
    option.series["1"].data = busNum;
    return option;
  }
);

const querySelector = createSelector(
  deviceextSelector,
  (deviceext) => {
    const {query} = deviceext;
    return query;
  }
);



const mapStateToProps = (state) => {
  const option = statcatlprojectSelector(state);
  const query = querySelector(state);

    // let data1 = [
    //     {"type":"CAR","name":"AAA-123","value":"1123"},
    //     {"type":"CAR","name":"ZZZ-123","value":"1083"},
    //     {"type":"CAR","name":"TTT-133","value":"943"},
    //     {"type":"CAR","name":"ZZZ-122","value":"893"},
    //     {"type":"CAR","name":"XNY-113KWH","value":"843"},
    //     {"type":"CAR","name":"NDX-88KWH","value":"793"},
    //     {"type":"CAR","name":"BJX-213KWH","value":"743"},
    //     {"type":"CAR","name":"XNY-118KWH","value":"693"},
    //     {"type":"CAR","name":"XNY-117KWH","value":"643"},
    //     {"type":"CAR","name":"XNY-116KWH","value":"593"},
    //     {"type":"CAR","name":"XNY-115KWH","value":"543"},
    //     {"type":"CAR","name":"XNY-114KWH","value":"493"},
    //     {"type":"CAR","name":"ZZZ-112","value":"443"},
    //     {"type":"CAR","name":"ZZZ-133","value":"393"},
    //     {"type":"CAR","name":"TTT-111","value":"343"},
    //     {"type":"CAR","name":"XXA-123","value":"293"},
    //     {"type":"CAR","name":"HZA-234","value":"243"},
    //     {"type":"CAR","name":"AAA-122","value":"193"},
    //     {"type":"CAR","name":"TTT-112","value":"143"},
    //     {"type":"CAR","name":"XAN-223","value":"93"},
    //
    //
    //     {"type":"BUS","name":"AAA-123","value":"782"},
    //     {"type":"BUS","name":"ZZZ-123","value":"669"},
    //     {"type":"BUS","name":"TTT-133","value":"666"},
    //     {"type":"BUS","name":"ZZZ-122","value":"574"},
    //     {"type":"BUS","name":"XNY-113KWH","value":"550"},
    //     {"type":"BUS","name":"NDX-88KWH","value":"501"},
    //     {"type":"BUS","name":"BJX-213KWH","value":"423"},
    //     {"type":"BUS","name":"XNY-118KWH","value":"402"},
    //     {"type":"BUS","name":"XNY-117KWH","value":"381"},
    //     {"type":"BUS","name":"XNY-116KWH","value":"360"},
    //     {"type":"BUS","name":"XNY-115KWH","value":"339"},
    //     {"type":"BUS","name":"XNY-114KWH","value":"318"},
    //     {"type":"BUS","name":"ZZZ-112","value":"297"},
    //     {"type":"BUS","name":"ZZZ-133","value":"276"},
    //     {"type":"BUS","name":"TTT-111","value":"255"},
    //     {"type":"BUS","name":"XXA-123","value":"234"},
    //     {"type":"BUS","name":"HZA-234","value":"213"},
    //     {"type":"BUS","name":"AAA-122","value":"192"},
    //     {"type":"BUS","name":"TTT-112","value":"171"},
    //     {"type":"BUS","name":"XAN-223","value":"150"}
    // ];


    let province = _.uniq(_.pluck(state.deviceext.statprovince, 'name'));
    const pickerProvice = [{label: '全部', value: '全部'}];
    _.each(province,(p) => {
      pickerProvice.push({
        label: p,
        value: p
      })
    });
    const sProject = state.deviceext.sProject;
    const sProvince = state.deviceext.sProvince;
    return { query,option, pickerProvice,sProject,sProvince};
}
export default connect(mapStateToProps)(Page);
