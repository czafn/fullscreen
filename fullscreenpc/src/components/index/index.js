import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import Alarm from '../alarm';
import Warning from '../warning';
import Cycle from '../cycle';
import CellTemperature from '../cellTemperature';
import DxTemperature  from '../alarm';
import CycleCount  from '../alarm';
import MapProvince  from '../alarm';
import Item  from '../alarm';
import BusYear  from '../alarm';
import CarYear  from '../alarm';
import './index.css';



class AppRoot extends React.Component {
  componentWillMount() {

  }

    componentWillUnmount() {

    }
    render() {
      const {nowday, nowtime} = this.props;
      return (
          <div className="back">

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
                              <div className="cbody-left-top-title">
                                  Cycle数分布
                              </div>
                              <div className="cbody-left-top-box">
                                  <Cycle></Cycle>
                              </div>
                          </div>
                          <div className="left-top-right">
                              <div className="cbody-left-top-title left-right">
                                  等效温度分布
                              </div>
                              <div className="cbody-left-top-box left-right">
                                  <DxTemperature></DxTemperature>
                              </div>
                          </div>
                      </div>
                      <div className="cbody-left-buttom">
                          <div className="left-top-left">
                              <div className="cbody-left-top-title">
                                  电芯温差
                              </div>
                              <div className="cbody-left-top-box">
                                  <CellTemperature></CellTemperature>
                              </div>
                          </div>
                          <div className="left-top-right">
                              <div className="cbody-left-top-title">
                                  充电次数分析
                              </div>
                              <div className="cbody-left-top-box">
                                  <CycleCount></CycleCount>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="center">
                  <div className="title-center">
                      <div className="title-center-box">
                          <div className="titleNumCol">
                              <div className="title-center-title"><img src="index/top.png" alt=""></img>市场保有量</div>
                              <div className="title-center-content-border">
                                  <div className="title-center-content">
                                      <span className="title-center-content-num">63753</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>
                          <div className="titleNumCol">
                              <div className="title-center-title"><img src="index/top.png" alt=""></img>已联网</div>
                              <div className="title-center-content-border">
                                  <div className="title-center-content">
                                      <span className="title-center-content-num">33753</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>
                          <div className="titleNumCol">
                              <div className="title-center-title"><img src="index/top.png" alt=""></img>未联网</div>
                              <div className="title-center-content-border">
                                  <div className="title-center-content">
                                      <span className="title-center-content-num">23753</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>
                          <div className="titleNumCol">
                              <div className="title-center-title"><img src="index/top.png" alt=""></img>故障车辆</div>
                              <div className="title-center-content-border">
                                  <div className="title-center-content">
                                      <span className="title-center-content-num">8753</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>
                          <div className="titleNumCol">
                              <div className="title-center-title"><img src="index/top.png" alt=""></img>今日新增</div>
                              <div className="title-center-content-border" style={{width: "190px"}}>
                                  <div className="title-center-content" style={{width: "180px"}}>
                                      <span className="title-center-content-num">53</span>
                                      <span className="title-center-content-day">辆</span>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
                  <div className="cbody-center">
                      <div className="cbody-center-top">
                          <iframe src="http://localhost:3000/#/index" frameBorder="0" style={{width: "100%", height: "100%"}}></iframe>
                      </div>

                  </div>
              </div>

              <div className="right">
                  <div className="title-right">
                      <div className="titleNumCol titleNumCol-right">
                          <div className="title-center-title"><img src="index/top.png" alt=""></img>BUS车辆</div>
                          <div className="title-center-content-border">
                              <div className="title-center-content">
                                  <span className="title-center-content-num">8753</span>
                                  <span className="title-center-content-day">辆</span>
                              </div>
                          </div>
                      </div>
                      <div className="titleNumCol">
                          <div className="title-center-title"><img src="index/top.png" alt=""></img>CAR车辆</div>
                          <div className="title-center-content-border" style={{width: "190px"}}>
                              <div className="title-center-content" style={{width: "180px"}}>
                                  <span className="title-center-content-num">1153</span>
                                  <span className="title-center-content-day">辆</span>
                              </div>
                          </div>
                      </div>
                      <div className="titleNumCol titleNumCol-right">
                          <div className="title-right-top">{nowday}</div>
                          <div className="title-right-buttom">{nowtime}</div>
                      </div>

                  </div>
                  <div className="cbody-right">

                      <div className="cbody-right-bottom">

                          <div className="right-bottom-center">
                              <div style={{height: "50%"}}>
                                  <div className="cbody-right-title-top">
                                      CAR-车辆使用年限
                                  </div>
                                  <div className="cbody-right-box year">
                                      <CarYear></CarYear>
                                  </div>
                              </div>
                              <div style={{height: "50%"}}>
                                  <div className="cbody-right-title">
                                      BUS-车辆使用年限
                                  </div>
                                  <div className="cbody-right-box">
                                      <BusYear></BusYear>
                                  </div>
                              </div>

                          </div>
                          <div className="right-bottom-right">
                              <div className="cbody-right-title-top">
                                  BUS-省份车辆分布
                              </div>
                              <div className="cbody-right-box busProvince">
                                  <MapProvince></MapProvince>
                              </div>
                          </div>
                      </div>
                      <div className="cbody-right-top">
                          <div className="right-top-left">
                              <div className="cbody-right-title">
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
const mapStateToProps = ({}) => {
    const nowday = new Date();
    const nowtime = new Date();
    return {nowday, nowtime};
}
export default connect()(AppRoot);
