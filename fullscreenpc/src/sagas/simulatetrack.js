import {getRandomLocation} from '../env/geo';
import map from 'lodash.map';
let mapidlocation = {};
//id:{loclst,curindex}

const getnavdrawroute =({startlnglat,endlnglat})=> {
  return new Promise(resolve => {
    if(!!startlnglat && !!endlnglat ){
      // //console.log('获取一个实时导航:' + JSON.stringify(startlnglat));
      // //console.log('获取一个实时导航:' + JSON.stringify(endlnglat));
      let driving = new window.AMap.Driving({extensions:'base'});
      // 根据起终点经纬度规划驾车导航路线
      driving.search(new window.AMap.LngLat(startlnglat.lng, startlnglat.lat),
       new window.AMap.LngLat(endlnglat.lng, endlnglat.lat),
      (status,result)=>{
            if(status === 'complete'){
              map(result.routes,(route)=>{
                let latlngs = [];
                let instruction = '';
                map(route.steps,(drivestep)=>{
                  if(instruction.length === 0){
                    instruction = drivestep.instruction;
                  }
                  map(drivestep.path,(pt)=>{
                      latlngs.push({
                        lat:pt.lat,
                        lng:pt.lng
                      });
                  });
                });
                resolve({
                    latlngs,
                  });
                return;
              });//for(let route of result.routes){
            }//if(status === 'complete'){
          resolve({latlngs:[]});
      });//driving.search
    }//if
    else{
      resolve({latlngs:[]});
    }
  });//return new Promise(resolve => {
}//getnavdrawroute

const getRandomLocation_track = (id,Latitude,Longitude)=>{
  return new Promise(resolve => {
    let isget = false;
    let obj = mapidlocation[id];
    if(!!obj){
      if(obj.curindex < obj.loclst.length){
        mapidlocation[id].curindex = mapidlocation[id].curindex+1;
        resolve([mapidlocation[id].loclst[mapidlocation[id].curindex].lng,mapidlocation[id].loclst[mapidlocation[id].curindex].lat]);
        return;
      }
    }

    const locationsz = getRandomLocation(Latitude,Longitude,50*1000);
    const startlnglat = {lng:Longitude,lat:Latitude};
    const endlnglat = {lng:locationsz[0],lat:locationsz[1]};
    getnavdrawroute({startlnglat,endlnglat}).then(({latlngs})=>{
      mapidlocation[id] = {
        loclst:latlngs,
        curindex:0
      };
      if(mapidlocation[id].loclst.length > 0){
        resolve([mapidlocation[id].loclst[mapidlocation[id].curindex].lng,mapidlocation[id].loclst[mapidlocation[id].curindex].lat]);
      }
    });
    // //console.log(`${JSON.stringify(mapidlocation)}`);
  });
};

export {getRandomLocation_track};
