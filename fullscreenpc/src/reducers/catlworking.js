import { createReducer } from 'redux-act';
import{
  catl_result,

  catl_cycle_result,
  catl_celltemperature_result,
  catl_cyclecount_result,
  catl_dxtemperature_result,

  catl_warningf_result
} from '../actions';

const initial = {
  catlworking: {
      warningf:[],
      // working:[],/
      cycle:[],
      celltemperature:[],
      cyclecount:[],
      dxtemperature:[]
  },
};

const catlworking = createReducer({
  [catl_result]:(state,payload)=>{
      const {catl_warningf,catl_cycle,catl_celltemperature,catl_cyclecount,catl_dxtemperature} = payload;
      console.log(`catl_warningf->${JSON.stringify(catl_warningf)}`)
      console.log(`catl_cycle->${JSON.stringify(catl_cycle)}`)
      console.log(`catl_celltemperature->${JSON.stringify(catl_celltemperature)}`)
      console.log(`catl_cyclecount->${JSON.stringify(catl_cyclecount)}`)
      console.log(`catl_cyclecount->${JSON.stringify(catl_dxtemperature)}`)

      const warningf = [...catl_warningf];
      const cycle = [...catl_cycle];
      const celltemperature = [...catl_celltemperature];
      const cyclecount = [...catl_cyclecount];
      const dxtemperature = [...catl_dxtemperature];
      return  {...state,warningf,cycle,celltemperature,cyclecount,dxtemperature};
  },

  [catl_warningf_result]:(state,payload)=>{
      let warningf = [...payload];
      return  {...state,warningf};
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
