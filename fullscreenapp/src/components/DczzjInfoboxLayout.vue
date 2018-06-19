<template>
	<div class="infobox-container" v-show="infoboxSwitch">
		<div class="infobox-header clearfix">
			<p class="infobox-header-title fl">RAMS分析</p>
			<div class="infobox-closebtn fr" @click="closeInfobox()"></div>
		</div>

		<dczzjInfoboxContentLayout></dczzjInfoboxContentLayout>
	</div>
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

.fl {
	float: left;
}

.fr {
	float: right;
}

.clearfix {
	zoom: 1;
}

.clearfix:after {
	content: '';
	display: table;
	clear: both;
}


/* 主体布局 */

.infobox-container {
	width: 960px;
	height: 570px;
	overflow: hidden;
	position: absolute;
	left: 480px;
	top: 180px;
	z-index: 101;
	background: url(../static/pop_box_570.png) no-repeat;
	background-size: 100% 100%;
}

.infobox-header {
	width: 100%;
	height: 30px;
	overflow: hidden;
	margin-top: 14px;
	overflow: hidden;
	/*background: red;*/
}

.infobox-header-title {
	color: #fff;
	font-size: 22px;
	font-weight: bold;
	line-height: 40px;
	margin-left: 30px;
}

.infobox-closebtn {
	width: 22px;
	height: 22px;
	background: url(../static/exit.png) no-repeat;
	background-size: 100% 100%;
	margin-top: 3px;
	margin-right: 20px;
}
</style>


<script type="text/javascript">
import DczzjInfoboxContentLayout from '../components/DczzjInfoboxContentLayout';

export default {
	name: 'DczzjInfoboxLayout',
	components: {
		dczzjInfoboxContentLayout: DczzjInfoboxContentLayout
	},

	data() {
		return {
			infoboxSwitch: true,
		}
	},

	methods: {
		closeInfobox() {
			this.infoboxSwitch = false
		}
	}


}

</script>