import { createReducer } from 'redux-act';
import{
  getcountcar_result,
  getcountbus_result,
  getusedyearcar_result,
  getusedyearbus_result,
  getstatprovince_result,
  getstatcatlproject_result,
} from '../actions';

const initial = {
  deviceext: {
      countcar:0,
      countbus:0,
      usedyearcar:[],
      usedyearbus:[],
      statprovince:[],
      statcatlproject:[],
  },
};

const deviceext = createReducer({
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
