import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import app from './app';
import userlogin from './userlogin';
import weui from './weui';
import device from './device';

export default combineReducers({
  app,
  userlogin,
  weui,
  device
});
