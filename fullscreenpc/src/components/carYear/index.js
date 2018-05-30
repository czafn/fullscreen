/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/dist/echarts.common';
import styled from 'styled-components';
const _ = require('underscore');
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
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} <br/> {a} <br/> {c}元",
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
                    name: '使用年限',
                    type: 'bar',
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


    render() {
        let {data} = this.props;
        const option = this.option;
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

        return (
            <Chart >
              <ReactEcharts option={option} style={{height: "270px",width: "100%",overflow: "hidden",background: "rgba(10, 108, 163, 0.3)"}} className='echarts-for-react'/>
            </Chart>
        );
    };
}

const mapStateToProps = ({}) => {
    let data = [
        {"type":"CAR","name":"2018","value":"1241"},
        {"type":"CAR","name":"2017","value":"1141"},
        {"type":"CAR","name":"2016","value":"1842"},
        {"type":"CAR","name":"2015","value":"2242"},
        {"type":"CAR","name":"2014","value":"1842"},
        {"type":"CAR","name":"2013","value":"1443"},
        {"type":"CAR","name":"2012","value":"1143"},
        {"type":"CAR","name":"2011","value":"943"},
        {"type":"CAR","name":"2010","value":"893"},
        {"type":"CAR","name":"2009","value":"773"},
        {"type":"CAR","name":"2008之前","value":"1743"},

        {"type":"BUS","name":"2018","value":"525"},
        {"type":"BUS","name":"2017","value":"526"},
        {"type":"BUS","name":"2016","value":"625"},
        {"type":"BUS","name":"2015","value":"425"},
        {"type":"BUS","name":"2014","value":"425"},
        {"type":"BUS","name":"2013","value":"428"},
        {"type":"BUS","name":"2012","value":"328"},
        {"type":"BUS","name":"2011","value":"228"},
        {"type":"BUS","name":"2010","value":"128"},
        {"type":"BUS","name":"2009","value":"98"},
        {"type":"BUS","name":"2008之前","value":"178"}

    ];
    return {data};
}
export default connect(mapStateToProps)(Page);