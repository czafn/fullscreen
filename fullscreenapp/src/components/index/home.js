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
import Changepwd from "../user/pwd.js";
import Usercenter from "../user/center.js";
import MapProvince from '../mapProvince';
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import Tab0 from './tab0';
import Tab1 from './tab1';
import Tab2 from './tab2';
import {set_uiapp} from '../../actions';

import 'antd-mobile/dist/antd-mobile.css';
import './home.css';
import './index.css';


class App extends React.Component {
  render() {
    const {ispopuserinfo,ispoppwd} = this.props;
    const tabs = [
      {
        title:'综合信息'
      },
      {
        title:'客档分析'
      },
      {
        title:'电池包分析'
      },
    ]
    return (<div style={{ height: '100%' }}>
      <NavBar icon={<Icon type="ellipsis" />} onClick={
        ()=>
        {
          this.props.dispatch(set_uiapp({ispopuserinfo:true}))
        }
      }>
        新能源远程监控系统
      </NavBar>

      <Tabs tabs={tabs}
        initialPage={1}
        tabBarPosition="bottom"
        renderTab={tab => <span>{tab.title}</span>}
      >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        <Tab0 />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        <Tab1 />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        <Tab2 />
      </div>
    </Tabs>
    {ispopuserinfo  && <Usercenter /> }
    {ispoppwd && <Changepwd />}
    </div>);
  }
}

const mapStateToProps = ({app}) => {
   const {ispopuserinfo,ispoppwd} = app;
   return {ispopuserinfo,ispoppwd};
}
export default connect(mapStateToProps)(App);
