import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { polyglotReducer } from 'redux-polyglot';
import weui from './weui';
import app from './app';
import device from './device';
import notifymessage from './messagecenter';
import userlogin from './userlogin';
import carmap from './carmap';
import searchresult from './searchresult';
import workorder from './workorder';
import pic from './pic';
import deviceinfoquerychart from './deviceinfoquerychart';

export default combineReducers({
  pic,
  app,
  carmap,
  searchresult,
  device,
  notifymessage,
  userlogin,
  workorder,
  weui,
  deviceinfoquerychart,
  form: formReducer,
  router: routerReducer,
  polyglot: polyglotReducer,
});
