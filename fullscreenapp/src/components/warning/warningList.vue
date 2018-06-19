<template>
	<div>
    <table cellspacing="0" cellpadding="0">
      <thead>
        <th>DeviceId</th>
        <th>预警类型</th>
        <th>更新时间</th>
      </thead>
      <tbody>
        <tr v-for="obj in listData">
          <td>{{obj.DeviceId}}</td>
          <td>{{obj.type}}</td>
          <td>{{obj.update_time}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
table{
  width: 95%;
  padding: 0;
}
th,td{
  width: 27%;
  font-weight: 300;
  font-size: 13px;
  text-align: left;
  padding: 0 15px;
}
th:nth-child(3),td:nth-child(3){
  width: 44%;
}
table tr{
  height: 23px;
}
table tr:nth-child(odd){background:rgba(14, 63, 93, 0.69);}
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

	},
	computed: {

	},
	// mounted() {
	// 	this.getdata()
	// },
	data: function() {
		return {
			listData: [
        {"update_time":"2017/11/18 04:26:00","DeviceId":"1727204012","type":"过压"},
        {"update_time":"2017/11/17 22:20:00","DeviceId":"1719100098","type":"过温"},
        {"update_time":"2017/11/17 22:04:00","DeviceId":"1627100777","type":"欠压"},
        {"update_time":"2017/11/18 10:03:00","DeviceId":"1724101290","type":"SOC不一致"},
        {"update_time":"2017/11/18 04:55:00","DeviceId":"1627100478","type":"SOC不一致"},
        {"update_time":"2017/11/20 09:56:00","DeviceId":"1724101531","type":"温度跳变"},
        {"update_time":"2017/11/20 10:06:00","DeviceId":"1724106076","type":"温度跳变"},
        {"update_time":"2017/11/20 01:37:00","DeviceId":"1719103339","type":"过压"},
      ]
		}
	},
	name: 'waringList'
}

</script>
