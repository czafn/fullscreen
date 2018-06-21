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
import 'antd-mobile/dist/antd-mobile.css';
import './home.css';
import './index.css';

const listItems = [
  {
    title:'预警信息',
    Co:<Warning />
  },
  {
    title:'报警信息',
    Co:<Alarm />
  },
  {
    title:'Cycle数',
    Co:<Cycle />
  },
  {
    title:'等效温度',
    Co:<DxTemperature />
  },
  {
    title:'电芯温差',
    Co:<CellTemperature />
  },
  {
    title:'充电次数',
    Co:<CycleCount />
  },
  {
    title:'CAR-车辆使用年限',
    Co:<CarYear />
  },
  {
    title:'BUS-车辆使用年限',
    Co:<BusYear />
  },
  {
    title:'各省份车辆分布',
    Co:<MapProvince />
  },
  {
    title:'各项目车辆分布TOP20',
    Co:<Item />
  },
  // {
  //   title:'修改密码',
  // },
  {
    title:'注销',
  },
];

class App extends React.Component {
  state = {
    docked: false,
    selindex:0,
    open: false,
  }
  onClickItem = (index)=>{
    if(index === listItems.length -1){
      //最后一个
      this.props.dispatch(ui_menuclick_logout());
    }
    // else if(index === listItems.length - 2){
    //   //changepwd
    //   this.props.history.push('/changepwd');
    // }
    else{
      this.onOpenChange()
      this.setState({selindex:index})
    }
  }
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  onDock = (d) => {
    this.setState({
      [d]: !this.state[d],
    });
  }
  render() {
    let ListItems = [];
    for(let i = 0;i <listItems.length; i++){
      ListItems.push(<List.Item key={i} onClick={()=>{this.onClickItem(i)}}>{listItems[i].title}</List.Item>);
    }
    const sidebar = (<List>
      {ListItems}
    </List>);

    return (<div style={{ height: '100%' }}>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>
        新能源远程监控系统
      </NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 5,paddingLeft: 0,paddingRight: 0 }}
        sidebarStyle={{ border: '1px solid #ddd' }}
        sidebar={sidebar}
        // docked={this.state.docked}
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >
        {listItems[this.state.selindex].Co}
      </Drawer>
    </div>);
  }
}

// const mapStateToProps = ({userlogin}) => {
//    const {username,role,avatar} = userlogin;
//    return {username,role,avatar};
// }
export default connect()(App);
