/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/dist/echarts.common';
import styled from 'styled-components';
import { Picker, List ,Flex, WingBlank} from 'antd-mobile';
import {setquery_deviceext_request} from "../../actions";
import lodashget from 'lodash.get';

const _ = require('underscore');
const Chart = styled.div`
  .singleBarChart {
     width: 100%;
     height: 100%;
	   overflow: hidden;
     // background: rgba(10, 108, 163, 0.3);
  }

  .am-list-item{
    min-height: 35px;
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
      // let sProject = ['全部'];
      // let sProvince = ['全部'];
      // if(!!props.query.catlprojectname){
      //   sProject = [props.query.catlprojectname];
      // }
      // if(!!props.query.province){
      //   sProvince = [props.query.province];
      // }
      // this.state = {
      //   sProject,
      //   sProvince,
      // };
    }
    shouldComponentUpdate(nextProps, nextState) {
      const nextQuery = lodashget(nextProps,'query',{});
      const curQuery = lodashget(this.props,'query',{});
      const nextData = lodashget(nextProps,'option.series[1].data',[]);
      const curData = lodashget(this.props,'option.series[1].data',[]);
      if( nextData.length === curData.length ){
        if(JSON.stringify(nextData) === JSON.stringify(curData)){
          if(JSON.stringify(nextState) === JSON.stringify(this.state)){
            if(JSON.stringify(nextQuery) === JSON.stringify(curQuery)){
              return false;
            }
          }
        }
      }
      return true;//render
    }
    onChangeProvince = (value) => {
      // this.setState({
      //   sProvince: value,
      // });

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
    onChangeProject = (value) => {
      // this.setState({
      //   sProject: value,
      // });

      let query = this.props.query;
      delete query.province
      // this.setState({
      //   sProvince: ['全部'],
      // });
      if(value[0] === '全部'){
        delete query.catlprojectname
      } else {
        query['catlprojectname'] = value[0];
      }

      this.props.dispatch(setquery_deviceext_request(query));
    }

    render() {

        let {option, pickerProvice, pickerProjects} = this.props;
        return (
            <Chart >
              <div className="crumbsTitle">乘用车-车辆使用年限</div>
              <div className="flex-container">
                <Flex>
                  <Flex.Item>
                    <Picker
                      data={pickerProvice}
                      cols={1}
                      value={this.props.sProvince}
                      onChange={v=>{this.onChangeProvince(v)}}
                      // onOk={v => {
                      //   console.log(v)
                      //   this.setState({ sProvince: v })
                      // }}
                    >
                      <List.Item arrow="horizontal">省份</List.Item>
                    </Picker>
                  </Flex.Item>
                  <Flex.Item>
                    <Picker
                      data={pickerProjects}
                      value={this.props.sProject}
                      cols={1}
                      onChange={v=>{this.onChangeProject(v)}}
                      // onOk={v => this.setState({ sProject: v })}
                    >
                      <List.Item arrow="horizontal">项目</List.Item>
                    </Picker>
                  </Flex.Item>

                </Flex>
              </div>
              <ReactEcharts option={option} style={{height: "450px",width: "100%",overflow: "hidden"}} className='echarts-for-react'/>
            </Chart>
        );
    };
}


const deviceextSelector = state => state.deviceext;
const usedyearcarSelector = createSelector(
  deviceextSelector,
  (deviceext) => {
    const {usedyearcar} = deviceext;
    return usedyearcar;
  }
);

const getOptionSelector = createSelector(
  usedyearcarSelector,
  (usedyearcar) => {
    let data = usedyearcar;
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
              color: 'rgba(0,0,0,.6)',
              width: 0
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(0,0,0,.8)',
            }
          },
          axisTick: {
            show: true
          },

          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(0,0,0,.2)'
            }
          },
          z: 10
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
              color: 'rgba(0,0,0,.3)'
            },
          },
          axisTick: {
            show: false
          },

          axisLabel: {
            margin: 15,
            interval:0,
            textStyle: {
              color: 'rgba(0,0,0,.8)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,.4)',
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
          radius: '80%',
          center: ['50%', '50%'],
          startAngle: 90,
          endAngle: -269.99999,
          // 外围I仪表盘 分段数
          splitNumber: 9,
          axisLine: {
            lineStyle: {
              width: 22,
              color: [[1, 'rgba(0,0,0,.05)']]
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
          name: '使用年限',
          type: 'bar',
          coordinateSystem: 'polar',
          clockwise: false,
          radius: [0, '70%'],
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
              color: "rgba(0,168,255,.9)",
            },
            emphasis: {
              color: 'rgba(0,168,255,1)',
            }
          },
          data: [10, 20, 30, 40, 50, 60, 70, 80]
        }]
      };
    };
    let option = getOption();
    data = _.filter(data, i => i.type === 'CAR')
    data = _.sortBy(data,(i)=>i.name);
    var name = [], value = [],  max = _.max(data,i=>i.value-0).value;
    for (let i = 0; i < data.length; i++) {
        let _info = data[i];
        name.push(_info.name);
        value.push(_info.value-0);
    }

    option.radiusAxis.max = max;//最大值
    option.series["0"].splitNumber = value.length;//分割数字
    option.angleAxis.data = name;
    option.series[1].data = value;
    return option;
  }
);
const mapStateToProps = (state) => {
  const option = getOptionSelector(state);

  let province = _.uniq(_.pluck(state.deviceext.statprovince, 'name'));
  const pickerProvice = [{label: '全部', value: '全部'}];
  _.each(province,(p) => {
    pickerProvice.push({
      label: p,
      value: p
    })
  });

  let projects = _.uniq(_.pluck(state.deviceext.statcatlproject, 'name'));
  const pickerProjects = [{label: '全部', value: '全部'}];
  _.each(projects,(p) => {
    pickerProjects.push({
      label: p,
      value: p
    })
  });

  const query = state.deviceext.query;
  const sProject = state.deviceext.sProject;
  const sProvince = state.deviceext.sProvince;
  return {query, option, pickerProvice, pickerProjects,sProject,sProvince};
}
export default connect(mapStateToProps)(Page);
