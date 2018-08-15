import { select,put,call,take,takeEvery,takeLatest,cancel,fork,join, } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  common_err,
  mapmain_setmapcenter,
  map_setmapinited,
  carmapshow_createmap,
  carmapshow_destorymap,
  querydevicealarm_result,
  querymapstat_request,
  querymapstat_result
} from '../actions';
// import async from 'async';
import {getcurrentpos} from './getcurrentpos';
import { push,replace } from 'react-router-redux';
import L from 'leaflet';
import lodashmap from 'lodash.map';
import lodashclone from 'lodash.clone';
// import find from 'lodash.find';
// import sampleSize from 'lodash.samplesize';
import get from 'lodash.get';
import includes from 'lodash.includes';
import filter from 'lodash.filter';

import config from '../config.js';


import {getdata,setdata} from './catlfull_mapcitystat_data';
const divmapid_mapmain = 'mapmain';
const maxzoom = 9;
let infoWindow;
const loczero = L.latLng(0,0);
let distCluster;
// let groupStyleMap = {};

//新建行政区域
const CreateMapUI_DistrictCluster =  (map)=>{
  return new Promise((resolve,reject) => {
      if(!window.AMapUI){
        alert('未加载到AMapUI！');
        reject();
        return;
      }
      window.AMapUI.load(['ui/geo/DistrictCluster',
      'lib/utils',
      'lib/dom.utils',
      'ui/geo/DistrictCluster/lib/DistMgr',
    ],(DistrictCluster,utils, domUtils, DistMgr)=> {
           //<------------获取某个地点的Marker----------------
           const defaultgetClusterMarker = (feature, dataItems, recycledMarker)=> {
               //行政区域
               try{
                 console.log(feature);
                 const datainfo = getdata(feature.properties.adcode);
                 console.log(datainfo);
                 let isshow = !!datainfo;
                 if(isshow){
                   if(datainfo['totalcount'] === 0){
                     isshow = false;
                   }
                 }
                 if(isshow){
                   let container, title, body;
                   const nodeClassNames = {
                				// title: 'amap-ui-district-cluster-marker-title',
                				// body: 'amap-ui-district-cluster-marker-body',
                				// container: 'amap-ui-district-cluster-marker'
                         title: 'amap-ui-district-cluster-marker-title1',
                         body: 'marker-body-customer-body',
                         container: 'amap-ui-district-cluster-marker1'
                			};
                			if (!!recycledMarker) {
                				container = recycledMarker.getContent();
                				title = domUtils.getElementsByClassName(nodeClassNames.title, 'span', container)[0];
                				body = domUtils.getElementsByClassName(nodeClassNames.body, 'span', container)[0];
                			} else {
                        container = document.createElement('div');
                				title = document.createElement('span');
                				title.className = nodeClassNames.title;
                				body = document.createElement('span');
                				body.className = nodeClassNames.body;
                				container.appendChild(title);
                				container.appendChild(body);
                			}

                			const props = feature.properties,
                			routeNames = [];
                			const classNameList = [nodeClassNames.container, 'level_' + props.level, 'adcode_' + props.adcode];
                			if (props.acroutes) {
                				const acroutes = props.acroutes;
                				for (let i = 0, len = acroutes.length; i < len; i++) {
                					classNameList.push('descendant_of_' + acroutes[i]);
                					if (i === len - 1) {
                						classNameList.push('child_of_' + acroutes[i]);
                					}
                					if (i > 0) {
                						routeNames.push(DistMgr.getNodeByAdcode(acroutes[i]).name);
                					}
                				}
                			}
                			container.className = classNameList.join(' ');
                			if (routeNames.length > 0) {
                				routeNames.push(props.name);
                				container.setAttribute('title', routeNames.join('>'));
                			} else {
                				container.removeAttribute('title');
                			}
                      if(!!title){
                        title.innerHTML = utils.escapeHtml(props.name);
                      }
                			if(!!body){
                        const zoomlevel = window.amapmain.getZoom();
                        console.log(`当前zoomlevel:${zoomlevel}`);

                         let info = `${datainfo['totalcount']}`;
                         if(zoomlevel !== 4 && zoomlevel !== 5){//太挤了
                           info += `<br />小车:${datainfo['CAR']}`;
                           info += `<br />公车:${datainfo['BUS']}`;
                           info += `<br />货车:${datainfo['CONTAINERTRUCK']}`;
                           info += `<br />储能车:${datainfo['ENERGYTRUCK']}`;
                         }
                         body.innerHTML = info;
                      }


                			const resultMarker = recycledMarker || new window.AMap.Marker({
                				topWhenClick: true,
                				offset: new window.AMap.Pixel(-20, -30),
                				content: container
                			});
                			return resultMarker;
                    }
               }
               catch(e){

               }
          	   return null;
        		}
            distCluster = new DistrictCluster({
                 zIndex: 100,
                 map: map, //所属的地图实例
                 autoSetFitView:false,
                 getPosition: (deviceitem)=> {
                     if(!!deviceitem.locz){
                       return deviceitem.locz;
                     }
                     console.log(`err----->=====>======>${JSON.stringify(deviceitem)}`);
                     return deviceitem.locz;
                 },
                 renderOptions:{
                   featureStyleByLevel:{
                       country: {
                           fillStyle: 'rgba(3, 52, 71, 1)'
                       },
                       province: {
                           fillStyle: 'rgba(3, 52, 71, 1)'
                       },
                       city: {
                           fillStyle: 'rgba(3, 52, 71, 1)'
                       },
                       district: {
                           fillStyle: 'rgba(3, 52, 71, 1)'
                       }
                  },
                   featureClickToShowSub:true,
                   clusterMarkerRecycleLimit:100000,
                   clusterMarkerKeepConsistent:true,
                   getClusterMarker : (feature, dataItems, recycledMarker)=> {
                      // if(dataItems.length > 0){
                      // debugger;
                      return defaultgetClusterMarker(feature, dataItems, recycledMarker);
                      // }
                      // return null;
                    }
                 }
             });
             distCluster.setData(null);
             resolve(distCluster);
       });

   });
}

