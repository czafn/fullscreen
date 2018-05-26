import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import Alarm from '../alarm';





class AppRoot extends React.Component {
  componentWillMount() {

  }

    componentWillUnmount() {

    }
    render() {
      return (
              <Alarm />

      );
  }
}
export default connect()(AppRoot);
