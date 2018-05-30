import { select,put,call,take,takeEvery,takeLatest,cancel,fork,join, } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  common_err,
  searchbatterylocal_request,
  // searchbatterylocal_result,
  // md_mapmain_setzoomlevel,
  // mapmain_setzoomlevel,
  mapmain_setmapcenter,
  map_setmapinited,
  carmapshow_createmap,
  carmapshow_destorymap,
  // mapmain_setenableddrawmapflag,
  querydevice_result,
  ui_selcurdevice_request,
  ui_selcurdevice_result,
  md_querydeviceinfo_result,
  querydeviceinfo_request,
  querydeviceinfo_result,
  querydeviceinfo_list_request,
  querydeviceinfo_list_result,
  // ui_showmenu,
  ui_showdistcluster,
  ui_showhugepoints,
  // ui_showdistcluster_result,
  // ui_showhugepoints_result,
  mapmain_seldistrict,
  // mapmain_seldistrict_init,
  mapmain_getdistrictresult,
  mapmain_init_device,
  ui_settreefilter,
  md_ui_settreefilter,
  serverpush_device,
  devicelistgeochange_distcluster,
  // devicelistgeochange_pointsimplifierins,
  devicelistgeochange_geotreemenu,
  devicelistgeochange_geotreemenu_refreshtree,
  // mapmain_areamountdevices_request,
  mapmain_areamountdevices_result,

  searchbattery_result,
  ui_searchbattery_result,
  // ui_mycar_showtype,
  ui_alarm_selcurdevice,
  ui_mycar_selcurdevice,
  ui_index_selstatus,
  ui_selworkorder,
  ui_sel_tabindex,

  ui_changemodeview,

  mapmain_showpopinfo,
  mapmain_showpopinfo_list,
  getsystemconfig_result,
  getsystemconfig_result_result,
  ui_viewdevicedetail
} from '../actions';
// import async from 'async';
import {getgeodatabatch,getgeodata} from './mapmain_getgeodata';
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
// import moment from 'moment';
import coordtransform from 'coordtransform';
import {getadcodeinfo} from '../util/addressutil';
import {getpopinfowindowstyle,getlistpopinfowindowstyle,getimageicon} from './getmapstyle';
// import jsondataareas from '../util/areas.json';
// import jsondataprovinces from '../util/provinces.json';
// import jsondatacities from '../util/cities.json';
import config from '../config.js';
import store from '../env/store';
import {getdevicelist,getdeviceinfo} from './datapiple';
import {getdevicestatus_isonline} from '../util/getdeviceitemstatus';

const divmapid_mapmain = 'mapmain';
const maxzoom = config.softmode === 'pc'?18:19;
let infoWindow;
const loczero = L.latLng(0,0);
let distCluster,markCluster;
// let groupStyleMap = {};

//=====数据部分=====
let g_devicesdb = {};
let g_devicesdb_detailcached = {};
let cur_adcode_cache;
let cur_DeviceId_cache;

let gmap_acode_treecount = {};
let gmap_acode_devices = {};

const zoollevel_showhugepoints = 13;
const zoollevel_showdistcluster = 12;

let g_SettingOfflineMinutes = 20;
//新建聚合点
const CreateMapUI_MarkCluster = (map)=>{
  return new Promise((resolve,reject) => {
      if(!window.AMapUI){
        alert('未加载到AMapUI！');
        reject();
        return;
      }

      if(!!markCluster){
        markCluster.clearMarkers();
        markCluster.setMap(null);
        markCluster = null;
      }

      markCluster = new window.AMap.MarkerClusterer(map, [],{
        maxZoom:maxzoom,
        gridSize:80,
      });
      markCluster.on('click',({cluster,lnglat,target,markers})=>{
        let itemdevicelist = [];
        lodashmap(markers,(mark)=>{
          itemdevicelist.push(g_devicesdb[mark.getExtData()]);
        });
        const curzoom = markCluster.getMap().getZoom();
        // 在PC上，默认为[3,18]，取值范围[3-18]；
        // 在移动设备上，默认为[3,19],取值范围[3-19]
        if(curzoom === maxzoom ){
            store.dispatch(mapmain_showpopinfo_list({itemdevicelist,lnglat}));
          //弹框
        }
        //console.log(`click device list:${JSON.stringify(itemdevicelist)},curzoom:${curzoom}`);
      });

      resolve();
  });
}

const getMarkCluster_recreateMarks = (SettingOfflineMinutes)=>{
  if(!!markCluster.getMap()){
    //如果有地图对象,才能重新新建
    if(markCluster.getMarkers().length > 0){
      markCluster.clearMarkers();
    }
    getMarkCluster_createMarks(SettingOfflineMinutes);
  }
}

const getMarkCluster_createMarks = (SettingOfflineMinutes)=>{
  if(!!markCluster.getMap()){
      //如果有地图对象,才能重新新建
      let markers = [];
      lodashmap(g_devicesdb,(item,key)=>{
        if(!!item){//AMap.LngLat(lng:Number,lat:Number)
          if(!!item.locz){
            const pos = new window.AMap.LngLat(item.locz[0],item.locz[1]);
            const marker = new window.AMap.Marker({
               position:pos,
               icon: new window.AMap.Icon({
                   size: new window.AMap.Size(34, 34),  //图标大小
                   image: getimageicon(item,SettingOfflineMinutes),
                   imageOffset: new window.AMap.Pixel(0, 0)
               }),
               angle:get(item,'angle',0),
              //  content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
               offset: new window.AMap.Pixel(0, 0),//-113, -140
               extData:key
            });
            marker.on('click',()=>{
              //console.log(`click marker ${key}`);
              window.AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
                  store.dispatch(ui_mycar_selcurdevice(item.DeviceId));
              });
            });
            markers.push(marker);
          }
        }
      });
      try{
        markCluster.addMarkers(markers);
      }
      catch(e){// Cannot read property 'p20ToLngLat' of null at c.addMarkers
        console.log(e.stack);
        console.log(e);
      }
    }
}

