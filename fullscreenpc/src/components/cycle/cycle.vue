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
			getdata: 'cycle/getdata'
		})
	},
	computed: {

		...mapState('cycle', {
			_chart(state) {


				var info = state.apidata ? state.apidata : [];
        info = _.sortBy(info,(i) => i.name-0);
        console.log(this.chart)
        this.chart.xAxis[0].data = _.pluck(info,'name');

        this.chart.series[0].data = _.pluck(info,'value');
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
		    chart:
		}

	},

	name: 'cycle'
}


</script>
