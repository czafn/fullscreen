<template>
	<chart :options="_chart" class="singleBarChart">

	</chart>
</template>


<style scoped>
.singleBarChart {
  width: 100%;
  height: 95%;
  overflow: hidden;
  background: rgba(10, 108, 163, 0.3);
}
</style>


<script type="text/javascript">
import { mapState, mapActions } from 'vuex'
import Echarts from 'vue-echarts';
import echarts from 'echarts';
import _ from 'underscore';

export default {
	components: {
		chart: Echarts
	},
	methods: {
		...mapActions({
			getdata: 'item/getdata'
		})
	},
	computed: {
		...mapState('item', {
			_chart(state) {
				////("t4t1", state)
				var info = state.apidata ? state.apidata : [];

        if (info.length >0) {
          info = _.sortBy(info,(i)=>-i.value);
          let group = _.groupBy(info,'type');
          let name = [];
          let carNum = [];
          let busNum = [];
          let bus = group['BUS'], car = group['CAR'];
          for (let i = 0; i < car.length; i++) {
            let _info = info[i];
            if (i%2==0) {
              name.push(_info.name);
            } else {
              name.push(_info.name);
            }

            carNum.push(_info.value-0);
            let b = _.find(bus, b => b.name === _info.name)
            busNum.push(b ? b.value-0 : 0);
          }
          this.chart.xAxis.data = name;
          this.chart.series["0"].data = car;
          this.chart.series["1"].data = bus;

          return this.chart
        } else {
          return this.chart
        }
			}
		})
	},
	mounted() {
		this.getdata()
	},
	data: function() {
		return {
			chart: {
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
		}
	},
	name: 'item'
}

</script>
