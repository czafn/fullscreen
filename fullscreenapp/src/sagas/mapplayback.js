import { select,put,call,take,takeLatest,takeEvery } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  // mapmain_setzoomlevel,
  // mapmain_setmapcenter,
  // map_setmapinited,
  carmapshow_createmap,
  carmapshow_destorymap,
  // mapmain_setenableddrawmapflag,
  // querydevice_result,
  // ui_selcurdevice_request,
  // querydeviceinfo_request,

  mapplayback_start,
  mapplayback_end,
  queryhistorytrack_request,
  queryhistorytrack_result
} from '../actions';
import coordtransform from 'coordtransform';
import {getcurrentpos} from './getcurrentpos';
// import { push } from 'react-router-redux';
import L from 'leaflet';


const divmapid_maptrackhistoryplayback = 'maptrackhistoryplayback';


const loczero = L.latLng(0,0);
let gPathSimplifier,pathSimplifierIns;
const CreateMapUI =  (map)=>{
    return new Promise((resolve,reject) => {
        //加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分
         window.AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier)=> {
          gPathSimplifier = PathSimplifier;
          if (!PathSimplifier.supportCanvas) {
              alert('当前环境不支持 Canvas！');
              return;
          }

          pathSimplifierIns = new PathSimplifier({
              zIndex: 100,
              map: map, //所属的地图实例
              getPath: (pathData, pathIndex)=> {
                  //返回轨迹数据中的节点信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng,lat],[lng,lat]...]
                  return pathData.path;
              },
              getHoverTitle: (pathData, pathIndex, pointIndex)=> {
                  const {name,path,devicegpstimes} = pathData;
                  //返回鼠标悬停时显示的信息
                  if(!!pointIndex){
                    if (pointIndex >= 0) {
                        //鼠标悬停在某个轨迹节点上
                        return `${name}于${devicegpstimes[pointIndex].GPSTime}`;//name + '，点:' + pointIndex + '/' + path.length;
                    }
                  }

                  //鼠标悬停在节点之间的连线上
                  if(devicegpstimes.length > 2){
                    return `${name}在${devicegpstimes[0].GPSTime}~${devicegpstimes[devicegpstimes.length-1].GPSTime}`;
                  }
                  return pathData.name + '，点数量' + path.length;
              },
              renderOptions: {
                  //轨迹线的样式
                  pathLineStyle: {
                      strokeStyle: 'red',
                      lineWidth: 6,
                      dirArrowStyle: true
                  }
              }
          });

          //这里构建两条简单的轨迹，仅作示例
          // pathSimplifierIns.setData([{
          //     name: '上海桂菁路69号到常州津通工业园',
          //     //创建一条包括500个插值点的大地线
          //     path: PathSimplifier.getGeodesicPath([121.4044300000,31.1742500000], [119.9515200000,31.6641500000], 500)
          //
          // }]);
          resolve(pathSimplifierIns);
        });

   });
}

let navg0;
const startplayback = ({isloop,speed})=>{
  return new Promise((resolve,reject) => {
    if(!!pathSimplifierIns){
      //创建一个巡航器
          const onload = ()=> {
              pathSimplifierIns.renderLater();
          }

          const onerror =(e)=> {
              alert('图片加载失败！');
          }

          navg0 = pathSimplifierIns.createPathNavigator(0, {
             loop: isloop, //循环播放
             speed,
             pathNavigatorStyle: {
                  width: 16,
                  height: 32,
                  content: gPathSimplifier.Render.Canvas.getImageContent(`${process.env.PUBLIC_URL}/images/car_online.png`, onload, onerror),
                  strokeStyle: null,
                  fillStyle: null
            }
         });
         navg0.start();
         resolve(navg0);
    }
  });
}

let createmap =({mapcenterlocation,zoomlevel})=> {
  return new Promise((resolve,reject) => {
    if(!mapcenterlocation.equals(loczero) && !window.amaptrackhistoryplayback ){
      let center = new window.AMap.LngLat(mapcenterlocation.lng,mapcenterlocation.lat);
      window.amaptrackhistoryplayback = new window.AMap.Map(divmapid_maptrackhistoryplayback, {
            center: center,
            zoom:zoomlevel,
            lang:"zh-cn",
            dragEnable:true,
            zoomEnable:true,
            touchZoom:true,
        });

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
            window.amaptrackhistoryplayback.addControl(scale);
            window.amaptrackhistoryplayback.addControl(toolBar);
            window.amaptrackhistoryplayback.addControl(overView);
            resolve(window.amaptrackhistoryplayback);
        });
      }
      else{
        if(!!window.amaptrackhistoryplayback){
          resolve(window.amaptrackhistoryplayback);
          return;
        }
        reject(`地图参数${mapcenterlocation.lng},${mapcenterlocation.lat},amaptrackhistoryplayback:${!!window.amaptrackhistoryplayback}`);
      }
  });
}


const getmapstate_curdevice = (state) => {
  const {device:{g_devicesdb,mapseldeviceid}} = state;
  let deviceitem = g_devicesdb[mapseldeviceid];
  if(!!deviceitem){
    const last_Latitude = deviceitem.last_Latitude;
    const last_Longitude = deviceitem.last_Longitude;
    if(!!last_Longitude){
      const locz = L.latLng(last_Latitude,last_Longitude);
      return locz;
    }
  }
  return loczero;
}

