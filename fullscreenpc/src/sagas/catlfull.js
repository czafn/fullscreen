import {take,put,race,call,select,takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  catl_working_request,
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
  setquery_deviceext_result
  // querydevicegroup_request
} from '../actions';
// import config from '../env/config';

export function* catldata(){
  yield takeLatest(`${setquery_deviceext_request}`, function*(action) {
    try{
      const {payload} = action;
      console.log(`payload--->${JSON.stringify(payload)}`);
      const query = payload;
      // yield call(delay, 3000);
      yield put(getcountcar_request({query}));//获取CAR个数
      // yield call(delay, 3000);
      yield put(getcountbus_request({query}));//获取BUS个数
      // yield call(delay, 3000);
      yield put(getusedyearcar_request({query}));//获取CAR使用年限
      // yield call(delay, 3000);
      yield put(getusedyearbus_request({query}));//获取BUS使用年限
      // yield call(delay, 3000);
      // catlprojectname:'',//项目名
      // provice:''//省份
      const {catlprojectname,provice} = query;
      if(!!catlprojectname){
          yield put(getstatprovince_request({query:{catlprojectname}}));
      }
      else{
        yield put(getstatprovince_request({}));//获取省份统计
      }
      if(!!provice){
        yield put(getstatcatlproject_request({query:{provice}}));//获取项目统计
      }
      else{
        yield put(getstatcatlproject_request({}));//获取项目统计
      }
      yield put(setquery_deviceext_result(query));
    }
    catch(e){
      console.log(e);
    }

  });

}
//获取地理位置信息，封装为promise
export function* querycatldata(){//仅执行一次
  // yield put(catl_working_request({}));
  // yield put(catl_cycle_request({}));
  // yield put(catl_celltemperature_request({}));
  // yield put(catl_cyclecount_request({}));
  // yield put(catl_dxtemperature_request({}));
  // yield put(catl_warningf_request({}));
  // yield put(getcountcar_request({}));
  // yield put(getcountbus_request({}));
  // yield put(getusedyearcar_request({}));
  // yield put(getusedyearbus_request({}));
  // yield put(getstatprovince_request({}));
  // yield put(getstatcatlproject_request({}));

  const delaytime = 60000;
  while(true){
      console.log(`start catl query....`);

      //超时《--需要有超时未返回数据提示
      yield put(catl_working_request({}));
      // yield call(delay, 3000);
      yield put(catl_cycle_request({}));
      // yield call(delay, 3000);
      yield put(catl_celltemperature_request({}));
      // yield call(delay, 3000);
      yield put(catl_cyclecount_request({}));
      // yield call(delay, 3000);
      yield put(catl_dxtemperature_request({}));
      // yield call(delay, 3000);
      yield put(catl_warningf_request({}));

      const query = yield select((state)=>{
        return state.deviceext.query;
      });
      // yield call(delay, 3000);
      yield put(getcountcar_request({query}));//获取CAR个数
      // yield call(delay, 3000);
      yield put(getcountbus_request({query}));//获取BUS个数
      // yield call(delay, 3000);
      yield put(getusedyearcar_request({query}));//获取CAR使用年限
      // yield call(delay, 3000);
      yield put(getusedyearbus_request({query}));//获取BUS使用年限
      // yield call(delay, 3000);
      // catlprojectname:'',//项目名
      // provice:''//省份
      const {catlprojectname,provice} = query;
      if(!!catlprojectname){
          yield put(getstatprovince_request({query:{catlprojectname}}));
      }
      else{
        yield put(getstatprovince_request({}));//获取省份统计
      }

      if(!!provice){
        yield put(getstatcatlproject_request({query:{provice}}));//获取项目统计
      }
      else{
        yield put(getstatcatlproject_request({}));//获取项目统计
      }
      // yield call(delay, 3000);


      const { result, timeout } = yield race({
          result: take(`${logout_request}`),
          timeout: call(delay, delaytime)
      });
      if(!!result){
        console.log(`exit query catl....`);
        break;
      }
  }
}
