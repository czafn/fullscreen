import React from 'react';
import {connect} from 'react-redux';
import {decorators} from '../controls/react-treebeard-ex/src/index.js';
// import treestyle from './treestyle.js';
import HeaderCo from './treeheader';
import map from 'lodash.map';
import {
    ui_selcurdevice_request,
} from '../../actions';
import {getimageicon_isonline} from '../../sagas/getmapstyle';
import {getPackNo_BMU} from '../../util';
// const treeviewstyle = 'bysearchresult';
decorators.Header = HeaderCo;

class Tree extends React.Component {
    // constructor(props){
    //     // super(props);
    //     // this.state = {};
    //     // this.onToggle = this.onToggle.bind(this);
    // }

    // onToggle(node, toggled){
    //     // if(this.state.cursor){this.state.cursor.active = false;}
    //     // node.active = true;
    //     // if(node.type === 'device'){
    //     //   let deviceid = node.name;
    //     //   const {g_devicesdb} = this.props;
    //     //   const deviceitem = g_devicesdb[deviceid];
    //     //   if(!!deviceitem){
    //     //     //console.log(`sel devid:${deviceitem.DeviceId}`);
    //     //     this.props.dispatch(ui_selcurdevice_request({DeviceId:deviceitem.DeviceId,deviceitem}));
    //     //   }
    //     // }
    //     // this.setState({ cursor: node });
    // }
    onclick(id){
        this.props.dispatch(ui_selcurdevice_request({DeviceId:id,src:'tree_bysearchresult'}));
    }
    render(){
        const {treesearchlist,g_devicesdb,SettingOfflineMinutes} = this.props;

        return (
          <div className="treesearchlist">
            {
              map(treesearchlist, (id, key)=>{
                const deviceitem = g_devicesdb[id];
                let value = id;
                const PackNo_BMU = getPackNo_BMU(deviceitem);
                if(PackNo_BMU !== ''){
                  value = `${id}(${PackNo_BMU})`;
                }
                const {iconname,isonline} = getimageicon_isonline(deviceitem,SettingOfflineMinutes);
                return <div key={key} onClick={this.onclick.bind(this, id)}>
                  <img alt="" src={iconname} style={{width: "20px",marginRight: "5px",marginLeft: "20px"}} />
                  {isonline?(<span><strong>{value}</strong></span>):(<span>{value}</span>)}
                </div>
              })
            }
          </div>
      );
  }
}

const mapStateToProps = ({device:{treesearchlist,g_devicesdb},app:{SettingOfflineMinutes}}) => {
  return {treesearchlist,g_devicesdb,SettingOfflineMinutes};
}

export default connect(mapStateToProps)(Tree);
