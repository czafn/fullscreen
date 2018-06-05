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
	height: 92%;
	overflow: hidden;
  }
`;


class Page extends React.Component {
    constructor(props) {
        super(props);
        const getOption = () => {
            return {
                backgroundColor:'rgba(10, 108, 163, 0.3)',
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
                    data:['CAR', 'BUS'],
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
                            color: 'rgba(255,255,255,0.8)'
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
                            color: '#fff'
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
                            color: "#fff"
                        },
                        interval:1,
                        // rotate:20,
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
                        name: 'CAR',
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
                        name: 'BUS',
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
        if(data.length === 0){
          return (<div>loading</div>)
        }
        const option = this.option;
        data = _.sortBy(data,(i) => -i.value);
        let group = _.groupBy(data,'type');
        let name = [];
        let carNum = [];
        let busNum = [];
        let bus = group['BUS'], car = group['CAR'];
        for (let i = 0; i < car.length; i++) {
            let _info = data[i];
            if (i%2==0) {
                name.push(_info.name);
            } else {
                name.push(_info.name);
            }

            carNum.push(_info.value-0);
            let b = _.find(bus, b => b.name === _info.name)
            busNum.push(b ? b.value-0 : 0);
        }
        option.xAxis.data = name;
        option.series["0"].data = car;
        option.series["1"].data = bus;

        return (
            <Chart >
              <ReactEcharts option={option} style={{height:'270px'}} className='singleBarChart' />
            </Chart>
        );
    };
}

const mapStateToProps = ({deviceext}) => {
    let data = deviceext.statcatlproject;
    // let data = [
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
    return {data};
}
export default connect(mapStateToProps)(Page);
