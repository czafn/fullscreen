import {takeLatest,call} from 'redux-saga/effects';
import {
  download_excel
} from '../actions';
import restfulapi from './restfulapi';
import config from '../env/config';

//获取地理位置信息，封装为promise
export function* downloadexcel(){//仅执行一次
   yield takeLatest(`${download_excel}`, function*(action) {
      try{
        const {payload:{type,query}} = action;
        const usertoken = localStorage.getItem(`bms_${config.softmode}_token`);
        //console.log(`download_excel===>type:${JSON.stringify(type)},query:${JSON.stringify(query)}`);
        const json = yield call(restfulapi.getdownloadtoken,{query,usertoken});
        console.log(json);
        if(!!json.tokenid){
          yield call(restfulapi.getexcelfile,{type,tokenid:json.tokenid});
        }
      }
      catch(e){
        console.log(e);
      }

    });

}
