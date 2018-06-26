import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import Index from './index/home.js';
import Login from './login/login.js';
import Changepwd from './login/changepwd';
import Usercenter from './user';
import {map_setmapinited} from '../actions';
import {requireAuthentication} from './requireauthentication';

import "../css/commonUser.css";
// import "../css/common.css";

class AppRoot extends React.Component {
  componentWillMount() {
    // const script = document.createElement("script");
    // script.src = "http://webapi.amap.com/maps?v=1.4.5&key=788e08def03f95c670944fe2c78fa76f&callback=init&&plugin=AMap.Geocoder,AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.Geocoder,AMap.Driving,AMap.MarkerClusterer";
    // script.async = true;
    // window.init = ()=>{
    //       const scriptui = document.createElement("script");
    //       scriptui.src = "http://webapi.amap.com/ui/1.0/main.js?v=1.0.10";
    //       scriptui.async = true;
    //       document.body.appendChild(scriptui);
    //       scriptui.onload = ()=>{
    //          window.initamaploaded = true;
    //         this.props.dispatch(map_setmapinited(true));
    //       }
    // }
    // document.body.appendChild(script);
  }

  componentWillUnmount() {
      // this.props.dispatch(map_setmapinited(false));
      // window.initamaploaded = false;
  }
    render() {
      return (
              <div className="container">
                <Switch>
                  <Route exact path="/" component={requireAuthentication(Index)} />
                  <Route path="/changepwd" component={Changepwd} />
                  <Route path="/usercenter" component={Usercenter} />
                  <Route path="/login" component={Login} />
                </Switch>
              </div>

      );
  }
}
export default connect()(AppRoot);
