/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/dist/echarts.common';
import lodashget from 'lodash.get';
import styled from 'styled-components';
import {setquery_deviceext_request,settype_deviceext} from '../../actions';
const _ = require('underscore');

require('echarts/map/js/china.js');

const Chart = styled.div`
  .singleBarChart {
    width: 100%;
	  overflow: hidden;
    background: rgba(10, 108, 163, 0.3);
  }
`;


class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
      const nextcarNum = lodashget(nextProps,'option.series["0"].data',[]);
      const nextbusNum = lodashget(nextProps,'option.series["1"].data',[]);
      const nextEnergyNum = lodashget(nextProps,'option.series["2"].data',[]);
      const nextContainerNum = lodashget(nextProps,'option.series["3"].data',[]);
      const nextnames = lodashget(nextProps,'option.xAxis.data',[]);
      const nextlegend = lodashget(nextProps,'option.legend.selected',{});

      const curcarNum = lodashget(this.props,'option.series["0"].data',[]);
      const curbusNum = lodashget(this.props,'option.series["1"].data',[]);
      const curEnergyNum = lodashget(this.props,'option.series["2"].data',[]);
      const curContainerNum = lodashget(this.props,'option.series["3"].data',[]);
      const curnames = lodashget(this.props,'option.xAxis.data',[]);
      const curlegend = lodashget(this.props,'option.legend.selected',{});

      if( nextcarNum.length === curcarNum.length
        && nextbusNum.length === curbusNum.length
        && nextEnergyNum.length === curbusNum.length
        && nextContainerNum.length === curbusNum.length
        && nextnames.length === curnames.length
        && curlegend.length === curlegend.length
      ){
        if(JSON.stringify(nextcarNum) === JSON.stringify(curcarNum)){
          if(JSON.stringify(nextbusNum) === JSON.stringify(curbusNum)){
            if(JSON.stringify(nextEnergyNum) === JSON.stringify(curEnergyNum)){
              if(JSON.stringify(nextContainerNum) === JSON.stringify(curContainerNum)){
                if(JSON.stringify(nextnames) === JSON.stringify(curnames)){
                  if(JSON.stringify(nextlegend) === JSON.stringify(curlegend)){
                    return false;
                  }
                }
              }
            }

          }
        }
      }
      return true;//render
    }

    onChartClick(param, echart ){ //地图点击事件，点击后
      debugger
      if(param === undefined){
        let query = this.props.query;
        delete query.province;
        this.props.dispatch(setquery_deviceext_request(query));
      } else if(param.data !== undefined){
        param.event.event.stopImmediatePropagation()
        //应该首先清理 item变量的值
        // param.data.name; //获取省份名字； 省份名字 简称 山东、山西、黑龙江、内蒙古、上海等。
        let query = this.props.query;
        delete query.catlprojectname
        let provinceName = param.name;
        // if(['北京','天津','重庆','上海'].indexOf(param.data.name)>=0){
        //   provinceName = param.data.name+'市'
        // } else {
        //   provinceName = param.data.name+'省'
        // }
        query['province'] = provinceName;
        this.props.dispatch(setquery_deviceext_request(query));
      }

    }


    onChartLegendselectchanged = (param, echart) => { // CAR BUS Legend点击事件 点击后 用来同步改变项目Echart的值
        // console.log(param, echart);
        // param.selected // CAR BUS点击事件，点击后需要用该对象的值 同步更新到item
        // console.log(`click---->${param.selected}` );

      if(param.selected['乘用车'] === false && param.selected['客车'] === false && param.selected['物流车'] === false && param.selected['储能车'] === false){
          param.selected[param.name] = true;
          let opt = echart.getOption();
          opt.legend[0].selected = param.selected;
          echart.setOption(opt)
        }
        window.event.stopImmediatePropagation()
        this.props.dispatch(settype_deviceext(param.selected));

        // let query = this.props.query;
        // query['province'] = param.data.name;
        // this.props.dispatch(setquery_deviceext_request(query));
    };
    render() {
        const {option} = this.props;
        const curcarObj = lodashget(this.props,'option.series[2].data',[]);
        if(curcarObj.length === 0){
          return <div>loading</div>
        }
        let onEvents = {
          'legendselectchanged': this.onChartLegendselectchanged.bind(this),
          'click': this.onChartClick.bind(this),
        }

        return (
            <Chart onClick={() => this.onChartClick()}>
              <ReactEcharts ref='map' option={option} style={{height: "560px"}} onEvents={onEvents} className='singleBarChart'  />
            </Chart>
        );
    };
}

