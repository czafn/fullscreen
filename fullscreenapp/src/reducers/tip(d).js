import { createReducer } from 'redux-act';
import {
  //登录
    gettipcount_result,
    logout_result
} from '../actions';

const initial = {
  tip:{
    count_online:0,
    count_offline: 0,
    count_alarm0:0,
    count_alarm1:0,
    count_alarm2:0
  },
};

const tip = createReducer({
  [gettipcount_result]: (state, payload) => {
      return { ...state,...payload};
  },
  [logout_result]:(state,payload)=>{
    return {...initial.tip};
  }
}, initial.tip);

export default tip;
