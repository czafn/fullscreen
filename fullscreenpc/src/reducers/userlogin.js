import { createReducer } from 'redux-act';
import {
  //登录
    login_result,
    logout_result,
    savealarmsettings_result,
} from '../actions';
import config from '../env/config';

const initial = {
  userlogin:{
    loginsuccess: false,
    username: '',
    token: '',
    avatar : "",
    alarmsettings : {
      warninglevel:'',
      subscriberdeviceids : []
    },
    role:'admin'//operator
  },
};

const userlogin = createReducer({
  [savealarmsettings_result]:(state,payload)=>{
    return { ...state, ...payload};
  },
  [logout_result]: (state, payload) => {
    localStorage.removeItem(`bms_${config.softmode}_token`);
    return { ...initial.userlogin};
  },
  [login_result]: (state, payload) => {
    // localStorage.setItem('zhongnan_driver_token',payload.token);
    return { ...state, ...payload};
  },
}, initial.userlogin);

export default userlogin;
