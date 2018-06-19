import get from 'lodash.get';
// import store from '../env/store';
// import {ui_showmenu} from '../actions';
// import { push,goBack,go  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
// import moment from 'moment';
import lodashmap from 'lodash.map';
import {bridge_deviceinfo_pop,bridge_deviceinfo_popcluster} from './datapiple/bridgedb';
// import {ui_btnclick_devicemessage} from '../actions';
import {getdevicestatus_alaramlevel} from '../util/getdeviceitemstatus';
import {createInfoWindow_popinfo,createInfoWindow_poplistinfo} from './mapmain_infowindow';
import {getdevicestatus_isonline} from '../util/getdeviceitemstatus';
//地图上点图标的样式【图标类型】


//弹出窗口样式
// adcode
// :
// "150782"
// city
// :
// "呼伦贝尔市"
// district
// :
// "牙克石市"
// formattedAddress
// :
//设备
//
// const getCoureName = (course)=> {
//
//     var name = "";
//     if(typeof course === 'string'){
//       course = parseFloat(course);
//     }
//
//     if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360)) // 0
//     {
//         name = "正北";
//     }
//     else if (course >= 22.5 && course < 67.5) // 45
//     {
//         name = "东北";
//     }
//     else if (course >= 67.5 && course < 112.5) // 90
//     {
//         name = "正东";
//     }
//     else if (course >= 112.5 && course < 157.5) //135
//     {
//         name = "东南";
//     }
//     else if (course >= 157.5 && course < 202.5) //180
//     {
//         name = "正南";
//     }
//     else if (course >= 202.5 && course < 247.5) //225
//     {
//         name = "西南";
//     }
//     else if (course >= 247.5 && course < 292.5) //270
//     {
//         name = "正西";
//     }
//     else if (course >= 292.5 && course < 337.5) //315
//     {
//         name = "西北";
//     }
//     else {
//         name = "未知.";
//     }
//     return name;
// }

// window.clickfn_device =(DeviceId)=>{
//   store.dispatch(push(`/deviceinfo/${DeviceId}`));
// }
// window.clickfn_historyplay =(DeviceId)=>{
//   store.dispatch(push(`/historyplay/${DeviceId}`));
// }
// window.clickfn_showhistory =(DeviceId)=>{
//   store.dispatch(push(`/reports/historydevice/${DeviceId}`));
// }
// window.clickfn_showmessage =(DeviceId)=>{
//   store.dispatch(ui_btnclick_devicemessage({DeviceId}));
// }

const getpop_device =({deviceitem,kvlist})=>{
  const DeviceId = get(deviceitem,'DeviceId','');
  // let contentxt = '';
  let fields = [];
  lodashmap(kvlist,(v)=>{
    const fieldvalue = get(deviceitem,v.name,'');
    const unit = get(v,'unit','');
    let systemflag = 0;
    if(v.name === 'formattedAddress' || v.name === 'alarmtxtstat'){
      systemflag = 1;
    }
    fields.push({
      fieldname:v.name,
      showname:v.showname,
      fieldvalue,
      unit,
      systemflag
    });
    // contentxt += `<p class='l'><span class='t'>${v.showname}</span><span class='color_warning'>${fieldvalue}${unit}</span></p>`;
  });
  return createInfoWindow_popinfo({
    DeviceId,
    fields
  });
  // return {
  //       isCustom:true,
  //       size:new window.AMap.Size(500,500),
  //       content:createInfoWindow(`<p>车辆编号:${DeviceId}</p>`,`
  //       ${contentxt}
  //       <button onclick="clickfn_device(${DeviceId})" class='clickfn_device'>查看详情</button>
  //       <button onclick="clickfn_historyplay(${DeviceId})" class='clickfn_historyplay'>历史轨迹回放</button>
  //       <button onclick="clickfn_showhistory(${DeviceId})" class='clickfn_showhistory'>历史位置信息</button>
  //       <button onclick="clickfn_showmessage(${DeviceId})" class='clickfn_showmessage'>历史报警信息</button>`)
  //   };
}


export const getpopinfowindowstyle = (deviceitem)=>{
  let result = bridge_deviceinfo_pop(deviceitem);
  return getpop_device(result);
}



export const getlistpopinfowindowstyle = (deviceitemlist,SettingOfflineMinutes)=>{
    // let info = '<div class="getmapstylepage">';
    const result = bridge_deviceinfo_popcluster(deviceitemlist);
    const {kvlist} = result;

    let data = [];
    lodashmap(result.deviceitemlist,(deviceitem)=>{

        const DeviceId = get(deviceitem,'DeviceId','');
        let fields = [];
        // let contentxt = '';
        lodashmap(kvlist,(v)=>{
          const fieldvalue = get(deviceitem,v.name,'');
          const unit = get(deviceitem,v.unit,'');
          // contentxt += `${v.showname}${fieldvalue}${unit}|`;
          fields.push({
            fieldname:v.name,
            showname:v.showname,
            fieldvalue,
            unit
          });
        });
        // console.log(`deviceitem:${deviceitem.DeviceId},GPSTime:${}`)
        const  {iconname,isonline} = getimageicon_isonline(deviceitem,SettingOfflineMinutes);

        data.push({
          iconname,
          isonline,
          DeviceId,
          fields
        });
        // info +=  `<p onclick="clickfn_device(${deviceitem.DeviceId})">
        // <i class="t">车辆ID:${DeviceId}</i>
        // <i>${contentxt}</i></p>`;
    });
    // info += '</div>'
    return createInfoWindow_poplistinfo(data);

    // {
    //     content: createInfoWindow('aaa',`${info}`)
    // };
}


export const getimageicon_isonline = (item,SettingOfflineMinutes)=>{
  //这里根据不同item显示不同图标
  const isonline = getdevicestatus_isonline(item,SettingOfflineMinutes);
  const icon_car0 = `${process.env.PUBLIC_URL}/images/icon_car0.png`;
  const icon_car1 = `${process.env.PUBLIC_URL}/images/icon_car1.png`;
  const icon_car2 = `${process.env.PUBLIC_URL}/images/icon_car2.png`;
  const icon_car3 = `${process.env.PUBLIC_URL}/images/icon_car3.png`;
  const warninglevel = getdevicestatus_alaramlevel(item);
  let curpng = icon_car0;
  if(warninglevel === '高'){
    curpng = icon_car1;
  }
  else if(warninglevel === '中'){
    curpng = icon_car2;
  }
  else if(warninglevel === '低'){
    curpng = icon_car3;
  }
  return {iconname:curpng,isonline};
}


export const getimageicon = (item,SettingOfflineMinutes)=>{
  //这里根据不同item显示不同图标
  if(!getdevicestatus_isonline(item,SettingOfflineMinutes)){
    return `${process.env.PUBLIC_URL}/images/icon_caroffline.png`;
  }
  const icon_car0 = `${process.env.PUBLIC_URL}/images/icon_car0.png`;
  const icon_car1 = `${process.env.PUBLIC_URL}/images/icon_car1.png`;
  const icon_car2 = `${process.env.PUBLIC_URL}/images/icon_car2.png`;
  const icon_car3 = `${process.env.PUBLIC_URL}/images/icon_car3.png`;
  const warninglevel = getdevicestatus_alaramlevel(item);
  let curpng = icon_car0;
  if(warninglevel === '高'){
    curpng = icon_car1;
  }
  else if(warninglevel === '中'){
    curpng = icon_car2;
  }
  else if(warninglevel === '低'){
    curpng = icon_car3;
  }
  return curpng;
}
