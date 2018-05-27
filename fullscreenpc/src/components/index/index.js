import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import Alarm from '../alarm';
import CellTemperature from '../cellTemperature';




class AppRoot extends React.Component {
  componentWillMount() {

  }

    componentWillUnmount() {

    }
    render() {
      return (
              <div>
                <Alarm />
                <CellTemperature />
              </div>
      );
  }
}
export default connect()(AppRoot);
