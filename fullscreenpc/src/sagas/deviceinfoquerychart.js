// import {takeLatest,put} from 'redux-saga/effects';
// import {
//   deviceinfoquerychart_request,
//   deviceinfoquerychart_result
// } from '../actions';
//

//获取地理位置信息，封装为promise
export function* deviceinfoquerychartflow(){//仅执行一次
  //  yield takeLatest(`${deviceinfoquerychart_request}`, function*(action) {
  //     try{
  //       const {payload:{DeviceId}} = action;
  //       console.log(`recv ===> ${DeviceId}`);
   //
  //       const resultdata = {
  //         '电压':[1,1,2,2,3],
  //         '电流':[4,5,6]
  //       };
  //       yield put(deviceinfoquerychart_result({DeviceId,resultdata}));
  //     }
  //     catch(e){
  //       console.log(e);
  //     }
   //
  //   });

}
