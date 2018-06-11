import { createReducer } from 'redux-act';
import{
  getcountcar_result,
  getcountbus_result,
  getusedyearcar_result,
  getusedyearbus_result,
  getstatprovince_result,
  getstatcatlproject_result,
  setquery_deviceext_result,
  settype_deviceext
} from '../actions';

// catlprojectname:'',//项目名
// provice:''//省份
// provice:'江苏省',
// catlprojectname:'TTT-133'
const initial = {
  deviceext: {
      countcar:0,
      countbus:0,
      usedyearcar:[],
      usedyearbus:[],
      statprovince:[],
      statcatlproject:[],
      type:{
        BUS:true,
        CAR:true
      },
      query:{//所有条件不满足

      }
  },
};

const deviceext = createReducer({
  [settype_deviceext]:(state,payload)=>{
    const type = {...payload};
    return  {...state,type};
  },
  [setquery_deviceext_result]:(state,payload)=>{
      const query = {...payload};
      return  {...state,query};
  },
  [getcountcar_result]:(state,payload)=>{
      let countcar = payload;
      return  {...state,countcar};
  },
  [getcountbus_result]:(state,payload)=>{
      let countbus = payload;
      return  {...state,countbus};
  },
  [getusedyearcar_result]:(state,payload)=>{
      let usedyearcar = [...payload];
      return  {...state,usedyearcar};
  },
  [getusedyearbus_result]:(state,payload)=>{
      let usedyearbus = [...payload];
      return  {...state,usedyearbus};
  },
  [getstatprovince_result]:(state,payload)=>{
      let statprovince =[...payload];
      return  {...state,statprovince};
  },
  [getstatcatlproject_result]:(state,payload)=>{
      let statcatlproject =[...payload];
      return  {...state,statcatlproject};
  },
}, initial.deviceext);

export default deviceext;
