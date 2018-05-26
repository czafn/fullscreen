<template>
  <div class="back">
    <!-- <t6 v-for="(item,key) in opendailog" :key='key'></t6> -->
    <div class="left">
      <div class="title-left">
        <div style="float: left;margin: 0 20px"><img src="../../static/catlLOGO1.png" alt="" width="200px"></div>
        <div class="title-left-top">新能源远程监控系统</div>
      </div>
      <div class="cbody-left">
        <div class="cbody-left-top">
          <div class="left-top-left">
            <div class="cbody-left-table-title">
              预警信息
            </div>
            <div class="cbody-left-top-box">
              <warningList></warningList>
            </div>
          </div>
          <div class="left-top-right">
            <div class="cbody-left-table-title">
              报警信息
            </div>
            <div class="cbody-left-top-box">
              <alarmList></alarmList>
            </div>
          </div>

        </div>
        <div class="cbody-left-center">
          <div class="left-top-left">
            <div class="cbody-left-top-title">
              Cycle数分布
            </div>
            <div class="cbody-left-top-box">
              <cycle></cycle>
            </div>
          </div>
          <div class="left-top-right">
            <div class="cbody-left-top-title">
              等效温度分布
            </div>
            <div class="cbody-left-top-box">
              <dxTemperature></dxTemperature>
            </div>
          </div>
        </div>
        <div class="cbody-left-buttom">
          <div class="left-top-left">
            <div class="cbody-left-top-title">
              电芯温差
            </div>
            <div class="cbody-left-top-box">
              <cellTemperature></cellTemperature>
            </div>
          </div>
          <div class="left-top-right">
            <div class="cbody-left-top-title">
              充电次数分析
            </div>
            <div class="cbody-left-top-box">
              <cycleCount></cycleCount>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="center">
      <div class="title-center">
        <div class="title-center-box">
          <div class="titleNumCol">
            <div class="title-center-title"><img src="../../static/top.png" alt="">市场保有量</div>
            <div class="title-center-content-border">
              <div class="title-center-content">
                <span class="title-center-content-num">63753</span>
                <span class="title-center-content-day">辆</span>
              </div>
            </div>
          </div>
          <div class="titleNumCol">
            <div class="title-center-title"><img src="../../static/top.png" alt="">已联网</div>
            <div class="title-center-content-border">
              <div class="title-center-content">
                <span class="title-center-content-num">33753</span>
                <span class="title-center-content-day">辆</span>
              </div>
            </div>
          </div>
          <div class="titleNumCol">
            <div class="title-center-title"><img src="../../static/top.png" alt="">未联网</div>
            <div class="title-center-content-border">
              <div class="title-center-content">
                <span class="title-center-content-num">23753</span>
                <span class="title-center-content-day">辆</span>
              </div>
            </div>
          </div>
          <div class="titleNumCol">
            <div class="title-center-title"><img src="../../static/top.png" alt="">故障车辆</div>
            <div class="title-center-content-border">
              <div class="title-center-content">
                <span class="title-center-content-num">8753</span>
                <span class="title-center-content-day">辆</span>
              </div>
            </div>
          </div>
          <div class="titleNumCol">
            <div class="title-center-title"><img src="../../static/top.png" alt="">今日新增</div>
            <div class="title-center-content-border" style="width: 190px">
              <div class="title-center-content" style="width: 180px">
                <span class="title-center-content-num">53</span>
                <span class="title-center-content-day">辆</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="cbody-center">
        <div class="cbody-center-top">
          <div class="cbody-center-top-len">
            <div class="cbody-center-top-title">健康度</div>
            <div class="cbody-center-top-list" v-for="item in heldata" :key="item.id">
              <div class="cbody-center-top-box" :style="{background:item.color}"></div>
              {{item.name}}
            </div>
          </div>
          <t3></t3>
          <!-- <iframe src="./#/t3" frameborder="0" style="width: 900px;height: 660px;"></iframe> -->
        </div>

      </div>
    </div>

    <div class="right">
      <div class="title-right">
        <div class="titleNumCol titleNumCol-right">
          <div class="title-center-title"><img src="../../static/top.png" alt="">BUS车辆</div>
          <div class="title-center-content-border">
            <div class="title-center-content">
              <span class="title-center-content-num">8753</span>
              <span class="title-center-content-day">辆</span>
            </div>
          </div>
        </div>
        <div class="titleNumCol">
          <div class="title-center-title"><img src="../../static/top.png" alt="">CAR车辆</div>
          <div class="title-center-content-border" style="width: 190px">
            <div class="title-center-content" style="width: 180px">
              <span class="title-center-content-num">1153</span>
              <span class="title-center-content-day">辆</span>
            </div>
          </div>
        </div>
        <div class="titleNumCol titleNumCol-right">
          <div class="title-right-top">{{nowday}}</div>
          <div class="title-right-buttom">{{nowtime}}</div>
        </div>

      </div>
      <div class="cbody-right">
        <div class="cbody-right-top">
          <div class="right-top-left">
            <div class="cbody-right-title-top">
              各项目车辆分布TOP20
            </div>
            <div class="cbody-right-box">
              <item></item>
            </div>
          </div>
        </div>
        <div class="cbody-right-bottom">
          <div class="right-bottom-left">
            <div class="cbody-right-title ">
              CAR-省份车辆分布
            </div>
            <div class="cbody-right-box busProvince">

            </div>
          </div>
          <div class="right-bottom-center">
            <div style="height: 50%">
              <div class="cbody-right-title">
                CAR-车辆使用年限
              </div>
              <div class="cbody-right-box year">

              </div>
            </div>
            <div style="height: 50%">
              <div class="cbody-right-title">
                BUS-车辆使用年限
              </div>
              <div class="cbody-right-box">

              </div>
            </div>

          </div>
          <div class="right-bottom-right">
            <div class="cbody-right-title">
              BUS-省份车辆分布
            </div>
            <div class="cbody-right-box busProvince">

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import cf from '../../common'
import $ from 'jquery'
import { mapState, mapActions } from 'vuex'


