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
import { SegmentedControl, WingBlank } from 'antd-mobile';
import { Carousel } from 'antd-mobile';

import 'antd-mobile/dist/antd-mobile.css';
import './home.css';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedIndex : 0
    }
  }
  onChange =(e)=>{
    this.setState({
      selectedIndex:e.nativeEvent.selectedSegmentIndex
    })
  }
  render() {
    //综合信息《ppppppp
  //   {
  //   title:'预警信息',
  //   Co:<Warning />
  // },
  // {
  //   title:'报警信息',
  //   Co:<Alarm />
  // },
    let SelCo;
    if(this.state.selectedIndex === 0){
      SelCo =  (
        <div>
          仪表板
        </div>);//这里确认需求
    }
    else if(this.state.selectedIndex === 1){
      SelCo =  (<Alarm />);
    }
    else if(this.state.selectedIndex === 2){
      SelCo =  (<Warning />);
    }
    return (<div style={{width:'100%', height:'80%'}}>
        <SegmentedControl values={['仪表板', '报警','预警']}
          onChange={this.onChange}
          selectedIndex={this.state.selectedIndex}/>
          <div style={{width:'100%', height:'100%'}}>
            {SelCo}
          </div>

    </div>);
  }
}

// const mapStateToProps = ({userlogin}) => {
//    const {username,role,avatar} = userlogin;
//    return {username,role,avatar};
// }
export default connect()(App);
