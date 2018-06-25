import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import Alarm from '../alarm';
import Warning from '../warning';
import Dashboard from '../dashboard';
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
import './tab0.css';

const tabs2 = [
  { title: '仪表板', sub: '1' },
  { title: '报警', sub: '2' },
  { title: '预警', sub: '3' },
];
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
  componentDidMount() {

  };

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

    return (<div className='tab0' style={{width:'100%', height:'90%', color:''}}>
      <Tabs tabs={tabs2}
            initialPage={0}
            swipeable={false}
            tabBarUnderlineStyle={{display:'none'}}
            renderTab={tab => <span>{tab.title}</span>}
      >
        <Dashboard />
        <Alarm />
        <Warning />
      </Tabs>
        {/*<SegmentedControl values={['仪表板', '报警','预警']}*/}
          {/*onChange={this.onChange}*/}
          {/*selectedIndex={this.state.selectedIndex}/>*/}
          {/*<div style={{width:'100%', height:'100%',display: (this.state.selectedIndex === 0) ? 'inline': 'none'}}>*/}
            {/*/!*<Alarm />*!/*/}
            {/*<Dashboard />*/}
          {/*</div>*/}
          {/*<div style={{width:'100%', height:'100%',display: (this.state.selectedIndex === 1) ? 'inline': 'none'}}>*/}
            {/*<Alarm />*/}
            {/*/!*<Dashboard />*!/*/}
          {/*</div>*/}
          {/*<div style={{width:'100%', height:'100%',display: (this.state.selectedIndex === 2) ? 'inline': 'none'}}>*/}
            {/**/}
          {/*</div>*/}

    </div>);
  }
}

// const mapStateToProps = ({userlogin}) => {
//    const {username,role,avatar} = userlogin;
//    return {username,role,avatar};
// }
export default connect()(App);