//新建地图
let CreateMap =({mapcenterlocation,zoomlevel})=> {

  return new Promise((resolve,reject) => {
    if(!mapcenterlocation.equals(loczero) && !window.amapmain ){
      let center = new window.AMap.LngLat(mapcenterlocation.lng,mapcenterlocation.lat);
      window.amapmain = new window.AMap.Map(divmapid_mapmain, {
            center: center,
            zoom:zoomlevel,
            zooms:[3,9],
            lang:"zh-cn",
            dragEnable:true,
            zoomEnable:true,
            touchZoom:true,
            mapStyle: 'amap://styles/blue'//样式URL
        });
        // http://lbs.amap.com/api/javascript-api/example/personalized-map/set-theme-style
        // http://lbs.amap.com/api/javascript-api/guide/create-map/mapstye/
        window.AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
        ()=>{
          const scale = new window.AMap.Scale({
                visible: true
            });
          const  toolBar = new window.AMap.ToolBar({
                visible: true
            });
          const  overView = new window.AMap.OverView({
                visible: true
            });
            window.amapmain.addControl(scale);
            window.amapmain.addControl(toolBar);
            window.amapmain.addControl(overView);
            resolve(window.amapmain);
        });

      }
      else{
        if(!!window.amapmain){
          resolve(window.amapmain);
          return;
        }
        reject(`地图参数${mapcenterlocation.lng},${mapcenterlocation.lat},amap:${!!window.amapmain}`);
      }
  });
}

//监听地图事件
const listenmapevent = (eventname)=>{
  return new Promise(resolve => {
      if(!window.amapmain){
        resolve();
        return;
      }

      window.amapmain.on(eventname, (e)=> {
          resolve(eventname);
      });

  });
}

//地图主流程
export function* createmapmainflow(){
    if(config.softmode === 'fullpc'){
      yield takeLatest(`${querydevicealarm_result}`, function*(action) {
        yield put(querymapstat_request({}));
      });

      yield takeLatest(`${querymapstat_result}`, function*(action) {
        const {payload} = action;
        setdata(payload);
        if(!!distCluster){
          distCluster.setData(null);
        }
      });
    }
    //创建地图
    yield takeEvery(`${carmapshow_createmap}`, function*(action_createmap) {
      try{
        let {payload:{divmapid}} = action_createmap;
        if(divmapid === divmapid_mapmain){
          //wait js script loaded
          // while(!window.AMap){
          //   //console.log(`wait here...${!!window.AMap},ui:${!!window.AMapUI}`);
          //   yield call(delay,500);
          // }
          //console.log(`js script init`);
          //take
          let mapcarprops = yield select((state) => {
            const {carmap} = state;
            return {...carmap};
          });
          if(!mapcarprops.isMapInited){//仅在第一次加载页面初始化时进入
            //等待地图初始化
            //console.log(`wait for mapcarprops.isMapInited`);
            yield take(`${map_setmapinited}`);
          }

          //console.log(`start create map`);
          let {mapcenterlocation,zoomlevel} = mapcarprops;
          if(mapcenterlocation.equals(loczero)){//仅在第一次加载页面初始化时进入
            const centerpos = yield call(getcurrentpos);
            mapcenterlocation = L.latLng(centerpos.lat, centerpos.lng);
          }
          yield call(CreateMap,{mapcenterlocation,zoomlevel});//创建地图

          // yield call(CreateMapUI_PointSimplifier,window.amapmain);
          // yield call(CreateMapUI_MarkCluster,window.amapmain);
          yield call(CreateMapUI_DistrictCluster,window.amapmain);

          let task_dragend =  yield fork(function*(eventname){
            while(true){
              yield call(listenmapevent,eventname);
              let centerlocation = window.amapmain.getCenter();
              let centerlatlng = L.latLng(centerlocation.lat, centerlocation.lng);
              yield put(mapmain_setmapcenter(centerlatlng));
            }
          },'dragend');



          yield cancel(task_dragend);
        }
      }
      catch(e){
        console.log(e);
      }

    });


    //销毁地图
    yield takeEvery(`${carmapshow_destorymap}`, function*(action_destorymap) {
      let {payload:{divmapid}} = action_destorymap;
      const destorymap = (divmapid)=>{
        return new Promise((resolve) => {
          if(divmapid === divmapid_mapmain){
            window.amapmain = null;
            infoWindow=null;
            distCluster=null;
          }
          resolve();
        });
      }
      yield call(destorymap,divmapid);

    });


}
