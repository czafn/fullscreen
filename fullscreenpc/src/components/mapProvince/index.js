/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/dist/echarts.common';
import styled from 'styled-components';
import {setquery_deviceext_request} from '../../actions';
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
        const getOption = () => {
            return {
                title: {
                    text: '',
                    textStyle: {
                        fontSize: 30
                    },
                    x: 'center'
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                },
                visualMap: {
                    type: 'continuous',
                    text: ['', ''],
                    showLabel: true,
                    // calculable:true,
                    seriesIndex: [0,1],
                    min: 0,
                    max: 0,
                    inRange: {
                        color: ['rgba(0,168,255,0.4)', 'rgba(255, 179, 1, 1)', '#f93500']
                    },
                    textStyle: {
                        color: '#000'
                    },
                    bottom: '40%',
                    right: '20',
                },
                legend: {
                    // orient: 'vertical',
                    left: 'center',
                    top:20,
                    data: [{name: 'CAR', textStyle: {color: 'rgba(0, 168, 255, 1)'}}, {name: 'BUS', textStyle: {color: 'rgba(255, 179, 1, 1)'}}],

                },
                grid: {
                    right: 10,
                    top: '55%',
                    bottom: 30,
                    left:60,
                    // width: '90%'
                },
                yAxis: {
                    type: 'value',
                    scale: true,
                    position: 'top',
                    // splitNumber: 1,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.8)'
                        }
                    },
                },
                xAxis: {
                    type: 'category',
                    nameGap: 16,

                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    axisTick: {
                        show: false,
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#999'
                        }
                    },
                    data: []
                },
                series: [
                    {
                        name: 'CAR',
                        type: 'map',
                        top:20,
                        // left:20,
                        zoom:1.0,
                        mapType: 'china',
                        showLegendSymbol:false,
                        itemStyle: {
                            normal: {
                                color:'rgba(0,168,255,1)',
                                borderColor: 'rgba(255, 255, 255, 0.3)',

                            }
                        },
                        roam: false,
                        label: {
                            normal: {
                                show:false,
                                color:'rgba(255, 179, 1,1)',
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[

                        ]
                    },
                    {
                        name: 'BUS',
                        type: 'map',
                        mapType: 'china',
                        itemStyle: {
                            normal: {
                                color:'rgba(255, 179, 1,1)',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                            }
                        },
                        showLegendSymbol:false,
                        label: {
                            normal: {
                                show:false,
                                color:'rgba(255, 179, 1,1)',
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[

                        ]
                    },
                    {
                        name: 'CAR',
                        type: 'bar',
                        // barGap: '50%',
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 1, color: 'rgba(0,168,255,0.6)'},
                                        {offset: 0, color: 'rgba(0,168,255,1)'}
                                    ]
                                )
                            }
                        },
                        z: -12,
                        data: []
                    }, {
                        name: 'CAR',
                        type: 'pictorialBar',
                        symbol: 'rect',
                        itemStyle: {
                            normal: {
                                color: '#0f375f'
                            }
                        },
                        symbolRepeat: true,
                        symbolSize: [10, 5],
                        symbolMargin: 3,
                        z: -10,
                        data: []
                    },
                    {
                        name: 'BUS',
                        type: 'bar',
                        // barGap: '50%',
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: 'rgba(255, 179, 1, 0.6)'},
                                        {offset: 1, color: 'rgba(255, 179, 1, 1)'}
                                    ]
                                )
                            }
                        },
                        z: -12,
                        data: []
                    }, {
                        name: 'BUS',
                        type: 'pictorialBar',
                        barGap: '-20%',
                        symbol: 'rect',
                        itemStyle: {
                            normal: {
                                color: '#0f375f'
                            }
                        },
                        symbolRepeat: true,
                        symbolSize: [10, 5],
                        symbolMargin: 3,
                        z: -10,
                        data: []
                    }]
            };
        };
        this.option = getOption();

    }
    // timeTicket = null;
    // getInitialState = () => ({option: this.getOption()});
    //
    // componentDidMount() {
    //
    //     // this.timeTicket = setInterval(() => {
    //
    //
    //         this.setState({ option: option });
    //
    //     // }, 1000);
    //
    // };
    // componentWillUnmount() {
    //     if (this.timeTicket) {
    //         clearInterval(this.timeTicket);
    //     }
    // };

    onChartClick(param, echart){ //地图点击事件，点击后
      // debugger
      if(param === undefined){
        let query = this.props.query;
        delete query.provice;
        this.props.dispatch(setquery_deviceext_request(query));
      } else if(param.data !== undefined){
        //应该首先清理 item变量的值
        param.data.name; //获取省份名字； 省份名字 简称 山东、山西、黑龙江、内蒙古、上海等。
        let query = this.props.query;
        delete query.catlprojectname
        let proviceName;
        if(['北京','天津','重庆','上海'].indexOf(param.data.name)>=0){
          proviceName = param.data.name+'市'
        } else {
          proviceName = param.data.name+'省'
        }
        query['provice'] = proviceName;
        this.props.dispatch(setquery_deviceext_request(query));
      }

    }


    onChartLegendselectchanged = (param, echart) => { // CAR BUS Legend点击事件 点击后 用来同步改变项目Echart的值
        console.log(param, echart);
        param.selected // CAR BUS点击事件，点击后需要用该对象的值 同步更新到item
        console.log(param.selected );
        // let query = this.props.query;
        // query['provice'] = param.data.name;
        // this.props.dispatch(setquery_deviceext_request(query));
    };
    render() {
        let {data, legend} = this.props;
        if(data.length === 0){
          return <div>loading</div>
        }
        const option = this.option;

        let onEvents = {
            'legendselectchanged': this.onChartLegendselectchanged,
            'click': this.onChartClick.bind(this)
        }

        if(legend){
          option.legend.selected = legend
        }

        data = _.sortBy(data,(i)=>-i.value-0);
        let group = _.groupBy(data,'type');
        let name = [];
        let carObj = [],mapCarObj = [];
        let busObj = [],mapBusObj = [];
        let bus = group['BUS']||[], car = group['CAR']||[];
        let totVal = [];
        let names = _.uniq(_.pluck(data,'name'));
        for (let i = 0; i < names.length; i++) {
            // let _info = car[i];
            // name.push(_info.name);

            let a = _.find(car, b => b.name === names[i])
            carObj.push(a ? {name: a.name, value: a.value-0} : {name:names[i], value: 0});
            mapCarObj.push(carObj[i]);
            let b = _.find(bus, b => b.name === names[i])
            busObj.push(b ? {name: b.name, value: b.value-0} : {name:names[i], value: 0});
            mapBusObj.push(busObj[i]);
            totVal.push(carObj[i].value + busObj[i].value);
        }
        option.visualMap.min = 0;
        option.visualMap.max = _.max(totVal,t=>t);
        mapCarObj.push(
            {
                name: '南海诸岛',
                //value: 0,
                itemStyle:{
                    normal:{
                        areaColor:'rgba(0,168,255,0.2)',
                        opacity:1
                    }
                }

            }
        )
        option.series[0].data = mapCarObj;
        option.series[1].data = mapBusObj;
        if(names.length > 15)
          names.length = 15;
        if(carObj.length > 15)
          carObj.length = 15;
        if(busObj.length > 15)
        busObj.length = 15;
        option.xAxis.data = names;
        option.yAxis.max = option.visualMap.max
        option.series[2].data = carObj;
        option.series[3].data = carObj;
        option.series[4].data = busObj;
        option.series[5].data = busObj;

        return (
            <Chart onClick={() => this.onChartClick()}>
              <ReactEcharts ref='map' option={option} style={{height: "590px"}} onEvents={onEvents} className='singleBarChart'  />
            </Chart>
        );
    };
}

