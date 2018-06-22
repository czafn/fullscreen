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
    //客档分析包含《ppppppp
    // {
    //   title:'CAR-车辆使用年限',
    //   Co:<CarYear />
    // },
    // {
    //   title:'BUS-车辆使用年限',
    //   Co:<BusYear />
    // },
    // {
    //   title:'各省份车辆分布',
    //   Co:<MapProvince />
    // },
    // {
    //   title:'各项目车辆分布TOP20',
    //   Co:<Item />
    // },
    return (<div style={{ height: '100%' }}>
        <Carousel ref='ddd' infinite autoplay autoplayInterval={10000} >
          <div>
            <CarYear />
          </div>
          <div>
            <BusYear />
          </div>
          <div>
            <MapProvince />
          </div>
          <div>
            <Item />
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