const getMarkCluster_updateMarks = (deviceupdated,SettingOfflineMinutes)=>{
    if(!!markCluster.getMap()){
        //如果有地图对象,才能重新新建
        const allmarks = markCluster.getMarkers();
        lodashmap(allmarks,(mark)=>{
          const deviceitem = g_devicesdb[mark.getExtData()];
          const deviceitemnew = deviceupdated[deviceitem.DeviceId];
          if(!!deviceitemnew){
            if(!!deviceitemnew.locz){
              const pos = new window.AMap.LngLat(deviceitemnew.locz[0],deviceitemnew.locz[1]);
              const newIcon = new window.AMap.Icon({
                  size: new window.AMap.Size(34, 34),  //图标大小
                  image: getimageicon(deviceitemnew,SettingOfflineMinutes),
                  imageOffset: new window.AMap.Pixel(0, 0)
              });
              mark.setIcon(newIcon);
              mark.setPosition(pos);
              console.log(`mark${deviceitem.DeviceId}-->setPosition-->${JSON.stringify(deviceitemnew.locz)}`)
            }
            else{
              markCluster.removeMarker(mark);
            }
          }
        });
    }
}

const getMarkCluster_showMarks = ({isshow,SettingOfflineMinutes})=>{
  return new Promise((resolve,reject) => {
    if(!markCluster){
      resolve();
      return;
    }
    if(isshow){
      markCluster.setMap(window.amapmain);
      if(!markCluster.getMap()){
        getMarkCluster_recreateMarks(SettingOfflineMinutes);
      }
    }
    else{
      markCluster.setMap(null);
    }
    resolve();
  });
}

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
                 let container, title, body;
                 const nodeClassNames = {
              				title: 'amap-ui-district-cluster-marker-title',
              				body: 'amap-ui-district-cluster-marker-body',
              				container: 'amap-ui-district-cluster-marker'
              			};
              			if (recycledMarker) {
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
                      body.innerHTML = dataItems.length;
                    }

              			const resultMarker = recycledMarker || new window.AMap.Marker({
              				topWhenClick: true,
              				offset: new window.AMap.Pixel(-20, -30),
              				content: container
              			});
              			return resultMarker;
               }
               catch(e){

               }
          	   return null;
        		}
            //重写行政区域,避免来回刷新时的闪烁
            //  utils.extend(DistrictCluster.prototype,
            //    {//重新设置数据时不刷新Marker
            //        setDataWithoutClear: function(data) {
            //           //
            //           data || (data = []);
            //           this.trigger("willBuildData", data);
            //           this._data.source = data;
            //           //  this._data.bounds = BoundsItem.getBoundsItemToExpand();
            //           this._buildDataItems(data);
            //           this._buildKDTree();
            //           this._distCounter.setData(this._data.list);
            //           this.trigger("didBuildData", data);
            //           this.renderLater(10);
            //           data.length && this._opts.autoSetFitView && this.setFitView();
            //         },
            //   });
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
                        fillStyle: 'rgba(169, 217, 85, 0.8)'
                      },
                      province: {
                        fillStyle: 'rgba(116, 196, 118, 0.7)'
                      },
                      city: {
                        fillStyle: 'rgba(161, 217, 155, 0.6)'
                      },
                      district: {
                        fillStyle: 'rgba(199, 233, 192, 0.5)'
                      }
                  },
                   featureClickToShowSub:true,
                   clusterMarkerRecycleLimit:100000,
                   clusterMarkerKeepConsistent:true,
                   getClusterMarker : (feature, dataItems, recycledMarker)=> {
                      if(dataItems.length > 0){
                        return defaultgetClusterMarker(feature, dataItems, recycledMarker);
                      }
                      return null;
                    }
                 }
             });
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
            lang:"zh-cn",
            dragEnable:true,
            zoomEnable:true,
            touchZoom:true,
            // mapStyle: 'amap://styles/macaron'//样式URL
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

//监听标记事件
// const listenmarkclickevent = (eventname)=>{
//   return new Promise(resolve => {
//     pointSimplifierIns.on(eventname, (e,record)=> {
//         resolve(record);
//     });
//   });
// }

//监听弹框事件
const listenwindowinfoevent = (eventname)=>{
  return new Promise(resolve => {
    if(!infoWindow){
      resolve();
      return;
    }
    infoWindow.on(eventname, (e)=> {
        resolve(eventname);
    });

  });
}

//监听行政事件,clusterMarkerClick
const listenclusterevent = (eventname)=>{
  return new Promise(resolve => {
    if(!distCluster){
      resolve();
      return;
    }
    distCluster.on(eventname, (e,record)=> {
        distCluster.getClusterRecord(record.adcode,(err,result)=>{
          if(!err){
            const {dataItems} = result;
            if(!!dataItems){
              if(dataItems.length > 0){
                  resolve({adcodetop:record.adcode,forcetoggled:true,src:'map'});
                  return;
              }
            }
          }
          resolve();
        });
    });
  });
}

//获取reduce


//显示弹框
const showinfowindow = (deviceitem)=>{
  return new Promise((resolve,reject) =>{
      if(!window.AMapUI){
        alert('未加载到AMapUI！');
        reject();
        return;
      }
      cur_DeviceId_cache = deviceitem.DeviceId;
      let locz = deviceitem.locz;
      infoWindow = new window.AMap.InfoWindow(getpopinfowindowstyle(deviceitem));
      if(!!locz){
        window.amapmain.setCenter(locz);
        infoWindow.open(window.amapmain, locz);
      }
      else{
        infoWindow.open(window.amapmain, window.amapmain.getCenter());
      }
      resolve(infoWindow);
  });
}

const showinfowindow_cluster = ({itemdevicelist,lnglat,SettingOfflineMinutes})=>{
  return new Promise((resolve,reject) =>{
      if(!window.AMapUI){
        alert('未加载到AMapUI！');
        reject();
        return;
      }
      infoWindow = new window.AMap.InfoWindow(getlistpopinfowindowstyle(itemdevicelist,SettingOfflineMinutes));
      window.amapmain.setCenter(lnglat);
      infoWindow.open(window.amapmain, lnglat);
      resolve(infoWindow);
  });
}


