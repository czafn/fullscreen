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
  constructor(props) {
    super(props);

  }
  // onAfterChange(e){
  //   let query = this.props.query;
  //   debugger
  //   switch(e){
  //     case 0:
  //       this.refs.CarYear.onChangeProvince(query.province ? query.province : ['全部'])
  //       this.refs.CarYear.onChangeProject(query.catlprojectname ? query.catlprojectname : ['全部'])
  //       break;
  //     case 1:
  //       this.refs.BusYear.onChangeProvince(query.province ? query.province : ['全部'])
  //       this.refs.BusYear.onChangeProject(query.catlprojectname ? query.catlprojectname : ['全部'])
  //       break;
  //     case 2:
  //       this.refs.MapProvince.onChangeProject(query.catlprojectname ? query.catlprojectname : ['全部'])
  //       break;
  //     case 3:
  //       this.refs.Item.onChangeProvince(query.province ? query.province : ['全部'])
  //       break;
  //   }
  // }
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
    return (<div style={{ height: '88%', width:'100%' }}>
        <Carousel className='my-carousel' style={{ height: '100%', width:'100%' }} infinite autoplay autoplayInterval={10000} >
          <div>
            <CarYear ref='CarYear' />
          </div>
          <div>
            <BusYear ref='BusYear' />
          </div>
          <div style={{ height: '100%', width:'100%' }} >
            <MapProvince ref='MapProvince'/>
          </div>
          <div>
            <Item ref='Item'/>
          </div>
        </Carousel>
    </div>);
  }
}

// const mapStateToProps = (state) => {
//    const query = state.deviceext.query;
//    return {query};
// }
export default connect()(App);
