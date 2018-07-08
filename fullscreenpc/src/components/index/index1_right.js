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
          <div className="back1_right" >

              <div className="center">
                  <div className="title-center1">
                    {/*<div style={{height:'50px',backgroud:'red'}}>*/}
                      {/*<div style={{width: '480px', height: '50px', background: 'red',float: 'left'}}></div>*/}
                      {/*<div style={{width: '480px', height: '50px', background: 'green',float: 'left'}}></div>*/}
                      {/*<div style={{width: '480px', height: '50px', background: 'blue',float: 'left'}}></div>*/}
                      {/*<div style={{width: '480px', height: '50px', background: 'yellow',float: 'left'}}></div>*/}
                    {/*</div>*/}
                      <div className="title-center-box" style={{}}>

                          <div className="titleNumCol-center" style={{marginLeft: '30px'}}>
                              <div className="title-center-title"><img src="index/top.png" alt=""></img>总数量</div>
                              <div className="title-center-content-border">
                                  <div className="title-center-content">
                                      <span className="title-center-content-num">{centerIndex.count_all}</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>
                          <div className="titleNumCol-center " style={{marginLeft: '140px'}}>
                              <div className="title-center-title red"><img src="index/top.png" alt=""></img>一级</div>
                              <div className="title-center-content-border red-border">
                                  <div className="title-center-content red">
                                      <span className="title-center-content-num">{centerIndex.count_red}</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>
                          <div className="titleNumCol-center " style={{marginLeft: '140px'}}>
                              <div className="title-center-title orange"><img src="index/top.png" alt=""></img>二级</div>
                              <div className="title-center-content-border orange-border">
                                  <div className="title-center-content orange">
                                      <span className="title-center-content-num">{centerIndex.count_orange}</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>
                          <div className="titleNumCol-center " style={{marginLeft: '145px'}}>
                              <div className="title-center-title yellow"><img src="index/top.png" alt=""></img>三级</div>
                              <div className="title-center-content-border yellow-border">
                                  <div className="title-center-content yellow">
                                      <span className="title-center-content-num">{centerIndex.count_yellow}</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>
                        <div className="titleNumCol titleNumCol-right titleTime" style={{lineHeight:'30px',marginLeft: '20px'}}>
                          <div className="title-right-top">{moment(this.state.nowday).format('YYYY-MM-DD') }</div>
                          <div className="title-right-buttom">{moment(this.state.nowday).format('HH:mm:ss') }</div>
                        </div>
                          {/*<div className="titleNumCol">*/}
                              {/*<div className="title-center-title"><img src="index/top.png" alt=""></img>今日新增</div>*/}
                              {/*<div className="title-center-content-border" style={{width: "190px"}}>*/}
                                  {/*<div className="title-center-content" style={{width: "180px"}}>*/}
                                      {/*<span className="title-center-content-num">{centerIndex.today_new}</span>*/}
                                      {/*<span className="title-center-content-day">辆</span>*/}
                                  {/*</div>*/}
                              {/*</div>*/}
                          {/*</div>*/}

                      </div>
                  </div>
                  <div className="cbody-center" style={{padding:'20px 0px 0px 20px'}}>
                      <div className="cbody-center-top">
                          <MapIframe style={{width: "100%", height: "100%"}}></MapIframe>
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