//获取根结点的数据
const getclustertree_root =(SettingOfflineMinutes)=>{
  const adcodetop=100000;
  return new Promise((resolve,reject) => {
    if(!distCluster){
      console.log(`distCluster is empty`);
      reject(`distCluster is empty`);
      return;
    }
    distCluster.getClusterRecord(adcodetop,(err,result)=>{
      if(!err){
        const {children,dataItems} = result;
        if(!children || children.length === 0){
          // reject(`children or children.length is empty,${adcodetop}`);
          resolve([]);
          return;
        }
        if(!dataItems || dataItems.length === 0){
          // reject(`dataItems or dataItems.length is empty,${adcodetop}`);
          resolve([]);
          return;
        }
        let count_online = 0;
        let count_offline = dataItems.length;
        lodashmap(dataItems,(deviceitem)=>{
          if(getdevicestatus_isonline(deviceitem.dataItem,SettingOfflineMinutes)){
            count_online++;
          }
        });
        gmap_acode_treecount[adcodetop]= {
          count_total:dataItems.length,
          count_online,
          count_offline
        };//全国

        let childadcodelist = [];
        lodashmap(children,(child)=>{
          if(child.dataItems.length > 0){
            childadcodelist.push(child.adcode);
            count_online = 0;
            count_offline = child.dataItems.length;
            lodashmap(child.dataItems,(deviceitem)=>{
              if(getdevicestatus_isonline(deviceitem.dataItem,SettingOfflineMinutes)){
                count_online++;
              }
            });
            gmap_acode_treecount[child.adcode]= {
              count_total:child.dataItems.length,
              count_online,
              count_offline
            }
          }
          else{
            gmap_acode_treecount[child.adcode]= {
              count_total:0,
              count_online:0,
              count_offline:0,
            };
          }
        });
        resolve(childadcodelist);
      }
      else{
        reject(err);
      }
    });
  });
}
//获取某个行政区域的数据
const getclustertree_one =(adcode,SettingOfflineMinutes)=>{
  return new Promise((resolve,reject) => {
    if(!distCluster){
      reject();
      return;
    }
    distCluster.getClusterRecord(adcode,(err,result)=>{
      if(!err){
        const {adcode,dataItems,children} = result;
        let count_online = 0;
        if(!children || children.length === 0){
          //device,如果adcode底下全部是设备了【放到最大区域层级了】
          let deviceids = [];
          if(!!dataItems){
            lodashmap(dataItems,(deviceitem)=>{
              if(getdevicestatus_isonline(deviceitem.dataItem,SettingOfflineMinutes)){
                count_online++;
              }
              if(!!deviceitem.dataItem){
                deviceids.push(deviceitem.dataItem.DeviceId);
              }
            });
          }

          gmap_acode_treecount[adcode]={
            count_total:deviceids.length,
            count_online:count_online,
            count_offline:deviceids.length,
          };
          gmap_acode_devices[adcode]=deviceids;
          let center;
          if(deviceids.length > 0){
            const pickone = deviceids[0];
            const deviceitem = g_devicesdb[pickone];
            if(!!deviceitem){
              if(!!deviceitem.locz){
                center = new window.AMap.LngLat(deviceitem.locz[0],deviceitem.locz[1]);
              }
              else{
                console.log(deviceitem);
              }
            }
          }

          resolve({
            type:'device',
            deviceids,
            center
          });
        }
        else{
          //group
          let center;
          let childadcodelist = [];
          if(!dataItems || dataItems.length === 0){
            gmap_acode_treecount[adcode]={
              count_total:0,
              count_online:0,
              count_offline:0,
            };
            resolve({
              type:'group',
              childadcodelist
            });
            return;
          }
          //当前adcode的设备列表
          let deviceids = [];
          lodashmap(dataItems,(di)=>{
            const deviceitem = di.dataItem;
            deviceids.push(deviceitem.DeviceId);
            if(getdevicestatus_isonline(deviceitem,SettingOfflineMinutes)){
              count_online++;
            }

            if(!!deviceitem && !center){
              if(!!deviceitem.locz){
                center = new window.AMap.LngLat(deviceitem.locz[0],deviceitem.locz[1]);
              }
              else{
                console.log(deviceitem);
              }
            }
          });
          gmap_acode_treecount[adcode]={
            count_total:dataItems.length,
            count_online:count_online,
            count_offline:dataItems.length,
          };

          if(adcode === 810000 || adcode === 820000){
            //香港、澳门特殊处理
            gmap_acode_devices[adcode]=deviceids;
            resolve({
              type:'device',
              deviceids,
              center
            });
            return;
          }
          //adcode的子区域
          lodashmap(children,(child)=>{
              if(child.dataItems.length > 0){
                let count_online = 0;
                lodashmap(child.dataItems,(deviceitem)=>{
                  if(getdevicestatus_isonline(deviceitem.dataItem,SettingOfflineMinutes)){
                    count_online++;
                  }
                });
                gmap_acode_treecount[child.adcode]={
                  count_total:child.dataItems.length,
                  count_online:count_online,
                  count_offline:child.dataItems.length,
                }
                childadcodelist.push(child.adcode);
              }
              else{
                gmap_acode_treecount[child.adcode]={
                  count_total:0,
                  count_online:0,
                  count_offline:0,
                };
              }

          });
          resolve({
            type:'group',
            childadcodelist,
            center
          });
        }
      }
      else{
        reject(err);
      }
    });
  });
}