import warningList from '../warning/warningList'
import alarmList from '../alarm/alarmList'
import cycle from '../cycle/cycle'
import dxTemperature from '../dxTemperature/dxTemperature'
import cellTemperature from '../cellTemperature/cellTemperature'
import cycleCount from '../cycleCount/cycleCount'
import item from '../item/item'


import t3 from '../t3/t3'



import eachrts from 'echarts';
import CellTemperature from "../cellTemperature/cellTemperature";
export default {
  // methods: {
  //   ...mapActions({
  //     getdata: 'xxx/getdata'
  //   })
  // },
  computed: {
    ...mapState('t0', {
      opendailog: state => state.opendailog
    })
  },
  mounted() {
    var _this = this;
    setInterval(function() {
      _this.nowday = cf.time().day;
      _this.nowtime = cf.time().time;
    }, 1000);

    /*
    var ratio = $(window).width() / 3080;
    $('body').css({
      transform: "scale(" + ratio + ")",
      transformOrigin: "left top",
      backgroundSize: "100%"
    });

    window.onresize = function temp() {
      var ratio = $(window).width() / 3080;
      $('body').css({
        transform: "scale(" + ratio + ")",
        transformOrigin: "left top",
        backgroundSize: "100%"
      });
    };//*/
  },
  components: {
    CellTemperature,
    t3,
    warningList,
    alarmList,
    cycle,
    dxTemperature,
    cellTemperature,
    cycleCount,
    item
  },
  name: 't0',
  data() {
    return {
      heldata: [
        { id: 1, name: "健康", color: "#23a538" },
        { id: 2, name: "良好", color: "#ffb300" },
        { id: 3, name: "中等", color: "#f76400" },
        { id: 4, name: "严重", color: "#f93500" }
      ],
      nowday: '',
      nowtime: '',
    }
  },
}

</script>

<style scoped>
.cbody-right-box {
  width: 100%;
  height: 280px;
  margin-bottom: 20px;
}

.cbody-right-title {
  background: #666;
  width: 100%;
  height: 30px;
  line-height: 15px;
  text-align: left;
  margin-bottom: 10px;
  /*background: url('../../static/underline_right_400.png');*/
  background: url('../../static/underline_left_450.png');
  background-repeat: round;
  /*background-position-y: 100%;*/
  font-size: 21px;
  font-weight: bold;
}
.cbody-right-title-top{
  background: rgba(13, 110, 164, 0.7215686274509804);
  width: 100%;
  height: 30px;
  text-align: left;
  padding: 7px 10px;
  line-height: 15px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-position-y: 100%;
  font-size: 21px;
  font-weight: bold;
}

.cbody-right {
  height: 920px;
  width: 100%;
  padding: 20px 20px 20px 0px;
  /*margin-left: 50px;*/
  float: left;
}

.cbody-center-buttom-box {
  height: 200px;
}

.cbody-center-buttom-title {
  background: url('../../static/underline_900.png');
  background-repeat: no-repeat;
  background-position-y: 100%;
  margin-bottom: 10px;
  height: 30px;
  line-height: 15px;
  font-size: 21px;
  font-weight: bold;
}

.cbody-center-buttom {
  width: 900px;
  height: 240px;
  margin-top: 20px;
}

.cbody-center-top-box {
  width: 35px;
  height: 15px;
  float: left;
  margin-top: 3px;
}

.cbody-center-top-list {
  margin: 5px 10px;
  text-align: right;
}

.cbody-center-top-title {
  margin: 10px;
}

.cbody-center-top-len {
  background: rgba(5, 108, 163, 0.5);
  width: 100px;
  position: absolute;
  left: 15px;
  bottom: 15px;
}

.cbody-center-top {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 2px solid #00a8ff;
  position: relative;
}

