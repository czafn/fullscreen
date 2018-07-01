import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import Index from './index';
import Index1_left from './index/index1_left';
import Index1_right from './index/index1_right';
import Index2_left from './index/index2_left';
import Index2_center from './index/index2_center';
import Index2_right from './index/index2_right';
import Login from './login/login.js';
import {map_setmapinited} from '../actions';
import {requireAuthentication} from './requireauthentication';

import "../css/common.css";

class AppRoot extends React.Component {
  componentWillMount() {
    const script = document.createElement("script");
    script.src = "http://webapi.amap.com/maps?v=1.4.5&key=788e08def03f95c670944fe2c78fa76f&callback=init&&plugin=AMap.Geocoder,AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.Geocoder,AMap.Driving,AMap.MarkerClusterer";
    script.async = true;
    window.init = ()=>{
          const scriptui = document.createElement("script");
          scriptui.src = "http://webapi.amap.com/ui/1.0/main.js?v=1.0.10";
          scriptui.async = true;
          document.body.appendChild(scriptui);
          scriptui.onload = ()=>{
             window.initamaploaded = true;
            this.props.dispatch(map_setmapinited(true));
          }
    }
    document.body.appendChild(script);
  }

  componentWillUnmount() {
      this.props.dispatch(map_setmapinited(false));
      window.initamaploaded = false;
  }
    render() {
      return (
              <div className="container">
                <Switch>
                  <Route exact path="/" component={requireAuthentication(Index)} />
                  <Route exact path="/index1_left" component={requireAuthentication(Index1_left)} />
                  <Route exact path="/index1_right" component={requireAuthentication(Index1_right)} />
                  <Route exact path="/index2_left" component={requireAuthentication(Index2_left)} />
                  <Route exact path="/index2_center" component={requireAuthentication(Index2_center)} />
                  <Route exact path="/index2_right" component={requireAuthentication(Index2_right)} />
                  <Route path="/login" component={Login} />
                </Switch>
              </div>

      );
  }
}
export default connect()(AppRoot);
