import {take,put,race,call,select,takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  catl_request,
  deviceext_request,
  deviceext_result,

  catl_cycle_request,
  catl_celltemperature_request,
  catl_cyclecount_request,
  catl_dxtemperature_request,
  catl_warningf_request,

  getcountcar_request,
  getcountbus_request,
  getusedyearcar_request,
  getusedyearbus_request,
  getstatprovince_request,
  getstatcatlproject_request,
  logout_request,

  setquery_deviceext_request,
  setquery_deviceext_result,

  pushdeviceext,

  catl_result,
  common_err
  // querydevicegroup_request
} from '../actions';
// import config from '../env/config';
import {getqueryresult} from './catlfull_getqueryresult';

export function* catldata(){
  yield takeLatest(`${setquery_deviceext_request}`, function*(action) {
    try{
      const {payload} = action;
      console.log(`payload--->${JSON.stringify(payload)}`);
      const query = payload;
      yield put(deviceext_request({query}));//

      yield put(setquery_deviceext_result(query));
    }
    catch(e){
      console.log(e);
    }

  });

  //pushdeviceext
  yield takeLatest(`${pushdeviceext}`, function*(action) {
    try{
      const {list} = action.payload;
      const query = yield select((state)=>{
        return state.deviceext.query;
      });
      const payload = getqueryresult(list,query);
      yield put(deviceext_result(payload));
    }
    catch(e){
      console.log(e);
    }
  });


  yield takeLatest(`${deviceext_request}`, function*(action) {
    try{
      const {query} = action.payload;
      const deviceextlist = yield select((state)=>{
        return state.deviceext.deviceextlist;
      });
      const payload = getqueryresult(deviceextlist,query);
      yield put(deviceext_result(payload));
    }
    catch(e){
      console.log(e);
    }
  });

}
//获取地理位置信息，封装为promise
export function* querycatldata(){//仅执行一次
  const delaytime = 60000;
  yield call(delay,4000);
  while(true){
      console.log(`start catl query....`);
      yield put(catl_request({maxcount:8}));
      //超时《--需要有超时未返回数据提示
      const { logout,catlresult,commonerr, timeout } = yield race({
          logout: take(`${logout_request}`),
          timeout: call(delay, delaytime),
          catlresult:take(`${catl_result}`),
          commonerr:take(`${common_err}`),
      });
      if(!!logout){
        console.log(`exit query catl....`);
        break;
      }

      if(!timeout){
        yield call(delay,delaytime);
      }

  }
}
