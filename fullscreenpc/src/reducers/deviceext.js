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
// province:''//省份
// province:'江苏省',
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
    console.log(`deviceext->${JSON.stringify(type)}`)
    return  {...state,type};
  },
  [setquery_deviceext_result]:(state,payload)=>{
      const query = {...payload};
      return  {...state,query};
  },
  [getcountcar_result]:(state,payload)=>{
      let countcar = payload;
      console.log(`countcar->${countcar}`)
      return  {...state,countcar};
  },
  [getcountbus_result]:(state,payload)=>{
      let countbus = payload;
      console.log(`countbus->${countbus}`)
      return  {...state,countbus};
  },
  [getusedyearcar_result]:(state,payload)=>{
      let usedyearcar = [...payload];
      console.log(`usedyearcar->${usedyearcar.length}`)
      return  {...state,usedyearcar};
  },
  [getusedyearbus_result]:(state,payload)=>{
      let usedyearbus = [...payload];
      console.log(`usedyearbus->${usedyearbus.length}`)
      return  {...state,usedyearbus};
  },
  [getstatprovince_result]:(state,payload)=>{
      let statprovince =[...payload];
      console.log(`statprovince->${statprovince.length}`)
      return  {...state,statprovince};
  },
  [getstatcatlproject_result]:(state,payload)=>{
      let statcatlproject =[...payload];
      console.log(`statcatlproject->${statcatlproject.length}`)
      return  {...state,statcatlproject};
  },
}, initial.deviceext);

export default deviceext;
