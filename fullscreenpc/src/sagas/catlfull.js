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

  pushdeviceext
  // querydevicegroup_request
} from '../actions';
// import config from '../env/config';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import lodashsortby from 'lodash.sortby';
import lodashreverse from 'lodash.reverse';
import moment from 'moment';
const oldyears = moment().subtract(10,'years').format('YYYY');

const getqueryresult = (deviceextlist,query)=>{
  //deviceextlist中过滤 query,
  let getcountcar = 0;
  let getcountbus = 0;
  let getusedyearcar = [];
  let getusedyearbus = [];
  let getstatprovince = [];
  let getstatcatlproject = [];

  // _id:"5b273fc99eae51428496e987"
  // DeviceId:"1627100503"
  // usedyear:"2004"
  // province:"福建"
  // catlprojectname:"AAA-123"
  // type:"BUS"
  let mapusedyearcar = {};
  let mapusedyearbus = {};
  let mapprovincecar = {};
  let mapprovincebus = {};
  let mapcatlprojectnamecar = {};
  let mapcatlprojectnamebus = {};


  for(let i = 0 ;i < deviceextlist.length ; i++){
    const deviceextinfo = deviceextlist[i];
    let matched = false;
    if(!!query['catlprojectname']){
      if(deviceextinfo.catlprojectname === query['catlprojectname']){
        matched = true;
      }
    }
    else if(!!query['province']){
      if(deviceextinfo.province === query['province']){
        matched = true;
      }
    }
    else{
      matched = true;
    }

    if(lodashget(deviceextinfo,'type') === 'CAR'){
      if(!!mapprovincecar[deviceextinfo.province]){
        mapprovincecar[deviceextinfo.province] += 1;
      }
      else{
          mapprovincecar[deviceextinfo.province] = 1;
      }
      if(!!mapcatlprojectnamecar[deviceextinfo.catlprojectname]){
        mapcatlprojectnamecar[deviceextinfo.catlprojectname] += 1;
      }
      else{
          mapcatlprojectnamecar[deviceextinfo.catlprojectname] = 1;
      }
    }
    if(lodashget(deviceextinfo,'type') === 'BUS'){
      if(!!mapprovincebus[deviceextinfo.province]){
        mapprovincebus[deviceextinfo.province] += 1;
      }
      else{
        mapprovincebus[deviceextinfo.province] = 1;
      }
      if(!!mapcatlprojectnamebus[deviceextinfo.catlprojectname]){
        mapcatlprojectnamebus[deviceextinfo.catlprojectname] += 1;
      }
      else{
        mapcatlprojectnamebus[deviceextinfo.catlprojectname] = 1;
      }
    }

    if(matched){
      let mapusedyear = mapusedyearcar;
      if(lodashget(deviceextinfo,'type') === 'BUS'){
        mapusedyear =  mapusedyearbus;
        getcountbus++;
      }
      if(lodashget(deviceextinfo,'type') === 'CAR'){
        mapusedyear =  mapusedyearcar;
        getcountcar++;
      }
      const usedyear = lodashget(deviceextinfo,'usedyear','');
      if(usedyear !== ''){
        if(oldyears > usedyear){
          if(!mapusedyear[`${oldyears}之前`]){
            mapusedyear[`${oldyears}之前`] = 1;
          }
          else{
            mapusedyear[`${oldyears}之前`] += 1;
          }
        }
        else{
          if(!mapusedyear[usedyear]){
            mapusedyear[usedyear] = 1;
          }
          else{
            mapusedyear[usedyear] += 1;
          }
        }
      }
    }//matched
  }

  console.log(mapprovincebus);
  console.log(mapcatlprojectnamecar);

  lodashmap(mapusedyearcar,(v,k)=>{
    getusedyearcar.push({
      type:'CAR',
      name:k,
      value:`${v}`
    })
  });

  lodashmap(mapusedyearbus,(v,k)=>{
    getusedyearcar.push({
      type:'BUS',
      name:k,
      value:`${v}`
    })
  });

  // let mapprovincecar = {};
  // let mapprovincebus = {};
  // let mapcatlprojectnamecar = {};
  // let mapcatlprojectnamebus = {};

  let province_keymapcount = [];
  lodashmap(mapprovincecar,(vcar,kcar)=>{
    if(!!mapprovincebus[kcar]){
      province_keymapcount.push({
        key:kcar,
        countcar:vcar,
        countbus:mapprovincebus[kcar],
        count:vcar+mapprovincebus[kcar]
      });
    }
  });
  province_keymapcount = lodashsortby(province_keymapcount, [(o)=> { return o.value; }]);
  province_keymapcount = lodashreverse(province_keymapcount);
  //sort with count!
  let maxcount = province_keymapcount.length > 20 ? 20 : province_keymapcount.length;
  for(let i = 0;i < maxcount ;i ++){
    const v = province_keymapcount[i];
    getstatprovince.push({
      type:'CAR',
      name:v.key,
      value:v.countcar
    });
    getstatprovince.push({
      type:'BUS',
      name:v.key,
      value:v.countbus
    });
  }


  //for project
  let project_keymapcount = [];
  lodashmap(mapcatlprojectnamecar,(vcar,kcar)=>{
    if(!!mapcatlprojectnamebus[kcar]){
      project_keymapcount.push({
        key:kcar,
        countcar:vcar,
        countbus:mapcatlprojectnamebus[kcar],
        count:vcar+mapcatlprojectnamebus[kcar]
      });
    }
  });

  project_keymapcount = lodashsortby(project_keymapcount, [(o)=> { return o.value; }]);
  project_keymapcount = lodashreverse(project_keymapcount);
  //sort with count!
  maxcount = project_keymapcount.length > 20 ? 20 : project_keymapcount.length;
  for(let i = 0;i < maxcount ;i ++){
    const v = project_keymapcount[i];
    getstatcatlproject.push({
      type:'CAR',
      name:v.key,
      value:v.countcar
    });
    getstatcatlproject.push({
      type:'BUS',
      name:v.key,
      value:v.countbus
    });
  }

  const payload = {
    getcountcar,
    getcountbus,
    getusedyearcar,
    getusedyearbus,
    getstatprovince,
    getstatcatlproject,
  };
  console.log(`payload--->${JSON.stringify(payload)}`)
  return payload;
}

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
      yield put(catl_request({}));
      //超时《--需要有超时未返回数据提示
      // yield put(catl_working_request({}));
      // yield call(delay, 3000);
      // yield put(catl_cycle_request({}));
      // // yield call(delay, 3000);
      // yield put(catl_celltemperature_request({}));
      // // yield call(delay, 3000);
      // yield put(catl_cyclecount_request({}));
      // // yield call(delay, 3000);
      // yield put(catl_dxtemperature_request({}));
      // // yield call(delay, 3000);
      // yield put(catl_warningf_request({}));

      // const query = yield select((state)=>{
      //   return state.deviceext.query;
      // });
      // yield put(deviceext_request({query}));//
      // yield call(delay, 3000);
      // yield put(getcountcar_request({query}));//获取CAR个数
      // // yield call(delay, 3000);
      // yield put(getcountbus_request({query}));//获取BUS个数
      // // yield call(delay, 3000);
      // yield put(getusedyearcar_request({query}));//获取CAR使用年限
      // // yield call(delay, 3000);
      // yield put(getusedyearbus_request({query}));//获取BUS使用年限
      // // yield call(delay, 3000);
      // // catlprojectname:'',//项目名
      // // province:''//省份
      // const {catlprojectname,province} = query;
      // if(!!catlprojectname){
      //     yield put(getstatprovince_request({query:{catlprojectname}}));
      // }
      // else{
      //   yield put(getstatprovince_request({}));//获取省份统计
      // }
      //
      // if(!!province){
      //   yield put(getstatcatlproject_request({query:{province}}));//获取项目统计
      // }
      // else{
      //   yield put(getstatcatlproject_request({}));//获取项目统计
      // }
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
