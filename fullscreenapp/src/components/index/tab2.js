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
import {ui_menuclick_logout}  from '../../actions';
import lodashmap from 'lodash.map';
import Item from '../item';
import CarYear from '../carYear';
import BusYear from '../busYear';
import MapProvince from '../mapProvince';
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { Carousel } from 'antd-mobile';

import 'antd-mobile/dist/antd-mobile.css';
import './home.css';
import './index.css';

class App extends React.Component {
  render() {
    //电池包分析包含《ppppppp
    // {
    //   title:'Cycle数',
    //   Co:<Cycle />
    // },
    // {
    //   title:'等效温度',
    //   Co:<DxTemperature />
    // },
    // {
    //   title:'电芯温差',
    //   Co:<CellTemperature />
    // },
    // {
    //   title:'充电次数',
    //   Co:<CycleCount />
    // },
    return (<div style={{ height: '88%', width:'100%' }}>
      <Carousel style={{ height: '100%', width:'100%' }} infinite autoplay autoplayInterval={10000} >
          <div>
            <Cycle />
          </div>
          <div>
            <DxTemperature />
          </div>
          <div>
            <CellTemperature />
          </div>
          <div>
            <CycleCount />
          </div>
        </Carousel>
    </div>);
  }
}

// const mapStateToProps = ({userlogin}) => {
//    const {username,role,avatar} = userlogin;
//    return {username,role,avatar};
// }
export default connect()(App);
