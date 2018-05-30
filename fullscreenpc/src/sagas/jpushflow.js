import {takeLatest,put,call} from 'redux-saga/effects';
import {
    login_result,
    logout_result,
    jpushlistenInMessage,
    jpushpostNotification,

} from '../actions';
import {
    setJPushAlias,
    cancelJPushAlisa
} from '../env/jpush';
import get from 'lodash.get';
import { push } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
import {delay} from 'redux-saga';

let async_setJPushAlias =(userid)=> {
  return new Promise(resolve => {
    setJPushAlias(userid);
    resolve();
  });
};

let async_cancelJPushAlisa =()=> {
  return new Promise(resolve => {
    cancelJPushAlisa();
    resolve();
  });
};

//获取地理位置信息，封装为promise
export function* jpushflow(){//仅执行一次
   yield takeLatest(`${login_result}`, function*(action) {
      let {payload:{userid}} = action;
      yield call(async_setJPushAlias,userid);

    });

    yield takeLatest(`${logout_result}`, function*(action) {
      // let {payload:msgobj} = action;
      yield call(async_cancelJPushAlisa);

    });

    yield takeLatest(`${jpushlistenInMessage}`, function*(action) {
       let {payload} = action;
        try{
          //yield call(alertmessage,`jpushlistenInMessage ===>${JSON.stringify(msgobj)}`);
          const msgobj = get(payload,'data');
          if(!!msgobj){
            // let message = '接收到一条消息';
            // message = get(msgobj,'aps.alert',message);
            // yield put(set_weui({
            //   toast:{
            //   text:message,
            //   show: true,
            //   type:'success'
            // }}));
            // alert(`jpushlistenInMessage->${JSON.stringify(msgobj)}`);
            if(!!msgobj._id){
              if(msgobj.messagetype==='msg'){
                yield call(delay, 2000);
                yield put(push(`/alarmrawinfos/${msgobj.DeviceId}`));
              }
              // else{
              //   yield put(push(`${msgobj.messagecontent}`));
              // }
            }
            else{
              alert(`err->jpushlistenInMessage ===>${JSON.stringify(msgobj)}`);
            }
          }
        }
          catch(e){
            alert(`err->jpushlistenInMessage ===>${JSON.stringify(payload)},e:${JSON.stringify(e)}`);
          }

    });

    yield takeLatest(`${jpushpostNotification}`, function*(action) {
      let {payload} = action;
        // 按 2，模拟发送（点击了推送消息）
        try{
          //alert(`jpushpostNotification ===>${JSON.stringify(msgobj)}`);
          //yield call(alertmessage,`jpushpostNotification ===>${JSON.stringify(msgobj)}`);


          const msgobj = get(payload,'data');
          if(!!msgobj){
            // alert(`jpushpostNotification->${JSON.stringify(msgobj)}`);
            if(!!msgobj._id){
              if(msgobj.messagetype==='msg'){
                yield call(delay, 2000);
                yield put(push(`/alarmrawinfos/${msgobj.DeviceId}`));
              }
              // else{
              //   yield put(push(`${msgobj.messagecontent}`));
              // }
            }
            else{
              alert(`err->jpushlistenInMessage ===>${JSON.stringify(msgobj)}`);
              // let message = '接收到一条消息';
              // message = get(msgobj,'aps.alert',message);
              // yield put(set_weui({
              //   toast:{
              //   text:message,
              //   show: true,
              //   type:'success'
              // }}));
            }
          }

        }
        catch(e){
          alert(`err->jpushlistenInMessage ===>${JSON.stringify(payload)},e:${JSON.stringify(e)}`);
        }

    });
}
