import get from 'lodash.get';
import moment from 'moment';
const getdevicestatus_isonline = (deviceitem,SettingOfflineMinutes=20)=>{
  let isonline = false;
  let gpstime = get(deviceitem,'last_GPSTime');
  if(!!gpstime){
    // a.diff(b, 'days')
    const diffmin = moment().diff(moment(gpstime),'minutes');
    isonline = diffmin < SettingOfflineMinutes;
  }

  // if(isonline){
  //   console.log(`${deviceitem.DeviceId}==>${isonline},${gpstime}`);
  // }

  return isonline;
}

const getdevicestatus_alaramlevel = (deviceitem)=>{
  let warninglevel = get(deviceitem,'warninglevel','');
  // const deviceidr = parseInt(deviceitem.DeviceId)%3;
  // if(deviceidr %3 === 0){
  //   warninglevel = '高';
  // }
  // else if(deviceidr %3 === 1){
  //   warninglevel = '中';
  // }
  // else{
  //   warninglevel = '低';
  // }
  return warninglevel;
}

const getwarningleveltext = (warninglevel)=>{
  const warninglevelmap = {
    '高':'三级',
    '中':'二级',
    '低':'一级'
  };
  if(!!warninglevelmap[warninglevel]){
    return warninglevelmap[warninglevel];
  }
  return warninglevel;
}

export {getdevicestatus_isonline,getdevicestatus_alaramlevel,getwarningleveltext};
