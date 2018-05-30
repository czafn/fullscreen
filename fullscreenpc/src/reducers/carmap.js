import { createReducer } from 'redux-act';
import {
    mapmain_setenableddrawmapflag,
    mapmain_setmapcenter,
    mapmain_setzoomlevel,
    map_setmapinited,
    logout_result
} from '../actions';


import L from 'leaflet';

const locz = [0,0];


const initial = {
    carmap: {
        isMapInited:false,
        dragging:false,//是否正在拖动（拖动中避免某些特性可提升性能）
        enabledragging:true,//是否允许拖动
        autozoomenabled:true,//是否自动缩放成合适视图
        zoomlevel:3,//缩放等级
        mapcenterlocation:L.latLng(locz[1], locz[0]),//地图中心位置
    },
};

const carmap = createReducer({
    [mapmain_setenableddrawmapflag]:(state,payload)=>{
      let enableddrawmapflag = payload;
      return {...state,enableddrawmapflag};
    },
    [map_setmapinited]:(state,isMapInited)=>{
      return {...state,isMapInited}
    },
    [mapmain_setmapcenter]:(state,payload)=>{
      let mapcenterlocation = L.latLng(payload.lat, payload.lng)
      return {...state,mapcenterlocation}
    },
    [mapmain_setzoomlevel]:(state,zoomlevel)=>{
        //改变地图缩放等级
        let autozoomenabled = false;
        return { ...state, zoomlevel,autozoomenabled };
    },
    [logout_result]:(state,payload)=>{
      return {...initial.carmap};
    }

}, initial.carmap);

export default carmap;
