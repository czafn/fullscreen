import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import Alarm from '../alarm';
import Warning from '../warning';
import Cycle from '../cycle';
import CycleCount from '../cycleCount';
import DxTemperature from '../dxTemperature';
import CellTemperature from '../cellTemperature';
import {getdevicestatus_isonline,getdevicestatus_alaramlevel} from '../../util/getdeviceitemstatus';
import lodashmap from 'lodash.map';
import Item from '../item';
import CarYear from '../carYear';
import BusYear from '../busYear';
import MapProvince from '../mapProvince';

import './index.css';
import MapIframe from "./mapiframe";

import moment from "moment";


class AppRoot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowday : new Date()
        }
    }

    componentWillMount() {

    }
    timeTicket = null;

    componentDidMount() {

        this.timeTicket = setInterval(() => {

            this.setState({ nowday : new Date() });

        }, 1000);

    };
    componentWillUnmount() {
        if (this.timeTicket) {
            clearInterval(this.timeTicket);
        }
    };


    render() {
      const {centerIndex, rightIndex, query} = this.props;
      return (
          <div className="back" style={{width:'1920px',}}>

              <div className="left">
                  <div className="title-left">
                      <div style={{float: "left", margin: "0 20px"}}><img src="index/catlLOGO1.png" alt="" width="200px"></img></div>
                      <div className="title-left-top">新能源远程监控系统</div>
                  </div>
                  <div className="cbody-left">
                      <div className="cbody-left-top">
                          <div className="left-top-left">
                              <div className="cbody-left-table-title ">
                                  预警信息
                              </div>
                              <div className="cbody-left-top-box">
                                  <Warning></Warning>
                              </div>
                          </div>
                          <div className="left-top-right">
                              <div className="cbody-left-table-title left-right">
                                  报警信息
                              </div>
                              <div className="cbody-left-top-box left-right">
                                  <Alarm></Alarm>
                              </div>
                          </div>

                      </div>
                      <div className="cbody-left-center">
                          <div className="left-top-left">
                              <div className="cbody-left-table-title ">
                                  循环数
                              </div>
                              <div className="cbody-left-top-box">
                                  <Cycle></Cycle>
                              </div>
                          </div>
                          <div className="left-top-right">
                              <div className="cbody-right-title-top left-right">
                                  等效温度
                              </div>
                              <div className="cbody-left-top-box left-right">
                                  <DxTemperature></DxTemperature>
                              </div>
                          </div>
                      </div>
                      <div className="cbody-left-buttom">
                          <div className="left-top-left">
                              <div className="cbody-left-table-title">
                                  电芯温差
                              </div>
                              <div className="cbody-left-top-box">
                                  <CellTemperature></CellTemperature>
                              </div>
                          </div>
                          <div className="left-top-right">
                              <div className="cbody-right-title-top left-right">
                                  充电次数
                              </div>
                              <div className="cbody-left-top-box">
                                  <CycleCount></CycleCount>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>



              <div className="right">
                  <div className="title-right">
                      <div className="titleNumCol titleNumCol-right" style={{marginLeft:'200px'}}>
                          <div className="title-center-title"><img src="index/top.png" alt=""></img>客车</div>
                          <div className="title-center-content-border" style={{width: "190px"}}>
                              <div className="title-center-content" style={{width: "180px"}}>
                                  <span className="title-center-content-num">{rightIndex.bus}</span>
                                  <span className="title-center-content-day">辆</span>
                              </div>
                          </div>
                      </div>
                      <div className="titleNumCol" style={{marginLeft:'80px'}}>
                          <div className="title-center-title"><img src="index/top.png" alt=""></img>乘用车</div>
                          <div className="title-center-content-border" style={{width: "190px"}}>
                              <div className="title-center-content" style={{width: "180px"}}>
                                  <span className="title-center-content-num">{rightIndex.car}</span>
                                  <span className="title-center-content-day">辆</span>
                              </div>
                          </div>
                      </div>
                      {/*<div className="titleNumCol titleNumCol-right titleTime">*/}
                          {/*<div className="title-right-top">{moment(this.state.nowday).format('YYYY-MM-D') }</div>*/}
                          {/*<div className="title-right-buttom">{moment(this.state.nowday).format('hh:mm:ss') }</div>*/}
                      {/*</div>*/}

                  </div>
                  <div className="cbody-right" style={{paddingRight: '0px'}}>

                      <div className="cbody-right-bottom" style={{height:'610px'}}>


                          <div className="right-bottom-right" style={{width:'63.5%'}}>
                              <div className="cbody-right-title-top">
                                {query['catlprojectname'] !== undefined ? query.catlprojectname+'-' : ''}各省份车辆分布
                              </div>
                              <div className="cbody-right-box busProvince">
                                  <MapProvince></MapProvince>
                              </div>
                          </div>

                          <div className="right-bottom-center" style={{marginLeft: '20px'}}>
                            <div style={{height: "50%"}}>
                              <div className="cbody-right-title-top">
                                {query['catlprojectname'] !== undefined ? query.catlprojectname+'-' : ''}
                                {query['province'] !== undefined ? query.province+'-' : ''}

                                客车-使用年限
                              </div>
                              <div className="cbody-right-box year">
                                <BusYear></BusYear>

                              </div>
                            </div>
                            <div style={{height: "50%"}}>
                              <div className="cbody-right-title-top">
                                {query['catlprojectname'] !== undefined ? query.catlprojectname+'-' : ''}
                                {query['province'] !== undefined ? query.province+'-' : ''}
                                乘用车-使用年限
                              </div>
                              <div className="cbody-right-box">
                                <CarYear></CarYear>
                              </div>
                            </div>

                          </div>
                      </div>
                      <div className="cbody-right-top" style={{marginLeft: '20px'}}>
                          <div className="right-top-left">
                              <div className="cbody-right-title-top ">
                                {query['province'] !== undefined ? query.province+'-' : ''}
                                  各项目车辆分布TOP20
                              </div>
                              <div className="cbody-right-box">
                                  <Item></Item>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      );
  }
}

