import async from 'async';
import coordtransform from 'coordtransform';
import map from 'lodash.map';
import clone from 'lodash.clone';
//转换数据,批量转换所有数据
 const getgeodatabatch =(devicelist)=> {
  return new Promise((resolve,reject) => {
    let resultdevicelist = [];
    map(devicelist,(deviceitem)=>{
      let isget = true;
      const last_Latitude = deviceitem.last_Latitude;
      const last_Longitude = deviceitem.last_Longitude;
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
        //let keygeo = `${wgs84togcj02[0]},${wgs84togcj02[1]}`;
        deviceitem.locz = wgs84togcj02;
      }
      resultdevicelist.push(deviceitem);
    });
    //
    //
    resolve(resultdevicelist);
  });
};

 const getgeodata =(deviceitem)=>{
  return new Promise((resolve,reject) => {

    const geocoder = new window.AMap.Geocoder({
            radius: 1000,
        });
    const lnglatXY = deviceitem.locz;//[116.396574, 39.992706];//地图上所标点的坐标
    if(!lnglatXY){
      // console.log(`deviceitem.locz empty:${JSON.stringify(deviceitem)}`)
      resolve();
      return;
    }
    // console.log(`lnglatXY===>${JSON.stringify(lnglatXY)}`);
    geocoder.getAddress(lnglatXY, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
           //获得了有效的地址信息:
           //即，result.regeocode.formattedAddress
           let georesult = result.regeocode;
           let addressComponent = georesult.addressComponent;
           let resultobj = {
             adcode:addressComponent.adcode,
             city:addressComponent.city,
             province:addressComponent.province,
             district:addressComponent.district,
             formattedAddress:georesult.formattedAddress
           };

           resolve(resultobj);
        }else{
           //获取地址失败
          //  console.log(`deviceitem:${JSON.stringify(deviceitem)},status:${status},result:${JSON.stringify(result)}`)
           resolve();
        }
    });
  });
}
 const getgeodatabatch2 =(devicelist)=> {
  return new Promise((resolve,reject) => {
    const geocoder = new window.AMap.Geocoder({
            radius: 1000,
            batch:true,
        });
    let i = 0;
    let parallelfunsz = [];
    let resultdevicelist = [];
    let mapgeo = {};
    let lnglatXYsz = [];
    let mapsz = [];

    //每20个获取一个坐标数组
    map(devicelist,(deviceitem)=>{
      let isget = true;
      const last_Latitude = deviceitem.last_Latitude;
      const last_Longitude = deviceitem.last_Longitude;
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
        lnglatXYsz.push(wgs84togcj02);
      }

      if(lnglatXYsz.length>19 || i===devicelist.length -1 ){
        //last one
        mapsz.push(lnglatXYsz);
        lnglatXYsz = [];
      }
      i++;
    });

    //
    //设置并发
    map(mapsz,(mapxy)=>{
      //
      parallelfunsz.push((callbackfn)=>{
        let mapxyobj = map(mapxy, clone);
        //
        //
        geocoder.getAddress(mapxyobj, (status, result)=> {
             if (status === 'complete' && result.info === 'OK') {
               if(!!result.regeocodes){
                 map(result.regeocodes,(georesult,index)=>{
                   if(!!georesult){
                     let addressComponent = georesult.addressComponent;
                     if(!!addressComponent){
                       //
                       mapgeo[`${mapxy[index][0]},${mapxy[index][1]}`] = {
                         adcode:addressComponent.adcode,
                         city:addressComponent.city,
                         province:addressComponent.province,
                         district:addressComponent.district,
                         formattedAddress:georesult.formattedAddress
                       };
                     }
                   }
                 });
               }
               callbackfn(null,true);
             }
         });
      });
    });

    //获取所有结果
    async.parallel(parallelfunsz,(err,result)=>{
      map(devicelist,(deviceitem)=>{
        let isget = true;
        const last_Longitude = deviceitem.last_Longitude;
        const last_Latitude = deviceitem.last_Latitude;
        if (!last_Latitude) {
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
          let keygeo = `${wgs84togcj02[0]},${wgs84togcj02[1]}`;
          deviceitem.address = mapgeo[keygeo];
          deviceitem.locz = wgs84togcj02;
        }
        resultdevicelist.push(deviceitem);
      });
      //
      //
      resolve(resultdevicelist);
    });
  });
}

export {getgeodatabatch,getgeodata,getgeodatabatch2};
