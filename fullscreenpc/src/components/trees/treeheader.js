import React from 'react';
import {connect} from 'react-redux';
// import {Treebeard,decorators} from '../controls/react-treebeard-ex/src/index.js';
// import {getdevicestatus_isonline} from '../../util/getdeviceitemstatus';
import {getimageicon_isonline} from '../../sagas/getmapstyle';
// import icon_online from '../../img/1.png';
// import icon_offline from '../../img/3.png';
// import icon_car3 from './icon_car3.png';
import get from 'lodash.get';

const HeaderCo = (props) => {
    let title = props.node.name || '';
    let icon = false;
    if(props.node.type !== 'device'){
      if(props.treeviewstyle === 'byloc'){
        const name = props.gmap_acode_treename[props.node.adcode];
        title = `${name}`;
        const count_total = get(props.gmap_acode_treecount[props.node.adcode],'count_total',0);
        if(count_total > 0){
          const count_online = get(props.gmap_acode_treecount[props.node.adcode],'count_online',0);
          // const count_offline = get(props.gmap_acode_treecount[props.node.adcode],'count_offline',0);
          //  if(props.node.adcode === 1){
          //   title = `${name}(${count_total})`;
          // }
          // else{
            title = `${name}(${count_online}/${count_total})`;
          // }
        }
      }
    }
    else{
      icon = props.treeviewstyle === 'byloc' ||  props.treeviewstyle === 'bygroup';
    }

    const active = props.node.active;
    // const iconType = props.node.children ? 'folder' : 'file-text';
    // const iconClass = `fa fa-${iconType}`;
    // const iconStyle = {marginRight: '5px'};
    const treeseled = active ? "seled" : "";


    if(!icon){
      return (
          <div style={props.style.base}  className={treeseled}>
              <div style={props.style.title}>
                  {title}
              </div>
          </div>
      );
    }
    // let iconname = icon_online;
    let DeviceId = props.node.device.DeviceId;
    let deviceitem = props.g_devicesdb[DeviceId] || props.node.device;
    let SettingOfflineMinutes = get(props,'SettingOfflineMinutes',20);
    //icon_car1   严重警报
    //icon_car2   紧急警报
    //icon_car3   一般警报
    // if(parseInt(deviceitem.DeviceId)%3 === 1){ //报警数据判断
    //   iconname = icon_car2;
    // }
    // else if(parseInt(deviceitem.DeviceId)%3 === 2){ //报警数据判断
    //   iconname = icon_car3;
    // }
    // if(!getdevicestatus_isonline(deviceitem,SettingOfflineMinutes)){
    //   iconname = icon_offline;
    // }

    const {iconname,isonline} = getimageicon_isonline(deviceitem,SettingOfflineMinutes);
    //console.log(deviceitem);
    return (
        <div style={props.style.base}  className={treeseled}>
            <div style={props.style.title}>
                <div style={{
                    display: "-webkit-box;-ms-flexbox;flex;-webkit-flex",
                    alignItems: "center",
                }}>
                    <img alt="" src={iconname} style={{width: "20px",marginRight: "5px", marginLeft : "5px"}} />
                    {isonline?<span><b>{title}</b></span>:<span>{title}</span>}
                </div>
            </div>
        </div>
    );
  };

const mapStateToPropsHeaderCo = ({device:{gmap_acode_treename,gmap_acode_treecount,g_devicesdb},app:{SettingOfflineMinutes}}) => {
  return {gmap_acode_treename,gmap_acode_treecount,g_devicesdb,SettingOfflineMinutes};
}


export default connect(mapStateToPropsHeaderCo)(HeaderCo);