//地图主流程
export function* createmapmainflow(){
    yield takeLatest(`${getsystemconfig_result}`, function*(action) {
      const {payload} = action;
      g_SettingOfflineMinutes = get(payload,'SettingOfflineMinutes',20);
      console.log(`g_SettingOfflineMinutes-->${g_SettingOfflineMinutes}`)
      yield put(getsystemconfig_result_result(payload));
    });
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
          yield call(CreateMapUI_MarkCluster,window.amapmain);
          yield call(CreateMapUI_DistrictCluster,window.amapmain);

          let listentask =  yield fork(function*(eventname){
            while(true){
              let result = yield call(listenclusterevent,eventname);
              if(!!result){
                yield put(mapmain_seldistrict(result));
              }
              // yield put(clusterMarkerClick(result));
            }
          },'clusterMarkerClick');

          let task_dragend =  yield fork(function*(eventname){
            while(true){
              yield call(listenmapevent,eventname);
              let centerlocation = window.amapmain.getCenter();
              let centerlatlng = L.latLng(centerlocation.lat, centerlocation.lng);
              yield put(mapmain_setmapcenter(centerlatlng));
            }
          },'dragend');

          let task_zoomend =  yield fork(function*(eventname){
            while(true){
              yield call(listenmapevent,eventname);
              // let centerlocation = window.amapmain.getCenter();
              // let centerlatlng = L.latLng(centerlocation.lat, centerlocation.lng);
              // yield put(md_mapmain_setzoomlevel(window.amapmain.getZoom()));
              const zoomlevel = window.amapmain.getZoom();
              console.log(zoomlevel)
              yield put(ui_showhugepoints(zoomlevel>=zoollevel_showhugepoints));
              yield put(ui_showdistcluster(zoomlevel<=zoollevel_showdistcluster));


            }
          },'zoomend');

          // let task_markclick = yield fork(function*(eventname){
          //   while(true){
          //       const dataitem = yield call(listenmarkclickevent,eventname);
          //       if(!!dataitem){
          //         let deviceitem = dataitem.data;
          //
          //         if(!!deviceitem){
          //           yield put(ui_selcurdevice_request({DeviceId:deviceitem.DeviceId,deviceitem}));
          //         }
          //       }
          //     //
          //   }
          // },'pointClick');//'pointClick pointMouseover pointMouseout'

          let task_mapclick = yield fork(function*(eventname){
            while(true){
              yield call(listenmapevent,eventname);
              //console.log(`click map!!!${!!infoWindow}`);
              if(!!infoWindow){
                infoWindow.close();
                infoWindow = null;
                // cur_DeviceId_cache = null;
              }
            }
          },'click');//'click'

          //如果已经登录,并且有数据了！，重新加载数据
          let deivcelist = [];
          lodashmap(g_devicesdb,(v)=>{
            deivcelist.push(v);
          });
          if(deivcelist.length > 0){
            yield put(querydevice_result({list:deivcelist}));
          }
          //监听事件
          //  pointSimplifierIns.on('pointClick pointMouseover pointMouseout', function(e, record) {
          //listentask task_dragend task_zoomend task_markclick task_mapclick
          //  })
          while(true){
            let {payload:{divmapid}} = yield take(`${carmapshow_destorymap}`);
            if(divmapid === divmapid_mapmain){
              break;
            }
          }
          yield cancel(listentask);
          yield cancel(task_dragend);
          yield cancel(task_zoomend);
          // yield cancel(task_markclick);
          yield cancel(task_mapclick);
        }
      }
      catch(e){
        console.log(e);
      }

    });

    yield takeLatest(`${ui_changemodeview}`, function*(action) {
      const changemodeviewfn = ()=>{
        return new Promise((resolve) => {
          if(!!infoWindow){
            infoWindow.close();
          }
          resolve();
        });
      }
      yield call(changemodeviewfn);

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

    //选择一个车辆请求
    yield takeLatest(`${ui_selcurdevice_request}`,function*(actioncurdevice){
      let {payload:{DeviceId,deviceitem,src}} = actioncurdevice;
      let result;
      let adcodetop;
      try{
          if(!deviceitem && !!DeviceId){
            deviceitem = g_devicesdb[DeviceId];
          }
          if(!!deviceitem && cur_DeviceId_cache!== DeviceId){//？？？？
            if(!deviceitem.locz){
              deviceitem = yield call(getdeviceinfo,deviceitem,true);
            }
            //console.log(`ui_selcurdevice_request==>${JSON.stringify(deviceitem)}`);
            //获取该车辆所在经纬度
            if(!!deviceitem.locz){
              result = yield call(getgeodata,deviceitem);
              //调用一次citycode，防止加载不到AreaNode
              if(!!get(result,'adcode') && cur_adcode_cache !== get(result,'adcode')){
                cur_adcode_cache = get(result,'adcode');
                try{
                  const SettingOfflineMinutes = g_SettingOfflineMinutes;
                  let adcodeinfo = getadcodeinfo(result.adcode);
                  yield call(getclustertree_one,adcodeinfo.parent_code,SettingOfflineMinutes);
                }
                catch(e){
                  console.log(e);
                }
                adcodetop = parseInt(result.adcode,10);
                //展开左侧树结构
                yield put(mapmain_seldistrict({adcodetop,forcetoggled:true,src}));
                if(config.softmode === 'pc'){//pc端才有树啊
                  yield take(`${mapmain_getdistrictresult}`);//等待数据完成
                }
              }
            }
          }
      }
      catch(e){
        console.log(e);
      }
      yield put(ui_selcurdevice_result(actioncurdevice.payload));
    });

    //选择一个车辆
    yield takeLatest(`${ui_selcurdevice_result}`,function*(actioncurdevice){
      try{
          const {payload:{DeviceId}} = actioncurdevice;
          yield put(mapmain_showpopinfo({DeviceId}));
        }
        catch(e){
          console.log(e);
        }
    });

    yield takeLatest(`${md_querydeviceinfo_result}`, function*(action) {
      let {payload:deviceinfo} = action;
      //console.log(`deviceinfo==>${JSON.stringify(deviceinfo)}`);
      try{
          if(!!deviceinfo){
            let isget = true;
            const last_Latitude = deviceinfo.last_Latitude;
            const last_Longitude = deviceinfo.last_Longitude;
            if (!last_Longitude) {
                isget = false;
            }
            else{
              if(last_Latitude === 0 || last_Longitude === 0){
                isget = false;
              }
            }
            if(isget){
              let cor = [last_Longitude,last_Latitude];
              const wgs84togcj02=coordtransform.wgs84togcj02(cor[0],cor[1]);
              deviceinfo.locz = wgs84togcj02;
            }

            if(!!deviceinfo.locz){
              const addr = yield call(getgeodata,deviceinfo);
              deviceinfo = {...deviceinfo,...addr};
            }

            const {deviceextid,...rest} = deviceinfo;
            if(!!deviceextid){
              deviceinfo = {...rest,...deviceextid};
            }
          }
           g_devicesdb[deviceinfo.DeviceId] = deviceinfo;
           g_devicesdb_detailcached[deviceinfo.DeviceId] = deviceinfo;
           yield put(querydeviceinfo_result(deviceinfo));
         }
         catch(e){
           console.log(e);
         }

    });

    //单个设备弹框
    yield takeLatest(`${mapmain_showpopinfo}`, function*(actiondevice) {
      //显示弹框
      try{
        const {payload:{DeviceId}} = actiondevice;
        //获取该车辆信息
        yield put(querydeviceinfo_request({query:{DeviceId}}));
        if(!g_devicesdb_detailcached[DeviceId]){
          yield take(`${querydeviceinfo_result}`);
        }

        let list = [];
        list.push(g_devicesdb_detailcached[DeviceId]);
        const listitem = yield call(getdevicelist,list);
        if(listitem.length === 1){
          //1
          // g_devicesdb[listitem[0].DeviceId] = listitem[0];
          //地图缩放到最大
          if(window.amapmain.getZoom() !== maxzoom){
            //不是最大时候才放大，否则会陷入一个循环两次的问题
            console.log(`地图当前层级${window.amapmain.getZoom()},最大:${maxzoom}`);
            window.amapmain.setZoom(maxzoom);
            yield delay(0);
          }

          console.log(`call弹框`);
          //弹框
          yield call(showinfowindow,listitem[0]);

          //更新弹框图标
          const SettingOfflineMinutes = g_SettingOfflineMinutes;
          let devicesdb_updated = {};
          devicesdb_updated[DeviceId] = g_devicesdb[DeviceId];
          getMarkCluster_updateMarks(devicesdb_updated,SettingOfflineMinutes);

          yield fork(function*(eventname){
           //while(true){//关闭时触发的事件
            yield call(listenwindowinfoevent,eventname);//触发一次
            if(!!infoWindow){
                infoWindow.close();
                infoWindow = null;
            }

          },'close');
        }

      }
      catch(e){
        console.log(e);
      }
    });
    //多个设备弹出框
    yield takeLatest(`${mapmain_showpopinfo_list}`, function*(actiondevice) {
      //显示弹框
      try{
        const {payload:{itemdevicelist,lnglat}} = actiondevice;
        //获取该车辆信息
        let deviceids = [];
        lodashmap(itemdevicelist,(item)=>{
          deviceids.push(item.DeviceId);
        });
        yield put(querydeviceinfo_list_request({query:{DeviceId:{'$in':deviceids}}}));
        const {payload:{list}} = yield take(`${querydeviceinfo_list_result}`);
        //
        const listitem = yield call(getdevicelist,list);
        //
        // lodashmap(listitem,(item)=>{
        //   g_devicesdb[item.DeviceId] = item;
        // });

        //地图缩放到最大
        //yield put(md_mapmain_setzoomlevel(maxzoom));
        const SettingOfflineMinutes = g_SettingOfflineMinutes;

        //弹框
        yield call(showinfowindow_cluster,{itemdevicelist:listitem,lnglat,SettingOfflineMinutes});

        yield fork(function*(eventname){
         //while(true){//关闭时触发的事件
           yield call(listenwindowinfoevent,eventname);//触发一次
          //  yield put(ui_showmenu("showdevice_no"));
           if(!!infoWindow){
              infoWindow.close();
              infoWindow = null;
           }
         //}
        },'close');

      }
      catch(e){
        console.log(e);
      }
    });

    //查询所有车辆返回
    yield takeLatest(`${querydevice_result}`, function*(deviceresult) {
      let {payload:{list:devicelist}} = deviceresult;
      try{
          while( !distCluster || !markCluster){
            console.log(`wait for discluster ${!!distCluster} or markCluster ${!!markCluster}`);
            yield call(delay,1000);
          }
          const SettingOfflineMinutes = g_SettingOfflineMinutes;
          //批量转换一次
          g_devicesdb = {};//清空，重新初始化
          // console.log(`clear g_devicesdb...restart g_devicesdb...`)
          let devicelistresult = yield call(getgeodatabatch,devicelist);

          const data = [];
          const datanolocate = [];
          const deviceidonlines_loc = [];
          const deviceidonlines_locno = [];
          lodashmap(devicelistresult,(deviceitem)=>{
            if(!!deviceitem.DeviceId){
              if(!!deviceitem.locz){
                data.push(deviceitem);
                if(getdevicestatus_isonline(deviceitem,SettingOfflineMinutes)){
                  deviceidonlines_loc.push(deviceitem.DeviceId);
                }
              }
              else{
                if(getdevicestatus_isonline(deviceitem,SettingOfflineMinutes)){
                  deviceidonlines_locno.push(deviceitem.DeviceId);
                }
                datanolocate.push(deviceitem.DeviceId);
              }
              g_devicesdb[deviceitem.DeviceId] = deviceitem;
            }
          });
          // console.log(`clear g_devicesdb...restart g_devicesdb...${data.length}`)
          distCluster.setData(data);
          // pointSimplifierIns.setData(data);

          //初始化清空
          gmap_acode_devices={};
          gmap_acode_treecount={};



          yield call(getclustertree_root,SettingOfflineMinutes);
          gmap_acode_treecount[1] = {//所有
            count_total:devicelistresult.length,
            count_online:deviceidonlines_loc.length,
          };

          gmap_acode_devices[2] = datanolocate;
          gmap_acode_treecount[2] = {
            count_total:datanolocate.length,
            count_online:deviceidonlines_locno.length,
          }

          yield put(mapmain_init_device({g_devicesdb,gmap_acode_devices,gmap_acode_treecount}));

          getMarkCluster_recreateMarks(SettingOfflineMinutes);
          const zoomlevel = window.amapmain.getZoom();
          console.log(zoomlevel)
          yield put(ui_showhugepoints(zoomlevel>=zoollevel_showhugepoints));
          yield put(ui_showdistcluster(zoomlevel<=zoollevel_showdistcluster));

        }
        catch(e){
          console.log(e.stack);
          console.log(e);
        }

    });


    yield takeLatest(`${ui_showdistcluster}`, function*(action_showflag) {
        let {payload:isshow} = action_showflag;
        const showdistclusterfn = (isshow)=>{
          return new Promise((resolve) => {
            try{
              if(!!distCluster){
                  const ishidden =  distCluster.isHidden();
                  console.log(ishidden);
                  if(isshow){
                    if(isshow === ishidden){
                      distCluster.show();
                      distCluster.render();
                    }
                  }
                  else{
                    distCluster.hide();
                  }
                }
            }
            catch(e){
              console.log(e);
            }
            resolve();
          });
        }
        // const showdistcluster = yield select((state)=>{
        //   return get(state,'app.showdistcluster');
        // });
        console.log(`ui_showdistcluster isshow-->${isshow}`);
        // if(showdistcluster !== isshow){
          yield call(showdistclusterfn,isshow);
        // }

        // yield put(ui_showdistcluster_result(isshow));
    });
    //显示海量点
    yield takeLatest(`${ui_showhugepoints}`, function*(action_showflag) {
        let {payload:isshow} = action_showflag;
        try{
          // const showhugepoints = yield select((state)=>{
          //   return get(state,'app.showhugepoints');
          // });
          console.log(`ui_showhugepoints,isshow-->${isshow}`);
          // if(showhugepoints !== isshow){
          const SettingOfflineMinutes = g_SettingOfflineMinutes;

            console.log(`getMarkCluster_showMarks-->${SettingOfflineMinutes}`);
            yield call(getMarkCluster_showMarks,{isshow,SettingOfflineMinutes});
          // }
        }
        catch(e){
          console.log(e);
          console.log(e.stack);
        }
        console.log(`ui_showhugepoints_result-->${isshow}`);
        // yield put(ui_showhugepoints_result(isshow));
    });

    //选中某个区域
    yield takeLatest(`${mapmain_seldistrict}`, function*(action_district) {
        let {payload:{adcodetop,forcetoggled,src}} = action_district;
        let isarea = false;
        try{
          const SettingOfflineMinutes = g_SettingOfflineMinutes;
          if(!!adcodetop && adcodetop !==1 && adcodetop!==2){
            //========================================================================================
            //获取该区域的数据
            const result = yield call(getclustertree_one,adcodetop,SettingOfflineMinutes);
            if(!!result){
              isarea = result.type === 'device';
              if(config.softmode === 'pc'){//仅pc端才需要刷新树
                yield fork(function*(){
                    yield delay(0);
                    if(isarea){
                      //如果返回车辆,则将车辆加载到树中
                      yield put(mapmain_areamountdevices_result({adcode:adcodetop,gmap_acode_devices,g_devicesdb,gmap_acode_treecount,SettingOfflineMinutes}));
                    }
                    else{
                      //刷新树中的数据
                      yield put(devicelistgeochange_geotreemenu_refreshtree({g_devicesdb,gmap_acode_devices,gmap_acode_treecount,SettingOfflineMinutes}));
                    }
                });
              }
            }

            if(!!distCluster){//放大到该区域
              if(isarea){
                if(!!result.center){
                  const zoomlevel = window.amapmain.getZoom();
                  const targetzoom = zoomlevel > 13?zoomlevel:13;
                  window.amapmain.setZoomAndCenter(targetzoom,result.center);//fixed window.amapmain.getZoom()+1
                }
              }
              else{
                //获得该区域下最多结点的数量，找出中心点
                distCluster.zoomToShowSubFeatures(adcodetop,result.center);
              }
            }
          }
          else if(adcodetop===2){
            // 未定位车辆特殊处理
            const data = [];
            const deviceidonlines = [];
            lodashmap(g_devicesdb,(deviceitem)=>{
              if(!deviceitem.locz){
                data.push(deviceitem);
                if(getdevicestatus_isonline(deviceitem,SettingOfflineMinutes)){
                  deviceidonlines.push(deviceitem.DeviceId);
                }
              }
            });
            gmap_acode_devices[2] = data;
            gmap_acode_treecount[2] = {
              count_total:data.length,
              count_online:deviceidonlines.length,
            }
            yield put(mapmain_areamountdevices_result({adcode:adcodetop,gmap_acode_devices,g_devicesdb,gmap_acode_treecount,SettingOfflineMinutes}));
          }
        }
        catch(e){
          console.log(e);
        }


        if(config.softmode === 'pc'){//pc端才有树啊
           console.log(`mapmain_seldistrict from ---->src:${src}`);
           yield fork(function*(){
            //在树中将其他结点搜索，该节点展开
              yield delay(0);
              yield put(mapmain_getdistrictresult({adcode:adcodetop,forcetoggled}));
            });
        }

    });

    //查询某车辆条件（待查）
    yield takeLatest(`${md_ui_settreefilter}`,function*(action){
      //https://redux-saga.js.org/docs/recipes/
      try{
        const {payload} = action;
        let delaytime = 0;
        let treefilter = payload;
        if(!!treefilter){
            delaytime = 500;
        }
        yield call(delay, delaytime);
        yield put(ui_settreefilter(payload));
      }
      catch(e){
        console.log(e);
      }
    });
    //serverpush_devicegeo
    //某个车辆地理位置发送变化
    yield takeLatest(`${serverpush_device}`,function*(action){
      //https://redux-saga.js.org/docs/recipes/
      const {payload} = action;
      let deviceinfolist = payload;
      let g_devicesdb_updated = {};
      try{
        let oldpopitem;
        if(!!infoWindow){//正在弹窗
          //判断当前车辆是否发生偏移
          const {mapseldeviceid} = yield select((state)=>{
            return {mapseldeviceid:state.device.mapseldeviceid};
          });
          oldpopitem = lodashclone(g_devicesdb[mapseldeviceid]);
        }
        let deviceids_frereshdetails = [];
        lodashmap(deviceinfolist,(deviceinfo)=>{
          if(!!deviceinfo){
            let isget = true;
            const last_Latitude = deviceinfo.last_Latitude;
            const last_Longitude = deviceinfo.last_Longitude;
            if (!last_Longitude) {
                isget = false;
            }
            else{
              if(last_Latitude === 0 || last_Longitude === 0){
                isget = false;
              }
            }
            if(isget){
              let cor = [last_Longitude,last_Latitude];
              const wgs84togcj02=coordtransform.wgs84togcj02(cor[0],cor[1]);
              deviceinfo.locz = wgs84togcj02;
            }

            // if(!!deviceinfo.locz){
            //   const addr = yield call(getgeodata,deviceinfo);
            //   deviceinfo = {...deviceinfo,...addr};
            // }
          }
          const deviceinfoold = g_devicesdb[deviceinfo.DeviceId];
          if(!!deviceinfoold){
            if(!!oldpopitem){
              if(oldpopitem.DeviceId === deviceinfo.DeviceId){
                console.log(`oldpopitem==>${JSON.stringify(oldpopitem)}`);
                console.log(`deviceinfo==>${JSON.stringify(deviceinfo)}`);
              }
            }
            //<---------已经有详情了
            const {LastRealtimeAlarm:LastRealtimeAlarm1,locz:locz1,...rest1} = deviceinfoold;
            const {LastRealtimeAlarm:LastRealtimeAlarm2,locz:locz2,...rest2} = deviceinfo;
            // {
            //   'DeviceId':1,
            //   'last_Latitude':1,
            //   'last_Longitude':1,
            //   'last_GPSTime':1,
            //   'warninglevel':1,
            //   'LastRealtimeAlarm.DataTime':1,
            //   'alarmtxtstat':1
            // };
            const LastRealtimeAlarm = {...LastRealtimeAlarm1,...LastRealtimeAlarm2};
            const locz = locz2 || locz1;
            const rest = {...rest1,...rest2};
            const deviceinfonew = {
              LastRealtimeAlarm,
              locz,
              ...rest
            };

            g_devicesdb[deviceinfo.DeviceId] = deviceinfonew;
            deviceids_frereshdetails.push(deviceinfo.DeviceId);
          }
          else{
            g_devicesdb[deviceinfo.DeviceId] = deviceinfo;
          }
          g_devicesdb_updated[deviceinfo.DeviceId] = deviceinfo;
          // console.log(`serverpush-->${deviceinfo.DeviceId}-->${get(deviceinfo,'last_GPSTime','offline')}`)
        });
        console.log(`serverpush1-->devicelistgeochange_distcluster`);
        yield put(devicelistgeochange_distcluster({}));
        console.log(`serverpush2-->devicelistgeochange_distcluster`);

        // yield put(devicelistgeochange_pointsimplifierins({}));
        // yield put(devicelistgeochange_geotreemenu({}));
        const SettingOfflineMinutes = g_SettingOfflineMinutes;


        if(!!oldpopitem){//正在弹窗
          //判断当前车辆是否发生偏移
          if(!!g_devicesdb_updated[oldpopitem.DeviceId]){
            let deviceitem = g_devicesdb[oldpopitem.DeviceId];
            yield put(querydeviceinfo_request({query:{DeviceId:deviceitem.DeviceId}}));
            const {payload} = yield take(`${querydeviceinfo_result}`);
            deviceitem = {...deviceitem,...payload};
            g_devicesdb[deviceitem.DeviceId] = deviceitem;
            g_devicesdb_updated[deviceitem.DeviceId] = deviceitem;
            //<--这里要更新啊1！
            if(!deviceitem.locz){
              console.log(`怎么会没有定位信息呢....${JSON.stringify(deviceitem)}`)
            }
            else{
              infoWindow.setPosition(deviceitem.locz);
            }
            const {content} = getpopinfowindowstyle(deviceitem);
            infoWindow.setContent(content);
            //setPosition
            // yield put(ui_mycar_selcurdevice(mapseldeviceid));
            console.log(`${oldpopitem.DeviceId}信息发生变化,信息:${JSON.stringify(deviceitem)}`);
          }
        }

        getMarkCluster_updateMarks(g_devicesdb_updated,SettingOfflineMinutes);

        yield put(devicelistgeochange_geotreemenu_refreshtree({g_devicesdb,gmap_acode_devices,gmap_acode_treecount,SettingOfflineMinutes}));
        console.log(`刷新树结构`)
      }
      catch(e){
        console.log(e);
        console.log(g_devicesdb_updated);
      }
    });

    //devicelistgeochange
    // yield throttle(1300,`${devicelistgeochange_distcluster}`,function*(action){
    yield takeLatest(`${devicelistgeochange_distcluster}`,function*(action){
      const devicelistgeochange_distclusterfn = ()=>{
        return new Promise((resolve) => {
          try{
            if(!!distCluster){
              let data = [];
              lodashmap(g_devicesdb,(deviceitem)=>{
                if(!!deviceitem.locz){
                  data.push(deviceitem);
                }
              });
              distCluster.setData(data);//无闪烁刷新行政区域个数信息
            }
          }
          catch(e){
            console.log(e);
          }
          resolve();
        });
      };
      yield call(devicelistgeochange_distclusterfn);
    });

    // yield throttle(1700,`${devicelistgeochange_pointsimplifierins}`,function*(action){
    // yield takeLatest(`${devicelistgeochange_pointsimplifierins}`,function*(action){
    //   try{
    //     if(!!pointSimplifierIns){
    //       let data = [];
    //       lodashmap(g_devicesdb,(item)=>{
    //         data.push(item);
    //       });
    //       pointSimplifierIns.setData(data);//刷新海量点
    //     }
    //   }
    //   catch(e){
    //
    //   }
    // });

    //刷新行政区域树
    // yield throttle(1900,`${devicelistgeochange_geotreemenu}`,function*(action){
    yield takeLatest(`${devicelistgeochange_geotreemenu}`,function*(action){
      try{
        //获取当前树，当前选择展开的行政编码code，放数组中,循环设置
          //
          const SettingOfflineMinutes = g_SettingOfflineMinutes;
          yield call(getclustertree_root,SettingOfflineMinutes);
          yield put(devicelistgeochange_geotreemenu_refreshtree({g_devicesdb,gmap_acode_devices,gmap_acode_treecount,SettingOfflineMinutes}));
          //

          const getdevicestate = (state)=>{
            const {datatreeloc} = state.device;
            return {datatreeloc:datatreeloc.children[0]};
          }
          let codelist = [];
          let curareaid;
          const {datatreeloc} = yield select(getdevicestate);
          const findexpandnode = (node)=>{
            let retnode;
            if(node.toggled){
              if(node.type === 'group_provice' || node.type === 'group_city' || node.type === 'group_area'){
                if(node.type === 'group_area'){
                  curareaid = node.adcode;
                }
                codelist.push(node.adcode);
              }
              retnode = node;
            }
            if(!!node.children){
              for(let i = 0; i<node.children.length ;i++){
                const subnode = node.children[i];
                let tmpnode = findexpandnode(subnode);
                if(!!tmpnode){
                  break;
                }
              }
            }
            return retnode;
          }
          findexpandnode(datatreeloc);
          //
          //==============
          let forkhandles = [];
          for(let i=0;i<codelist.length ;i++){
            const handlefork = yield fork(function*(adcode){
              yield call(getclustertree_one,adcode,SettingOfflineMinutes);
            },codelist[i]);
            forkhandles.push(handlefork);
          };

          if(forkhandles.length > 0){
            yield join(...forkhandles);
          }

          //如果停留在区域,则重新装载车辆结点
          if(!!curareaid){
            yield put(mapmain_areamountdevices_result({adcode:curareaid,gmap_acode_devices,g_devicesdb,SettingOfflineMinutes}));
          }
          //刷新树中数据
          //《----未定位的数据个数也要刷
          yield put(devicelistgeochange_geotreemenu_refreshtree({g_devicesdb,gmap_acode_devices,gmap_acode_treecount,SettingOfflineMinutes}));

          //
      }
      catch(e){
        console.log(e);
      }
    });

    //devicelistgeochange_geotreemenu
    yield takeLatest(`${searchbattery_result}`, function*(action) {
        try{
          const {payload:{list}} = action;
          let devicelist = [];
          lodashmap(list,(device)=>{
            devicelist.push(device.DeviceId);
            g_devicesdb[device.DeviceId] = device;
          });
          yield put(ui_searchbattery_result({g_devicesdb,devicelist}));
        }
        catch(e){
          console.log(e);
        }
    });


    //ui_mycarselcurdevice_request
    yield takeLatest(`${ui_mycar_selcurdevice}`, function*(action) {
      //地图模式选择车辆
      try{
        const {payload:DeviceId} = action;

        if(!!infoWindow){
            infoWindow.close();
            infoWindow = null;
        }
        // if(typeof DeviceId === 'string'){
        //   DeviceId = parseInt(DeviceId);
        // }
        //先定位到地图模式,然后选择车辆
        const deviceitem = g_devicesdb[DeviceId];
        // console.log(`${DeviceId}`)
        // console.log(`${deviceitem}`)
        // console.log(`${JSON.stringify(g_devicesdb)}`)
        // yield put(ui_mycar_showtype(0));
        if(!!deviceitem){
          yield put(ui_selcurdevice_request({DeviceId,deviceitem,src:'map'}));
        }

      }
      catch(e){
        console.log(e);
      }
    });

    yield takeLatest(`${ui_alarm_selcurdevice}`, function*(action) {
      //预警模式选择车辆
      try{
        //切换到首页
        let {payload:DeviceId} = action;

        if(!!infoWindow){
            infoWindow.close();
            infoWindow = null;
        }
        //先定位到地图模式,然后选择车辆
        let deviceitem = g_devicesdb[DeviceId];
        //console.log(`${deviceitem}`)
        if(config.softmode === 'app'){
          yield put(ui_sel_tabindex(0));
          yield put(replace('/index'));
          //选择第一个tab
          yield put(ui_index_selstatus(0));
        }
        else if(config.softmode === 'pc'){
          yield put(replace('/index'));
        }
        //选择车辆
        if(!!deviceitem){
          yield put(ui_selcurdevice_request({DeviceId,deviceitem,src:'map'}));
        }
      }
      catch(e){
        console.log(e);
      }
    });


    yield takeLatest(`${ui_selworkorder}`, function*(action) {
      //预警模式选择车辆
      try{
        //切换到首页
        let {payload:DeviceId} = action;
        // if(typeof DeviceId === 'string'){
        //   DeviceId = parseInt(DeviceId);
        // }
        //先定位到地图模式,然后选择车辆
        let deviceitem = g_devicesdb[DeviceId];
        //console.log(`${deviceitem}`)
        yield put(ui_sel_tabindex(0));
        //选择第一个tab
        yield put(ui_index_selstatus(0));

        yield put(replace('/index'));
        //选择车辆
        if(!!deviceitem){
          yield put(ui_selcurdevice_request({DeviceId,deviceitem,src:'map'}));
        }
      }
      catch(e){
        console.log(e);
      }
    });

    yield takeLatest(`${searchbatterylocal_request}`, function*(action) {
        //搜索本地电池包
        try{
          const {payload:{query}} = action;
          //console.log(`搜索本地电池包===>${JSON.stringify(query)}`);
          //groupid/adcode/deviceid
          if(!query.groupid && !query.adcode && query.deviceid.length < 4){
            yield put(common_err({type:'searchbatterylocal',errmsg:`搜索范围太大,请至少输入4位以上id或选择分组和行政区域`}));
            return;
          }
          let list = [];
          if(!!query.groupid){
            const {groups} = yield select((state)=>{
              return {groups:state.device.groups};
            });
            const groupinfo = groups[query.groupid];
            if(!!groupinfo){
              const result = filter(groupinfo.deviceids,(deviceinfo)=>{
                if(query.deviceid === ''){
                  return true;
                }
                return includes(deviceinfo.DeviceId,query.deviceid);
              });
              lodashmap(result,(info)=>{
                list.push(info);
              });
              //console.log(`查询分组:${JSON.stringify(result)}`);
              yield put(searchbattery_result({list}));
              return;
            }
          }

          const result = filter(g_devicesdb,(deviceinfo)=>{
            if(query.deviceid === ''){
              return true;
            }
            return includes(deviceinfo.DeviceId,query.deviceid);
          });
          //console.log(`查询设备:${JSON.stringify(result)}`);
          lodashmap(result,(info)=>{
            list.push(info);
          });
          yield put(searchbattery_result({list}));
          // if(!!query.adcode){
          //   let areaids = [];
          //   const {datatreeloc} = yield select((state)=>{
          //     return {datatreeloc:state.device.datatreeloc};
          //   });
          //
          //   const setnode_pushdevice = (node)=>{
          //     if(node.type === 'group_area'){
          //       areaids.push(node.adcode);
          //     }
          //     if(!!node.children){
          //       for(let i = 0; i<node.children.length ;i++){
          //         const subnode = node.children[i];
          //         setnode_pushdevice(subnode);
          //       }
          //     }
          //   };
          //
          //   const findnode = (node,adcode)=>{
          //     if(node.adcode === adcode){
          //       if(node.type !== 'group_root'){
          //         return node;
          //       }
          //     }
          //     let retnode = null;
          //     if(!!node.children){
          //       for(let i = 0; i<node.children.length ;i++){
          //         const subnode = node.children[i];
          //         let tmpnode = findnode(subnode,adcode);
          //         if(!!tmpnode){//subnode为tmpnode,目标选中
          //           if(tmpnode.adcode === adcode){
          //             //选中／展开//equal
          //             setnode_pushdevice(subnode);
          //             return;
          //           }
          //           retnode = node;
          //         }//find ok
          //       }//end for
          //     }
          //     return retnode;
          //   };//function end
          //   //console.log(`选择编码[${query.adcode}]`);
          //   findnode(datatreeloc,query.adcode);
          //   //console.log(`找到所有区域[${areaids}]`);
          //
          //   //==============
          //   // let forkhandles = [];
          //   // for(let i=0;i<areaids.length ;i++){
          //   //   const handlefork = yield fork(function*(adcode){
          //   //     const result = yield call(getclustertree_one,adcode);
          //   //     if(result.type === 'device'){
          //   //         searchresult_deviceids = [...searchresult_deviceids,...result.deviceids];
          //   //     }
          //   //   },areaids[i]);
          //   //   forkhandles.push(handlefork);
          //   // };
          //   //
          //   // if(forkhandles.length > 0){
          //   //   yield join(...forkhandles);
          //   // }
          //   for(let i=0;i<areaids.length ;i++){
          //       const result = yield call(getclustertree_one,areaids[i]);
          //       if(result.type === 'device'){
          //           searchresult_deviceids = [...searchresult_deviceids,...result.deviceids];
          //       }
          //   };
          //
          //   //console.log(`找到所有设备Id[${searchresult_deviceids.length}]`);
          //   //console.log(`找到所有设备Id[${searchresult_deviceids}]`);
          //
          // }//query


        }
        catch(e){
          console.log(e);
        }

    });

    yield takeLatest(`${ui_viewdevicedetail}`, function*(action) {
        //搜索本地电池包
      try{
          const {payload:{DeviceId}} = action;
          //获取该车辆信息
          yield put(querydeviceinfo_request({query:{DeviceId}}));
          const {payload} = yield take(`${querydeviceinfo_result}`);
          let deviceitem = payload;
          g_devicesdb[deviceitem] = deviceitem;

          yield put(push(`/deviceinfo/${DeviceId}`))
        }
        catch(e){
          console.log(e);
        }
    });
}

export {g_devicesdb};