const mapStateToProps = ({deviceext}) => {
  const query = deviceext.query;
  let data = deviceext.statprovince;
  const type = deviceext.type;//为''表示所有,否则是'CAR'或者'BUS'
  const legend =  deviceext.type; //该对象 默认{CAR: true, BUS: true} 需要再item点击legend时 同步更新map中的值
  // data.forEach(d=>{
  //   if(d.name == "黑龙江省" || d.name == "内蒙古自治区"){
  //     d.name = d.name.substring(0,3);
  //   }else{
  //     d.name = d.name.substring(0,2);
  //   }
  //
  // })

  const getOption = () => {

    return {
      legend: {
        data:['客车', '乘用车','物流车', '储能车'],
        textStyle: {
          color: 'rgb(228, 225, 225)',
          fontStyle: 'normal',
          fontFamily: '微软雅黑',
        }
      },
      grid: {
        top: 30,
        left: 50,
        right: 20,
        bottom: 10
      },
      yAxis: {
        data: [],
        show: true,
        axisLabel: {
          color: '#fff',

          rich: {
            title: {
              color: '#eee',
              align: 'center',
              lineHeight: 10
            },
            national: {
              height: 5,
              backgroundColor: {
                // image: nationalImg
              },
              lineHeight: 5

            },
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },

      },
      xAxis: {
        show: false,
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '乘用车',
          data: [],
          stack:'province',
          type: 'bar',
          symbol: 'rect',
          symbolSize: [10,15],
          barWidth: 12,
          itemStyle: {
            normal: {
              barBorderRadius: 0,
              // 左上右下
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgba(0,168,255,0.7)'
              }, {
                offset: 1.0,
                color: 'rgba(0,168,255,1) '
              }], false),
            }
          },
          symbolRepeat: true,
          // animationEasing: 'elasticOut',
          z:0
        },
        {
          name: '客车',
          data: [],
          stack:'province',
          type: 'bar',
          symbol: 'rect',
          symbolSize: [10,15],
          barWidth: 12,
          itemStyle: {
            normal: {
              // 左上右下
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgba(255, 179, 1, 0.7)'
              }, {
                offset: 1.0,
                color: 'rgba(255, 179, 1, 1)'
              }], false),
            }
          },
          symbolRepeat: true,
          // animationEasing: 'elasticOut',
          z:-1
        },
        {
          name: '物流车',
          data: [],
          stack:'province',
          type: 'bar',
          symbol: 'rect',
          symbolSize: [10,15],
          barWidth: 12,
          itemStyle: {
            normal: {
              // 左上右下
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgba(242, 100, 3, 0.7)'
              }, {
                offset: 1.0,
                color: 'rgba(242, 100, 3, 1)'
              }], false),
            }
          },
          symbolRepeat: true,
          // animationEasing: 'elasticOut',
          z:-2
        },{
          name: '储能车',
          data: [],
          stack:'province',
          type: 'bar',
          symbol: 'rect',
          symbolSize: [10,15],
          barWidth: 12,
          itemStyle: {
            normal: {
              // 左上右下
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgba(35, 165, 56, 0.7)'
              }, {
                offset: 1.0,
                color: 'rgba(35, 165, 56, 1)'
              }], false),
            }
          },
          symbolRepeat: true,
          // animationEasing: 'elasticOut',
          z:-3
        }],
      animation: true
    };
  };
  let option = getOption();



  if(legend){
    option.legend.selected = legend
  }

  data = _.sortBy(data,(i)=>i.value-0);
  let group = _.groupBy(data,'type');
  // let name = [];
  let carObj = [];
  let busObj = [];
  let energyNum = [];
  let containerNum = [];
  let bus = group['BUS']||[], car = group['CAR']||[], energy = group['ENERGYTRUCK']||[], container = group['CONTAINERTRUCK']||[];
  // let names = _.uniq(_.pluck(data,'name'));
  let nameSum = []
  _.each(_.values(_.groupBy(data,function(d){return d.name})),function(g){
    let sum = _.reduce(g, function(memo, num){ return memo + num.value; }, 0);
    nameSum.push({
      name: g[0].name,
      value: sum
    })
  })
  let names = _.uniq(_.pluck(_.sortBy(nameSum,(i)=>i.value-0),'name'));
  for (let i = 0; i < names.length; i++) {
    // let _info = car[i];
    // name.push(_info.name);

    let a = _.find(car, b => b.name === names[i])
    // carObj.push(a ? {name: a.name, value: a.value-0} : {name:names[i], value: 0});
    carObj.push(a ? a.value-0 : 0);
    let b = _.find(bus, b => b.name === names[i])
    // busObj.push(b ? {name: b.name, value: b.value-0} : {name:names[i], value: 0});
    busObj.push(b ? b.value-0 : 0);
    let c = _.find(energy, b => b.name === names[i])
    // energyNum.push(c ? {name: c.name, value: c.value-0} : {name:names[i], value: 0});
    energyNum.push(c ? c.value-0 : 0);
    let d = _.find(container, b => b.name === names[i])
    // containerNum.push(d ? {name: d.name, value: d.value-0} : {name:names[i], value: 0});
    containerNum.push(d ? d.value-0 : 0);
  }


  if(names.length > 20){
    names.length = 20;
    carObj.length = 20;
    busObj.length = 20;
    containerNum.length = 20;
    energyNum.length = 20;
  }

  option.yAxis.data = names;
  // option.yAxis.max = option.visualMap.max
  option.series[0].data = carObj;
  option.series[1].data = busObj;
  option.series[2].data = containerNum;
  option.series[3].data = energyNum;
    return {query,option};
}
export default connect(mapStateToProps)(Page);
