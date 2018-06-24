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
import { Tabs, WhiteSpace, Badge, TabBar } from 'antd-mobile';
import Tab0 from './tab0';
import Tab1 from './tab1';
import Tab2 from './tab2';
import {set_uiapp} from '../../actions';

import 'antd-mobile/dist/antd-mobile.css';
import './home.css';
// import './index.css';


class App extends React.Component {
  state = {
    selectedTab: 'redTab',
    hidden: false,
    fullScreen: true,
  };

  renderContent(pageText) {
    return (
      <div style={{  height: '100%', textAlign: 'center' }}>
        <NavBar icon={<Icon type="ellipsis" />} onClick={
          ()=>
          {
            this.props.dispatch(set_uiapp({ispopuserinfo:true}))
          }
        }>
          新能源远程监控系统
        </NavBar>
        {pageText === 'Synthesize' && <Tab0 />}
        {pageText === 'Customer' && <Tab1 />}
        {pageText === 'batteryPack' && <Tab2 />}

      </div>
    );
  }

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
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="综合信息"
            key="Synthesize"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent('Synthesize')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="客档分析"
            key="Customer"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent('Customer')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="电池包分析"
            key="batteryPack"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('batteryPack')}
          </TabBar.Item>
        </TabBar>
        {ispopuserinfo  && <Usercenter /> }
        {ispoppwd && <Changepwd />}
      </div>

    //   <div style={{ height: '100%' }}>
    //   <NavBar icon={<Icon type="ellipsis" />} onClick={
    //     ()=>
    //     {
    //       this.props.dispatch(set_uiapp({ispopuserinfo:true}))
    //     }
    //   }>
    //     新能源远程监控系统
    //   </NavBar>
    //
    //   <Tabs tabs={tabs}
    //     initialPage={1}
    //     tabBarPosition="bottom"
    //     renderTab={tab => <span>{tab.title}</span>}
    //   >
    //   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
    //     <Tab0 />
    //   </div>
    //   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', width:'100%', backgroundColor: '#fff' }}>
    //     <Tab1 />
    //   </div>
    //   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', width:'100%', backgroundColor: '#fff' }}>
    //     <Tab2 />
    //   </div>
    // </Tabs>
    // {ispopuserinfo  && <Usercenter /> }
    // {ispoppwd && <Changepwd />}
    // </div>
    );
  }
}

const mapStateToProps = ({app}) => {
   const {ispopuserinfo,ispoppwd} = app;
   return {ispopuserinfo,ispoppwd};
}
export default connect(mapStateToProps)(App);
