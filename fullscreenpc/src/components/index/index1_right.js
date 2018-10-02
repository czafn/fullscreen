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
import {ui_clickwarning} from '../../actions';
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

    faultClick(level){
      //故障点击处理
      //点击之后 需要能够有个地方存储这个属性，然后我要在 mapmain.js 里面用这个属性 ，来判断marker的展示。
      this.props.dispatch(ui_clickwarning(level));
    }

    render() {
      const {centerIndex, rightIndex, query} = this.props;
      return (
          <div className="back1_right" >
            {/*<div style={{width:'1920px',height:'50px',display:'flex',justifyContent: 'space-between'}}>*/}
              {/*<div style={{background:'red',width:'25%'}}>dd</div><div style={{background:'green',width:'25%'}}>dd</div><div style={{background:'blue',width:'25%'}}>dd</div><div style={{background:'yellow',width:'25%'}}>dd</div>*/}
            {/*</div>*/}
              <div className="center">
                  <div className="title-center1">
                    {/*<div style={{height:'50px',backgroud:'red'}}>*/}
                      {/*<div style={{width: '480px', height: '50px', background: 'red',float: 'left'}}></div>*/}
                      {/*<div style={{width: '480px', height: '50px', background: 'green',float: 'left'}}></div>*/}
                      {/*<div style={{width: '480px', height: '50px', background: 'blue',float: 'left'}}></div>*/}
                      {/*<div style={{width: '480px', height: '50px', background: 'yellow',float: 'left'}}></div>*/}
                    {/*</div>*/}
                      <div className="title-center-box" style={{}}>

                          <div className="titleNumCol-center" style={{marginLeft: '0px'}}>
                            <div className="title-center-title"><img src="index/top.png" alt=""></img>储能柜</div>
                            <div className="title-center-content-border">
                              <div className="title-center-content">
                                <span className="title-center-content-num">{rightIndex.energy}</span>
                                <span className="title-center-content-day">辆</span>
                              </div>
                            </div>
                          </div>
                          <div className="titleNumCol-center" style={{marginLeft: '30px'}}>
                              <div className="title-center-title"><img src="index/top.png" alt=""></img>总数量</div>
                              <div className="title-center-content-border" onClick={this.faultClick.bind(this, 'count_all')}>
                                  <div className="title-center-content" style={{cursor: 'pointer'}}>
                                      <span className="title-center-content-num">{centerIndex.count_all}</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>
                          <div className="titleNumCol-center " style={{marginLeft: '30px'}}>
                              <div className="title-center-title red"><img src="index/top.png" alt=""></img>三级</div>
                              <div className="title-center-content-border red-border" onClick={this.faultClick.bind(this, 'count_red')}>
                                  <div className="title-center-content red" style={{cursor: 'pointer'}}>
                                      <span className="title-center-content-num">{centerIndex.count_red}</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>
                          <div className="titleNumCol-center " style={{marginLeft: '30px'}}>
                              <div className="title-center-title orange"><img src="index/top.png" alt=""></img>二级</div>
                              <div className="title-center-content-border orange-border" onClick={this.faultClick.bind(this, 'count_orange')}>
                                  <div className="title-center-content orange" style={{cursor: 'pointer'}}>
                                      <span className="title-center-content-num">{centerIndex.count_orange}</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>
                          <div className="titleNumCol-center " style={{marginLeft: '30px'}}>
                              <div className="title-center-title yellow"><img src="index/top.png" alt=""></img>一级</div>
                              <div className="title-center-content-border yellow-border" onClick={this.faultClick.bind(this, 'count_yellow')}>
                                  <div className="title-center-content yellow" style={{cursor: 'pointer'}}>
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

const mapStateToProps = ({
                           catlworking:{
                             countonline,
                             counttotal,
                             countalarm3,
                             countalarm2,
                             countalarm1,

                             countalarm1_map,
                             countalarm2_map,
                             countalarm3_map,
                           },
                           deviceext:{countcar,countbus,countContainer,countEnergy,query}
                         }) => {
  let count_online = countonline;
  let count_offline = counttotal-countonline;
  //为保持和地图的一致性
  // let count_yellow = countalarm1;
  // let count_red = countalarm3;
  // let count_orange = countalarm2;

  let count_yellow = countalarm1_map;
  let count_red = countalarm3_map;
  let count_orange = countalarm2_map;

  const centerIndex = {
    count_online:count_online,
    count_offline:count_offline,
    count_all:count_online+count_offline,
    count_red:count_red,
    count_yellow:count_yellow,
    count_orange:count_orange,
  };
  const rightIndex = {
    bus:countbus,
    car:countcar,
    container:countContainer,
    energy:countEnergy
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
