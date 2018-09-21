import lodashgroup from 'lodash.groupby';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

let mapcitystatlistdata = [];
let mapstatdata = {};
let counttotal = 0;
let countalarm3_map = 0;
let countalarm2_map = 0;
let countalarm1_map = 0;


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
            BUS_Warning:{
              "总数":0,
              "三级":0,
              "二级":0,
              "一级":0
            },
            CAR_Warning:{
              "总数":0,
              "三级":0,
              "二级":0,
              "一级":0
            },
            CONTAINERTRUCK_Warning:{
              "总数":0,
              "三级":0,
              "二级":0,
              "一级":0
            },
            ENERGYTRUCK_Warning:{
              "总数":0,
              "三级":0,
              "二级":0,
              "一级":0
            },
          }
          for(let i = 0;i < v.length ;i++){
            info['BUS'] = info['BUS']+v[i]['BUS'];
            info['CAR'] = info['CAR']+v[i]['CAR'];
            info['CONTAINERTRUCK'] = info['CONTAINERTRUCK']+v[i]['CONTAINERTRUCK'];
            info['ENERGYTRUCK'] = info['ENERGYTRUCK']+v[i]['ENERGYTRUCK'];

            info['BUS_Warning']['三级'] = info['BUS_Warning']['三级']+v[i]['BUS_Warning']['三级'];
            info['BUS_Warning']['二级'] = info['BUS_Warning']['二级']+v[i]['BUS_Warning']['二级'];
            info['BUS_Warning']['一级'] = info['BUS_Warning']['一级']+v[i]['BUS_Warning']['一级'];
            info['BUS_Warning']['总数'] = info['BUS_Warning']['三级']+info['BUS_Warning']['二级']+info['BUS_Warning']['一级'];

            info['CAR_Warning']['三级'] = info['CAR_Warning']['三级']+v[i]['CAR_Warning']['三级'];
            info['CAR_Warning']['二级'] = info['CAR_Warning']['二级']+v[i]['CAR_Warning']['二级'];
            info['CAR_Warning']['一级'] = info['CAR_Warning']['一级']+v[i]['CAR_Warning']['一级'];
            info['CAR_Warning']['总数'] = info['CAR_Warning']['三级']+info['CAR_Warning']['二级']+info['CAR_Warning']['一级'];

            info['CONTAINERTRUCK_Warning']['三级'] = info['CONTAINERTRUCK_Warning']['三级']+v[i]['CONTAINERTRUCK_Warning']['三级'];
            info['CONTAINERTRUCK_Warning']['二级'] = info['CONTAINERTRUCK_Warning']['二级']+v[i]['CONTAINERTRUCK_Warning']['二级'];
            info['CONTAINERTRUCK_Warning']['一级'] = info['CONTAINERTRUCK_Warning']['一级']+v[i]['CONTAINERTRUCK_Warning']['一级'];
            info['CONTAINERTRUCK_Warning']['总数'] = info['CONTAINERTRUCK_Warning']['三级']+info['CONTAINERTRUCK_Warning']['二级']+info['CONTAINERTRUCK_Warning']['一级'];

            info['ENERGYTRUCK_Warning']['三级'] = info['ENERGYTRUCK_Warning']['三级']+v[i]['ENERGYTRUCK_Warning']['三级'];
            info['ENERGYTRUCK_Warning']['二级'] = info['ENERGYTRUCK_Warning']['二级']+v[i]['ENERGYTRUCK_Warning']['二级'];
            info['ENERGYTRUCK_Warning']['一级'] = info['ENERGYTRUCK_Warning']['一级']+v[i]['ENERGYTRUCK_Warning']['一级'];
            info['ENERGYTRUCK_Warning']['总数'] = info['ENERGYTRUCK_Warning']['三级']+info['ENERGYTRUCK_Warning']['二级']+info['ENERGYTRUCK_Warning']['一级'];

          }
          info['totalcount'] = info['BUS']+info['CAR']+info['CONTAINERTRUCK']+info['ENERGYTRUCK'];
          info['报警总数'] =info['BUS_Warning']['总数']+info['CAR_Warning']['总数']+
            info['CONTAINERTRUCK_Warning']['总数']+info['ENERGYTRUCK_Warning']['总数'];
          mapstatdata[k] = info;
          // console.log(`k->${k}`);

        }
      });
    }
  }

  let totalinfo = mapstatdata['100000'];
  if(!!totalinfo){
    if(counttotal > totalinfo['totalcount']){
      totalinfo['BUS'] = totalinfo['BUS']+(counttotal - totalinfo['totalcount']);
      totalinfo['totalcount'] = counttotal;
    }
    countalarm3_map = totalinfo['BUS_Warning']['三级']+totalinfo['CAR_Warning']['三级']+totalinfo['CONTAINERTRUCK_Warning']['三级']+totalinfo['ENERGYTRUCK_Warning']['三级'];
    countalarm2_map = totalinfo['BUS_Warning']['二级']+totalinfo['CAR_Warning']['二级']+totalinfo['CONTAINERTRUCK_Warning']['二级']+totalinfo['ENERGYTRUCK_Warning']['二级'];
    countalarm1_map = totalinfo['BUS_Warning']['一级']+totalinfo['CAR_Warning']['一级']+totalinfo['CONTAINERTRUCK_Warning']['一级']+totalinfo['ENERGYTRUCK_Warning']['一级'];
  }
  mapstatdata['100000'] = totalinfo;
  // console.log(mapstatdata);

  return {countalarm3_map,countalarm2_map,countalarm1_map};
}


const getdata = (adcode)=>{
  return mapstatdata[`${adcode}`];
}

const setcounttotal = (c)=>{
  counttotal = c;
}
export {setdata,getdata,setcounttotal};