export function* createmaptrackhistoryplaybackflow(){

    //创建地图
    yield takeEvery(`${carmapshow_createmap}`, function*(action_createmap) {
      try{
        let {payload:{divmapid}} = action_createmap;
        if(divmapid === divmapid_maptrackhistoryplayback){
          while(!window.AMap || !window.AMapUI){
            yield call(delay,500);
          }

          //take
          let mapcenterlocation = yield select(getmapstate_curdevice);
          const zoomlevel = 16;

          if(mapcenterlocation.equals(loczero)){//仅在第一次加载页面初始化时进入
            const centerpos = yield call(getcurrentpos);
            mapcenterlocation = L.latLng(centerpos.lat, centerpos.lng);
          }
          yield call(createmap,{mapcenterlocation,zoomlevel});//创建地图

          yield call(CreateMapUI,window.amaptrackhistoryplayback);


          while(true){
            let {payload:{divmapid}} = yield take(`${carmapshow_destorymap}`);
            if(divmapid === divmapid_maptrackhistoryplayback){
              break;
            }
          }

        }
      }
      catch(e){
        console.log(e);
      }

    });

    //销毁地图
    yield takeEvery(`${carmapshow_destorymap}`, function*(action_destorymap) {
        let {payload:{divmapid}} = action_destorymap;
        const destorymapfn = (divmapid)=>{
          return new Promise((resolve) => {
            try{
              if(divmapid === divmapid_maptrackhistoryplayback){
                window.amaptrackhistoryplayback = null;
                navg0 = null;
                gPathSimplifier = null;
                pathSimplifierIns = null;
              }
            }
            catch(e){
              console.log(e);
            }
            resolve();
          });
        };
        yield call(destorymapfn,divmapid);

    });

    // yield takeEvery(`${ui_selcurdevice_request}`,function*(actioncurdevice){
    //   const {payload:{deviceitem}} = actioncurdevice;
    //   const selcurdevice_requestfn = (deviceitem)=>{
    //     return new Promise((resolve) => {
    //       try{
    //         if(!!window.amaptrackhistoryplayback){
    //           if(!!deviceitem){
    //             const LastHistoryTrack = deviceitem.LastHistoryTrack;
    //             if(!!LastHistoryTrack){
    //               if(last_Latitude !== 0 && last_Longitude !== 0){
    //                 let cor = [last_Longitude,last_Latitude];
    //                 let wgs84togcj02=coordtransform.wgs84togcj02(cor[0],cor[1]);
    //                 window.amaptrackhistoryplayback.setCenter(wgs84togcj02);
    //               }
    //             }
    //           }
    //         }
    //       }
    //       catch(e){
    //         console.log(e);
    //       }
    //       resolve();
    //     });
    //   };
    //   yield call(selcurdevice_requestfn,deviceitem);
    // });

    //mapplayback_start
    yield  takeLatest(`${mapplayback_start}`,function*(actionstart){
      try{
          const {payload:{isloop,speed,query}} = actionstart;
          yield put(queryhistorytrack_request({query}));
          const {payload:{list}} = yield take(`${queryhistorytrack_result}`);
          let path = [];
          let devicegpstimes = [];
          let latlngs = [];
          let center;
          for(let i = 0;i < list.length ;i ++){
            let cor = [list[i].Longitude,list[i].Latitude];
            if(cor[0] !== 0 && cor[1] !== 0){
            let wgs84togcj02=coordtransform.wgs84togcj02(cor[0],cor[1]);
            latlngs.push([wgs84togcj02[1],wgs84togcj02[0]]);
            path.push(wgs84togcj02);
            devicegpstimes.push({
              GPSTime:list[i].GPSTime
            });
            if(!center){
              center = wgs84togcj02;
            }
          }
          }

          if(path.length > 0){
            let polyline = L.polyline(latlngs);
            let lBounds = polyline.getBounds();//LatLngBounds
            let southWest = new window.AMap.LngLat(lBounds.getSouthWest().lng,lBounds.getSouthWest().lat);
            let northEast = new window.AMap.LngLat(lBounds.getNorthEast().lng,lBounds.getNorthEast().lat);
            let amapboounds = new window.AMap.Bounds(southWest,northEast);
            window.amaptrackhistoryplayback.setBounds(amapboounds);
            pathSimplifierIns.setData([{
              name: `车辆:${query.DeviceId}`,
              DeviceId:query.DeviceId,
              path,
              devicegpstimes
            }]);
            yield call(startplayback,{isloop,speed});
            //console.log(`路线:${JSON.stringify({
            //   name: `车辆:${query.DeviceId}`,
            //   path
            // })}`);
          }

        }
        catch(e){
          console.log(e);
        }
    });
    //mapplayback_end
    yield takeLatest(`${mapplayback_end}`,function*(action){
      const mapplayback_endfn = ()=>{
        return new Promise((resolve) => {
          try{
            if(!!navg0){
              navg0.stop();
              navg0.destroy();
            }
          }
          catch(e){
            console.log(e);
          }
          resolve();
        });
      }
      yield call(mapplayback_endfn);
    });
}
