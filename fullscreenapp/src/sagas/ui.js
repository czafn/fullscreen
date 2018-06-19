import {takeLatest,put,take} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
import {
  ui_btnclick_deviceonline,
  ui_btnclick_deviceoffline,
  ui_btnclick_alaramall,
  ui_btnclick_alaramred,
  ui_btnclick_alaramorange,
  ui_btnclick_alaramyellow,
  ui_btnclick_devicemessage,

  ui_menuclick_settings,
  ui_menuclick_logout,


  logout_request,
  logout_result,

  // ui_sel_tabindex,

}from '../actions';
import { push,replace } from 'react-router-redux';
// import moment from 'moment';
// import config from '../env/config.js';

export function* uiflow(){//仅执行一次
  //app点击底部菜单
  // yield takeLatest(`${ui_sel_tabindex}`, function*(action) {
  //   const {payload} = action;
  //   //console.log(`点击在线`);
  //   if(payload === 1){
  //     yield put(searchbatteryalarm_request({
  //       query:{
  //         CurDay:moment().format('YYYY-MM-DD')
  //       }
  //     }));
  //   }
  // });
  // if(config.softmode === 'pc'){
  //   yield fork(function*(action) {
  //     while (true) {
  //           yield call(delay, 10000);//10秒刷新一次
  //           const {loginsuccess} = yield select((state)=>{
  //             return {loginsuccess:state.userlogin.loginsuccess};
  //           });
  //
  //           if(loginsuccess){
  //             yield put(gettipcount_request({}));
  //           }
  //
  //       }//while
  //   });
  // }
  //ui_btnclick_devicemessage

  yield takeLatest(`${ui_btnclick_devicemessage}`, function*(action) {
    const {payload:{DeviceId}} = action;
    yield put(push(`/message/all/${DeviceId}`));
  });

  yield takeLatest(`${ui_btnclick_deviceonline}`, function*(action) {
    //console.log(`点击在线`);
  });

  yield takeLatest(`${ui_btnclick_deviceoffline}`, function*(action) {
    //console.log(`点击在线`);
  });

  yield takeLatest(`${ui_btnclick_alaramall}`, function*(action) {
    // yield put(searchbatteryalarm_request({}));
    //console.log(`点击所有报警`);
    yield put(push('/message/all/0'));
  });

  yield takeLatest(`${ui_btnclick_alaramred}`, function*(action) {
    // yield put(searchbatteryalarm_request({
    //   query:{
    //     warninglevel:'高',
    //     CurDay:moment().format('YYYY-MM-DD')
    //   }
    // }));
    // //console.log(`点击红色报警`);
    // yield take(`${searchbatteryalarm_result}`);
    yield put(push('/message/0/0'));
  });

  yield takeLatest(`${ui_btnclick_alaramorange}`, function*(action) {
    // yield put(searchbatteryalarm_request({
    //   query:{
    //     warninglevel:'中',
    //     CurDay:moment().format('YYYY-MM-DD')
    //   }
    // }));
    //console.log(`点击橙色报警`);
    // yield take(`${searchbatteryalarm_result}`);
    yield put(push('/message/1/0'));
  });

  yield takeLatest(`${ui_btnclick_alaramyellow}`, function*(action) {
    // yield put(searchbatteryalarm_request({
    //   query:{
    //     warninglevel:'低',
    //     CurDay:moment().format('YYYY-MM-DD')
    //   }
    // }));
    // //console.log(`点击黄色报警`);
    // yield take(`${searchbatteryalarm_result}`);
    yield put(push('/message/2/0'));
  });

  yield takeLatest(`${ui_menuclick_settings}`, function*(action) {
    //console.log(`点击设置`);
  });

  yield takeLatest(`${ui_menuclick_logout}`, function*(action) {
    //console.log(`点击注销`);
    yield put(logout_request());
    yield take(`${logout_result}`);
    yield put(replace('/login'));
  });

}
