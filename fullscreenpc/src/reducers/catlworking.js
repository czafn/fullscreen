import { createReducer } from 'redux-act';
import{
  catl_working_result,
  catl_cycle_result,
  catl_celltemperature_result,
  catl_cyclecount_result,
  catl_dxtemperature_result
} from '../actions';

const initial = {
  catlworking: {
      working:[],
      cycle:[],
      celltemperature:[],
      cyclecount:[],
      dxtemperature:[]
  },
};

const catlworking = createReducer({
  [catl_working_result]:(state,payload)=>{
      let working = [...payload];
      return  {...state,working};
  },
  [catl_cycle_result]:(state,payload)=>{
      let cycle = [...payload];
      return  {...state,cycle};
  },
  [catl_celltemperature_result]:(state,payload)=>{
      let celltemperature = [...payload];
      return  {...state,celltemperature};
  },
  [catl_cyclecount_result]:(state,payload)=>{
      let cyclecount = [...payload];
      return  {...state,cyclecount};
  },
  [catl_dxtemperature_result]:(state,payload)=>{
      let dxtemperature =[...payload];
      return  {...state,dxtemperature};
  },
}, initial.catlworking);

export default catlworking;
