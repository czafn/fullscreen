<template>
	<chart :options="_chart" class="singleBarChart">

	</chart>
</template>


<style scoped>
* {
	margin: 0px;
	padding: 0px;
	list-style: none;
}

a {
	text-decoration: none;
	color: black;
}

.singleBarChart {
  width: 95%;
  height: 95%;
  overflow: hidden;
  background: rgba(10, 108, 163, 0.3);
}
</style>


<script type="text/javascript">
import Echarts from 'vue-echarts';
import { mapState, mapActions } from 'vuex'
import _ from 'underscore'

export default {
	components: {
		chart: Echarts
	},
	methods: {
		...mapActions({
			getdata: 'dxTemperature/getdata'
		})
	},
	computed: {

		...mapState('dxTemperature', {
			_chart(state) {


				var info = state.apidata ? state.apidata : [];
        info = _.sortBy(info,(i) => i.name-0);
        console.log(this.chart)
        this.chart.xAxis[0].data = _.pluck(info,'name');

        this.chart.series[0].data = _.pluck(info,'value');
        this.chart.series[0].markLine.data[0].xAxis = info.length / 2;
        this.chart.series[1].data = _.pluck(info,'value');

				return this.chart
			}
		})
	},
	mounted() {
		this.getdata()
	},
	data: function() {
		return {
			chart: {
        // backgroundColor: '#08263a',
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
          name: 'back',
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
              color: new Echarts.graphic.LinearGradient(
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
              name: '中位线',
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
      }
		}

	},

	name: 'dxTemperature'
}


</script>
