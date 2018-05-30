// import get from 'lodash.get';
import store from '../../env/store';
import startsWith from 'lodash.startswith';
import map from 'lodash.map';

export const bridge_deviceinfo = (deviceinfo)=>{
  const {LastRealtimeAlarm,...rest} = deviceinfo;
  let deviceinfonew = {...rest,...LastRealtimeAlarm};
  return deviceinfonew;
}

export const getalarmfieldallfields = (mapdict)=>{
  let alarmfileds = [];
  map(mapdict,(v,k)=>{
    if(startsWith(v.name, 'AL_')){
      alarmfileds.push({
        label:v.showname || v.name,
        value:v.name
      });
    }
  });
  return alarmfileds;
}

export const getalarmfieldtotxt = (alarmfield)=>{
    const {mapdict} = store.getState().app;
    if(startsWith(alarmfield, 'AL_') || startsWith(alarmfield, 'F[')){
      if(startsWith(alarmfield, 'AL_')){
        if(!!mapdict[alarmfield]){
          return mapdict[alarmfield].showname;
        }
      }
      return alarmfield;
    }
    return undefined;
};

//转换报警信息
export const bridge_alarminfo = (alarminfo)=>{
  let alarmtxt = '';
  let alarminfonew = {};
  let {_id,CurDay,DeviceId,__v,DataTime,warninglevel,Longitude,Latitude,...rest} = alarminfo;
  map(rest,(v,key)=>{
    let keytxt = getalarmfieldtotxt(key);
    if(!!keytxt){
      alarmtxt += `${keytxt} ${v}次|`
    }

  });
  alarminfonew[`key`] = alarminfo._id;
  alarminfonew[`车辆ID`] = alarminfo[`DeviceId`];
  alarminfonew[`报警时间`] = alarminfo[`DataTime`];
  alarminfonew[`报警等级`] = alarminfo[`warninglevel`];
  alarminfonew[`报警信息`] = alarmtxt;
  return alarminfonew;
}

export const bridge_deviceinfo_pop =(deviceitem)=>{
  let kvlist = [];
  deviceitem = bridge_deviceinfo(deviceitem);
  const {mappopfields,mapdict} = store.getState().app;
  map(mappopfields,(v)=>{
    if(!!mapdict[v]){
      kvlist.push(mapdict[v]);
    }
  })
  return {deviceitem,kvlist};
}

export const bridge_deviceinfo_popcluster =(deviceitemlist)=>{
  let kvlist = [];
  let itemlist = [];
  map(deviceitemlist,(deviceitem)=>{
    itemlist.push(bridge_deviceinfo(deviceitem));
  });
  const {mappopclusterfields,mapdict} = store.getState().app;
  map(mappopclusterfields,(v)=>{
    if(!!mapdict[v]){
      kvlist.push(mapdict[v]);
    }
  })
  return {deviceitemlist:itemlist,kvlist};
}