const mapStateToProps = ({deviceext}) => {
    const query = deviceext.query;
    let data = deviceext.statprovince;

    data.forEach(d=>{
        if(d.name == "黑龙江省" || d.name == "内蒙古自治区"){
            d.name = d.name.substring(0,3);
        }else{
            d.name = d.name.substring(0,2);
        }

    })

    let data1 = [
        {"name":"北京","value":9669,"type":"CAR"},
        {"name":"天津","value":8063,"type":"CAR"},
        {"name":"上海","value":13349,"type":"CAR"},
        {"name":"重庆","value":11475,"type":"CAR"},
        {"name":"河北","value":10824,"type":"CAR"},
        {"name":"山西","value":9148,"type":"CAR"},
        {"name":"辽宁","value":7931,"type":"CAR"},
        {"name":"吉林","value":7018,"type":"CAR"},
        {"name":"黑龙江","value":5658,"type":"CAR"},
        {"name":"江苏","value":5619,"type":"CAR"},
        {"name":"浙江","value":5456,"type":"CAR"},
        {"name":"安徽","value":5231,"type":"CAR"},
        {"name":"福建","value":3261,"type":"CAR"},
        {"name":"江西","value":3836,"type":"CAR"},
        {"name":"山东","value":2824,"type":"CAR"},
        {"name":"河南","value":2486,"type":"CAR"},
        {"name":"湖北","value":2231,"type":"CAR"},
        {"name":"湖南","value":1758,"type":"CAR"},
        {"name":"广东","value":1209,"type":"CAR"},
        {"name":"海南","value":1153,"type":"CAR"},
        {"name":"四川","value":1049,"type":"CAR"},
        // {"name":"贵州","value":908,"type":"CAR"},
        // {"name":"云南","value":815,"type":"CAR"},
        // {"name":"陕西","value":492,"type":"CAR"},
        {"name":"甘肃","value":252,"type":"CAR"},
        {"name":"青海","value":183,"type":"CAR"},
        {"name":"台湾","value":118,"type":"CAR"},
        {"name":"内蒙古","value":107,"type":"CAR"},
        {"name":"广西","value":87,"type":"CAR"},
        {"name":"西藏","value":24,"type":"CAR"},
        {"name":"宁夏","value":22,"type":"CAR"},
        {"name":"新疆","value":18,"type":"CAR"},
        {"name":"香港","value":14,"type":"CAR"},
        {"name":"澳门","value":6,"type":"CAR"},


        {"name":"北京","value":2669,"type":"BUS"},
        {"name":"天津","value":1806,"type":"BUS"},
        // {"name":"上海","value":2349,"type":"BUS"},
        // {"name":"重庆","value":1745,"type":"BUS"},
        // {"name":"河北","value":1382,"type":"BUS"},
        // {"name":"山西","value":914,"type":"BUS"},
        // {"name":"辽宁","value":793,"type":"BUS"},
        // {"name":"吉林","value":701,"type":"BUS"},
        // {"name":"黑龙江","value":565,"type":"BUS"},
        // {"name":"江苏","value":561,"type":"BUS"},
        {"name":"浙江","value":545,"type":"BUS"},
        {"name":"安徽","value":523,"type":"BUS"},
        {"name":"福建","value":326,"type":"BUS"},
        {"name":"江西","value":383,"type":"BUS"},
        {"name":"山东","value":282,"type":"BUS"},
        {"name":"河南","value":248,"type":"BUS"},
        {"name":"湖北","value":223,"type":"BUS"},
        {"name":"湖南","value":175,"type":"BUS"},
        {"name":"广东","value":120,"type":"BUS"},
        {"name":"海南","value":115,"type":"BUS"},
        {"name":"四川","value":104,"type":"BUS"},
        {"name":"贵州","value":90,"type":"BUS"},
        {"name":"云南","value":81,"type":"BUS"},
        {"name":"陕西","value":49,"type":"BUS"},
        {"name":"甘肃","value":25,"type":"BUS"},
        {"name":"青海","value":18,"type":"BUS"},
        {"name":"台湾","value":11,"type":"BUS"},
        {"name":"内蒙古","value":10,"type":"BUS"},
        {"name":"广西","value":8,"type":"BUS"},
        {"name":"西藏","value":7,"type":"BUS"},
        {"name":"宁夏","value":6,"type":"BUS"},
        {"name":"新疆","value":3,"type":"BUS"},
        {"name":"香港","value":2,"type":"BUS"},
        {"name":"澳门","value":1,"type":"BUS"}
    ];

    const legend =  {CAR: true, BUS: true}; //该对象 默认{CAR: true, BUS: true} 需要再item点击legend时 同步更新map中的值
    return {data, legend,query};
}
export default connect(mapStateToProps)(Page);