const mapStateToProps = ({app,
  searchresult:{curallalarm,alarms},
  device:{g_devicesdb},
  app:{SettingOfflineMinutes},
  deviceext:{countcar,countbus,query}
}) => {
  const {modeview} = app;

   let count_online = 0;
   let count_offline = 0;

   let count_all = 0;
   let count_yellow = 0;
   let count_red = 0;
   let count_orange = 0;

   lodashmap(g_devicesdb,(deviceitem)=>{
     const isonline = getdevicestatus_isonline(deviceitem,SettingOfflineMinutes);
     const warninglevel = getdevicestatus_alaramlevel(deviceitem);
     if(isonline){
       count_online++;
     }
     else{
       count_offline++;
     }
     if(warninglevel === '高'){
       count_red++;
     }
     else if(warninglevel === '中'){
       count_orange++;
     }
     else if(warninglevel === '低'){
       count_yellow++;
     }
   });

   count_all = count_red + count_orange + count_yellow;

    if(count_all>99){
        // count_all = "99+";
    }

    const centerIndex = {
        count_online:count_online,
        count_offline:count_offline,
        count_all:count_online+count_offline,
        count_red:count_red,
        count_yellow:count_yellow,
        count_orange:count_orange,
        // today_new:56
    };
    const rightIndex = {
        bus:countbus,
        car:countcar
    };

    return {centerIndex, rightIndex, query};
  //  return {count_online,count_offline,count_all,count_yellow,count_red,count_orange,modeview};
 }
// const mapStateToProps = ({}) => {
//     const centerIndex = {
//         count_online:33753,
//         count_offline:23753,
//         count_all:8753,
//         today_new:56
//     };
//     const rightIndex = {
//         bus:1889,
//         car:4834
//     };
//     return {centerIndex, rightIndex};
// }
export default connect(mapStateToProps)(AppRoot);
