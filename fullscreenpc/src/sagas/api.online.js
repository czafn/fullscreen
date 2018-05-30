import {wsflow} from './api.ws.js';
import {takeLatest,put,fork,} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
import {
  ui_index_addcollection,
  ui_index_unaddcollection,
  ui_clickplayback,
  // ui_changemodeview,
  collectdevice_request,
  // querydevice_result
} from '../actions';
import { push,} from 'react-router-redux';

export function* apiflow(){//
  try{
    yield fork(wsflow);

    yield takeLatest(`${ui_clickplayback}`, function*(action) {
      try{
        const {payload} = action;
        // const mode = yield select((state)=>{
        //   return state.app.modeview;
        // });
        // if(mode !== 'device'){
        //   yield put(ui_changemodeview('device'));
        //   yield take(`${querydevice_result}`);
        // }
        //轨迹回放时,判断是否为
        yield put(push(`/historyplay/${payload}`));
     }
     catch(e){
       console.log(e);
     }
    });


    yield takeLatest(`${ui_index_addcollection}`, function*(action) {
      try{
        const {payload} = action;
        yield put(collectdevice_request({DeviceId:payload,collected:true}));
      }
      catch(e){
        console.log(e);
      }
    });

    yield takeLatest(`${ui_index_unaddcollection}`, function*(action) {
      try{
        const {payload} = action;
        yield put(collectdevice_request({DeviceId:payload,collected:false}));
      }
      catch(e){
        console.log(e);
      }
    });
  }
  catch(e){
    console.log(e);
  }
}
