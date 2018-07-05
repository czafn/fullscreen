import { createReducer } from 'redux-act';
import{
  getcountcar_result,
  getcountbus_result,
  getusedyearcar_result,
  getusedyearbus_result,
  getstatprovince_result,
  getstatcatlproject_result,
  setquery_deviceext_result,
  deviceext_result,
  pushdeviceext,
  settype_deviceext
} from '../actions';

// catlprojectname:'',//项目名
// province:''//省份
// province:'江苏省',
// catlprojectname:'TTT-133'
const initial = {
  deviceext: {
      deviceextlist:[],
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

      },
      sProvince:['全部'],
      sProject:['全部'],
  },
};

const deviceext = createReducer({
  [pushdeviceext]:(state,payload)=>{
    const {list} = payload;
    const deviceextlist = [...list];
    return  {...state,deviceextlist};
  },
  [deviceext_result]:(state,payload)=>{
    const {getcountcar,getcountbus,getusedyearcar,getusedyearbus,getstatprovince,getstatcatlproject} = payload;
    const countcar = getcountcar;
    const countbus = getcountbus;
    const usedyearcar = [...getusedyearcar];
    const usedyearbus = [...getusedyearbus];
    const statprovince = [...getstatprovince];
    const statcatlproject = [...getstatcatlproject];
    // console.log(`usedyearcar->${JSON.stringify(usedyearcar)}`)
    // console.log(`usedyearbus->${JSON.stringify(usedyearbus)}`)
    // console.log(`statprovince->${JSON.stringify(statprovince)}`)
    // console.log(`statcatlproject->${JSON.stringify(statcatlproject)}`)
    // console.log(`countcar->${countcar}`)
    // console.log(`countcar->${countbus}`)
    return  {...state,countcar,countbus,usedyearcar,usedyearbus,statprovince,statcatlproject};
  },
  [settype_deviceext]:(state,payload)=>{
    const type = {...payload};
    // console.log(`deviceext->${JSON.stringify(type)}`)
    return  {...state,type};
  },
  [setquery_deviceext_result]:(state,payload)=>{
      const query = {...payload};
      let sProject = ['全部'];
      let sProvince = ['全部'];
      if(!!query.catlprojectname){
        sProject = [...[query.catlprojectname]];
        sProvince = [...['全部']];
      }
      if(!!query.province){
        sProject = [...['全部']];
        sProvince = [...[query.province]];
      }
      return  {...state,query,sProject,sProvince};
  },
  [getcountcar_result]:(state,payload)=>{
      let countcar = payload;
      // console.log(`countcar->${countcar}`)
      return  {...state,countcar};
  },
  [getcountbus_result]:(state,payload)=>{
      let countbus = payload;
      // console.log(`countbus->${countbus}`)
      return  {...state,countbus};
  },
  [getusedyearcar_result]:(state,payload)=>{
      let usedyearcar = [...payload];
      // console.log(`usedyearcar->${usedyearcar.length}`)
      return  {...state,usedyearcar};
  },
  [getusedyearbus_result]:(state,payload)=>{
      let usedyearbus = [...payload];
      // console.log(`usedyearbus->${usedyearbus.length}`)
      return  {...state,usedyearbus};
  },
  [getstatprovince_result]:(state,payload)=>{
      let statprovince =[...payload];
      // console.log(`statprovince->${statprovince.length}`)
      return  {...state,statprovince};
  },
  [getstatcatlproject_result]:(state,payload)=>{
      let statcatlproject =[...payload];
      // console.log(`statcatlproject->${statcatlproject.length}`)
      return  {...state,statcatlproject};
  },
}, initial.deviceext);

export default deviceext;
