import { put,takeLatest,race,take,call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
    set_weui,
    deviceinfoquerychart_result
} from '../actions';
import get from 'lodash.get';
// import { push } from 'react-router-redux';
import endsWith from 'lodash.endswith';
import split from 'lodash.split';

export function* createloadingflow(){
  let action_request = (action)=>{
    let actiontype = action.type;
    return endsWith(actiontype,'_request');
  }

  yield takeLatest(action_request, function*(actionreq) {
    let actionstringsz = split(actionreq.type,/[ _]/);
    let actionstring = actionstringsz[actionstringsz.length - 2];//肯定大于1，因为已经判断有_了
    if(actionstring === 'deviceinfoquerychart'){
      let action_result = (action)=>{
        let actiontype = action.type;
        let isresult = endsWith(actiontype,`${actionstring}_result`);
        if(isresult){
          return true;
        }
        return false;
      }

      let action_commonerr = (action)=>{
        let actiontype = action.type;
        let iscommon_err = endsWith(actiontype,'common_err');
        if(iscommon_err){
          const {payload} = action;
          if(!!payload){
            return payload.type === actionstring;
          }
        }
        return false;
      }
      let delaytime = 30000;//30000
      const { result,err, timeout } = yield race({
          result: take(action_result),
          err: take(action_commonerr),
          timeout: call(delay, delaytime)
      });

      if(!!timeout){
        //超时《--需要有超时未返回数据提示
        yield put(set_weui({
          toast:{
          text:'请求超时',
          show: true,
          type:'warning'
        }}));
        yield put(deviceinfoquerychart_result({}));
      }
      else if(!!result){
        //有数据
        const {resultdata:alarmchart} = result.payload;
        const props_ticktime = get(alarmchart,'ticktime',[]);
        if(props_ticktime.length === 0){
          yield put(set_weui({
            toast:{
            text:'未找到数据',
            show: true,
            type:'warning'
          }}));
        }

      }
      else if(!!err){
        //有错误
      }
    }
  });

}
