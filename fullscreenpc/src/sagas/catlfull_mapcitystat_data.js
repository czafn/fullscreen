import lodashgroup from 'lodash.groupby';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

let mapcitystatlistdata = [];
let mapstatdata = {};

const getAddress = (adcode,flag)=>{//100->city,1000->provice
  let newadcode = '';
  if(flag === 1){
    return '100000';//全国
  }
  for(let i = 0;i < adcode.length; i++){
    if(i < flag){
      newadcode+=adcode[i];
    }
    else{
      newadcode+='0';
    }
  }
  return newadcode;
}

const setdata = (data)=>{
  mapcitystatlistdata = data;
  mapstatdata = {};
  for(let i = 0 ;i < 4 ;i++){//0,1,3
    if(i+1 !== 3){
      let maplistdata = lodashgroup(mapcitystatlistdata,(info)=>{
        // "adcode": "419001"
        return getAddress(info.adcode,i+1);//保留`~4位
      });
      lodashmap(maplistdata,(v,k)=>{
        //v为array,k为key
        if(v.length > 0){
          let info = {
            province:lodashget(v[0],'province',''),
            city:lodashget(v[0],'city',''),
            adcode:lodashget(v[0],'adcode',''),
            citycode:lodashget(v[0],'citycode',''),
            BUS:0,
            CAR:0,
            CONTAINERTRUCK:0,
            ENERGYTRUCK:0,
          }
          for(let i = 0;i < v.length ;i++){
            info['BUS'] = info['BUS']+v[i]['BUS'];
            info['CAR'] = info['CAR']+v[i]['CAR'];
            info['CONTAINERTRUCK'] = info['CONTAINERTRUCK']+v[i]['CONTAINERTRUCK'];
            info['ENERGYTRUCK'] = info['ENERGYTRUCK']+v[i]['ENERGYTRUCK'];
          }
          info['totalcount'] = info['BUS']+info['CAR']+info['CONTAINERTRUCK']+info['ENERGYTRUCK'];
          mapstatdata[k] = info;
          // console.log(`k->${k}`);

        }
      });
    }
  }
  // console.log(mapstatdata);
}


const getdata = (adcode)=>{
  console.log(`getdata--->${adcode}`);
  return mapstatdata[`${adcode}`];
}
export {setdata,getdata};