.cbody-center {
  height: 980px;
  padding: 30px;
  width: 100%;
  /* margin-left: 50px; */
  float: left;
}

.cbody-left-buttom-box {
  height: 410px;
}

.cbody-left-buttom-title {
  background: url('../../static/underline_left_400.png');
  background-repeat: no-repeat;
  background-position-y: 100%;
  margin-bottom: 10px;
  height: 30px;
  line-height: 15px;
  font-size: 21px;
  font-weight: bold;
}

.cbody-left-buttom {
  width: 100%;
  height: 330px;
  margin-top: 20px;
}

.cbody-left-center {
  width: 100%;
  height: 330px;
  margin-top: 20px;
}
.cbody-left-top-box {
  height: 95%;
}

.cbody-left-top-title {
  background: url('../../static/underline_left_450.png');
  background-repeat: no-repeat;
  background-position-y: 100%;
  margin-bottom: 10px;
  height: 30px;
  line-height: 15px;
  font-size: 21px;
  font-weight: bold;
}

.cbody-left-top {
  width: 100%;
  height: 240px;
}

.cbody-left {
  height: 980px;
  width: 100%;
  /*margin-left: 20px;*/
  padding: 20px 0 20px 20px;
  float: left;
}

.cbody {
  width: 1848px;
  height: 920px;
  border-left: 4px solid rgba(0, 168, 255, 0.2);
  border-right: 4px solid rgba(0, 168, 255, 0.2);
  margin-top: 140px;
  margin-left: 36px;
}


.title-center-box {
  /*position: absolute;*/
  width: 100%;
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  margin-left: 20px;
  margin-top: 20px;
}

div {
  box-sizing: border-box;
  color: #fff;
}

.title-center-title img {
  padding-right: 5px;
}

.title-center-title {
  font-size: 24px;
  float: left;
  margin-right: 20px;
}

.title-center-content-day {
  font-size: 24px;
  position: relative;
  top: -10px;
}

.title-center-content-num {
  font-size: 48px;
}

.title-center-content {
  width: 215px;
  height: 50px;
  background: rgba(0, 168, 255, 0.5);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  line-height: 50px;
  text-align: CENTER;
}

.title-center-content-border {
  float: left;
  width: 225px;
  height: 60px;
  border: 2px solid rgba(0, 168, 255, 0.5);
  position: relative;
}

.title-right-top {
  font-size: 28px;
  font-family: DIN1451;
}

.title-right-buttom {
  font-size: 24px;
  font-family: DIN1451;
}

.title-right {
  height: 100px;
  width: 960px;
  text-align: right;
  float: left;
  padding: 20px 20px 0 0;
  background: url('../../static/title_bg_right.png');

}

.title-center {
  height: 100px;
  width: 1920px;
  float: left;
  background: url('../../static/title_bg_center.png');
}

.title-left-buttom {
  font-size: 24px;
}

.title-left-top {
  font-size: 48px;
  font-weight: bold;
  padding-left: 260px;
}

.title-left {
  height: 100px;
  width: 960px;
  text-align: left;
  padding-top: 17px;
  float: left;
  background: url('../../static/title_bg_left.png');
}

.back {
  width: 3840px;
  height: 1080px;
  background: url('../../static/bg.png');
  background-repeat: no-repeat;
  box-sizing: border-box;
  /*position: fixed;*/
  left: 0px;
  top: 0px;
}

.title {
  /*position: absolute;*/
  /*background: url('../../static/title_bg.png');*/
  background-repeat: no-repeat;
  top: 20px;
  left: 0px;
  width: 100%;
  height: 100px;
  color: #fff;
}
.left{
  width: 960px;
  height: 1080px;
  float: left;
}
.center{
  width: 1920px;
  height: 1080px;
  float: left;
}
.right{
  width: 960px;
  height: 1080px;
  float: left;
}

.left-top-left,.left-top-right{
  width: 50%;
  height: 100%;
  float: left;
}
.cbody-right-top{
  height: 320px;
}
.cbody-right-bottom{
  height: 640px;
}
.right-bottom-left{
  width: 31.9%;
  float: left;
  height: 100%;
}
.right-bottom-center{
  width: 31.9%;
  height: 100%;
  float: left;
  margin-left: 20px;
}
.right-bottom-right{
  width: 31.9%;
  height: 100%;
  float: left;
  margin-left: 20px;
}
.cbody-left-table-title{
  margin-bottom: 10px;
  height: 30px;
  line-height: 15px;
  font-size: 21px;
  font-weight: bold;
  width: 95%;
  padding: 7px 10px;
  background: #0d6ea4b8;
}
.titleNumCol{
  margin-left: 20px;
  line-height: 60px;
  float: left;
}
.titleNumCol-right:nth-child(1){
  margin-left: 40px;
}
.titleNumCol-right:nth-child(3){
  line-height: 34px;
  margin-left: 40px;
}
.busProvince{
  height: 96.5%;
}
.year{
  height: 88%;
}
</style>


