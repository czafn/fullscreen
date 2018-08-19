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
import {settype_deviceext} from "../../actions";
const _ = require('underscore');
const Chart = styled.div`
  .singleBarChart {
    width: 100%;

	overflow: hidden;
    background: rgba(10, 108, 163, 0.3);
  }
`;


class Page extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      const nextDataCar = lodashget(nextProps,'option.series[1].data',[]);
      const nextDataBus = lodashget(nextProps,'option.series[2].data',[]);
      const nextDataContainer = lodashget(nextProps,'option.series[3].data',[]);
      const nextDataEnergy = lodashget(nextProps,'option.series[4].data',[]);
      const nextnames = lodashget(nextProps,'option.angleAxis.data',[]);
      const nextlegend = lodashget(nextProps,'option.legend.selected',{});

      const curDataCar = lodashget(this.props,'option.series[1].data',[]);
      const curDataBus = lodashget(this.props,'option.series[2].data',[]);
      const curDataContainer = lodashget(this.props,'option.series[3].data',[]);
      const curDataEnergy = lodashget(this.props,'option.series[4].data',[]);
      const curnames = lodashget(this.props,'option.angleAxis.data',[]);
      const curlegend = lodashget(this.props,'option.legend.selected',{});
      if( nextDataCar.length === curDataCar.length
        && nextDataBus.length === curDataBus.length
        && nextDataEnergy.length === curDataEnergy.length
        && nextDataContainer.length === curDataContainer.length
        && nextnames.length === curnames.length
        && curlegend.length === curlegend.length
      ){
        if(JSON.stringify(nextDataCar) === JSON.stringify(curDataCar)){
          if(JSON.stringify(nextDataBus) === JSON.stringify(curDataBus)){
            if(JSON.stringify(nextDataEnergy) === JSON.stringify(curDataEnergy)){
              if(JSON.stringify(nextDataContainer) === JSON.stringify(nextDataContainer)){
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
        let {option} = this.props;
        let onEvents = {
          'legendselectchanged': this.onChartLegendselectchanged.bind(this)
        }
        return (
            <Chart >
              <ReactEcharts option={option} style={{height: "560px"}} onEvents={onEvents} className='singleBarChart' />
            </Chart>
        );
    };
}

const deviceextSelector = state => state.deviceext;
const usedyearbusSelector = createSelector(
  deviceextSelector,
  (deviceext) => {

    const {usedyearcar,usedyearbus,usedyearEnergy,usedyearContainer,type} = deviceext;
    return {usedyearcar,usedyearbus,usedyearEnergy,usedyearContainer,type};
  }
);

const getOptionSelector = createSelector(
  usedyearbusSelector,
  ({usedyearcar,usedyearbus,usedyearEnergy,usedyearContainer,type}) => {
    const legend =  type ; //该对象 默认{CAR: true, BUS: true} 需要再item点击legend时 同步更新map中的值
    let data = usedyearbus.concat(usedyearcar,usedyearEnergy,usedyearContainer);
    const getOption = () => {
        return {
            tooltip: {
                trigger: 'item',
                formatter: "{b}：{c}辆",
                // borderWidth: 1,
                // borderColor: 'rgba(0,168,255,1)',
                // backgroundColor: 'rgba(0,168,255,.3)',
                // padding: 10
            },
            calculable: true,
            // 极坐标
            polar: {
                center: ['50%', '50%'],
                radius: '68%'
            },
            radiusAxis: {
                // 极坐标半径刻度
                min: 0,
                max: 100,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,.6)',
                        width: 0
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgba(255,255,255,.8)',
                    }
                },
                axisTick: {
                    show: true
                },

                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(255,255,255,.2)'
                    }
                },
                z: 10
            },
            legend: {
              data:['客车', '乘用车','物流车', '储能车'],
              selected:
                { '客车' :false,
                  '乘用车' :false,
                  '物流车' :false,
                  '储能车' :true,
                }
              ,
              textStyle: {
                color: 'rgb(228, 225, 225)',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
              }
            },
            angleAxis: {
                type: 'category',
                clockwise: false,
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        width: 1,
                        type: 'dashed',
                        color: 'rgba(255,255,255,.3)'
                    },
                },
                axisTick: {
                    show: false
                },

                axisLabel: {
                    margin: 15,
                    interval:0,
                    textStyle: {
                        color: 'rgba(255,255,255,.8)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.4)',
                        type: 'solid'
                    }
                },
                z: 11,
                // 极坐标分割区域
                data: [1, 2, 3, 4, 5, 6, 7, 8, 999]
            },
            series: [{
                name: '外围刻度',
                type: 'gauge',
                radius: '90%',
                center: ['50%', '50%'],
                startAngle: 90,
                endAngle: -269.99999,
                // 外围I仪表盘 分段数
                splitNumber: 9,
                axisLine: {
                    lineStyle: {
                        width: 22,
                        color: [[1, 'rgba(255,255,255,.05)']]
                    },
                },
                splitLine: {
                    length: 4,
                    lineStyle: {
                        color: '#2bdafa',
                        width: 4
                    }
                },
                axisLabel: {
                    show: false
                },
                axisTick: {
                    splitNumber: 1,
                    lineStyle: {
                        opacity: 0,
                    }
                },
                detail: {
                    show: false
                },
                pointer: {
                    show: false
                }

            }, {
                name: '乘用车',
                type: 'bar',
                stack: 'year',
                coordinateSystem: 'polar',
                clockwise: false,
                radius: [0, '80%'],
                center: ['50%', '50%'],
                roseType: 'area',
                color: 'red',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: "rgba(0,168,255,0.9)",
                    },
                    emphasis: {
                        color: 'rgba(0,168,255,1)',
                    }
                },
                data: [10, 20, 30, 40, 50, 60, 70, 80]
            }, {
              name: '客车',
              type: 'bar',
              stack: 'year',
              coordinateSystem: 'polar',
              clockwise: false,
              radius: [0, '80%'],
              center: ['50%', '50%'],
              roseType: 'area',
              color: 'red',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: "rgba(255, 179, 1, 0.9)",
                },
                emphasis: {
                  color: 'rgba(255, 179, 1, 1)',
                }
              },
              data: [10, 20, 30, 40, 50, 60, 70, 80]
            }, {
              name: '物流车',
              type: 'bar',
              stack: 'year',
              coordinateSystem: 'polar',
              clockwise: false,
              radius: [0, '80%'],
              center: ['50%', '50%'],
              roseType: 'area',
              color: 'red',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: "rgba(242, 100, 3, 0.9)",
                },
                emphasis: {
                  color: 'rgba(242, 100, 3, 1)',
                }
              },
              data: [10, 20, 30, 40, 50, 60, 70, 80]
            }, {
              name: '储能车',
              type: 'bar',
              stack: 'year',
              coordinateSystem: 'polar',
              clockwise: false,
              radius: [0, '80%'],
              center: ['50%', '50%'],
              roseType: 'area',
              color: 'red',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: "rgba(35, 165, 56, 0.9)",
                },
                emphasis: {
                  color: 'rgba(35, 165, 56, 1)',
                }
              },
              data: [10, 20, 30, 40, 50, 60, 70, 80]
            }]
        };
    };
    let option = getOption();

    if(legend){
      option.legend.selected = legend
    }
    // data = _.filter(data, i => i.type === 'BUS')
    data = _.values(_.groupBy(_.sortBy(data,(i)=>i.name),'name'));
    var name = [], bus = [], car = [], energy = [], container = [], sum = [], max = 0;
    for (let i = 0; i < data.length; i++) {
      let _info = data[i];
      let a = _.filter(_info, i => i.type === 'CAR');
      let b = _.filter(_info, i => i.type === 'BUS');
      let c = _.filter(_info, i => i.type === 'ENERGYTRUCK');
      let d = _.filter(_info, i => i.type === 'CONTAINERTRUCK');
      car.push(a.length >0 ? a[0].value-0 : 0)
      bus.push(b.length >0 ? b[0].value-0 : 0)
      energy.push(c.length >0 ? c[0].value-0 : 0)
      container.push(d.length >0 ? d[0].value-0 : 0)
      // sum.push((legend['乘用车']&&car[i])+(legend['客车']&&bus[i])+(legend['物流车']&&energy[i])+(legend['储能车']&&container[i]));
      sum.push(car[i]+bus[i]+energy[i]+container[i]);
      name.push(_info[0].name);
    }

    option.radiusAxis.max = _.max(sum);//最大值
    option.series["0"].splitNumber = bus.length;//分割数字
    option.angleAxis.data = name;
    option.series[1].data = car;
    option.series[2].data = bus;
    option.series[3].data = container;
    option.series[4].data = energy;

    return option;
  }
);

const mapStateToProps = (state) => {
  const option = getOptionSelector(state);
  return {option};
}
export default connect(mapStateToProps)(Page);
