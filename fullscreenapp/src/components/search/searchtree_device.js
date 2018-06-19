/**
 * Created by jiaowenhui on 2017/7/28.
    底部点击展开菜单栏
 */
import React from 'react';
import {connect} from 'react-redux';
// import {Treebeard} from 'react-treebeard';
import map from 'lodash.map';
// import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
import { Input, Select, AutoComplete, Button } from 'antd';
import TreeSelectBygroup from "../trees/treeselect_bygroup.js";
import TreeselectByloc from "../trees/treeselect_byloc.js";
import {getPackNo_BMU} from '../../util';
// import moment from 'moment';
import filter from 'lodash.filter';

import {
    set_treesearchlist
} from '../../actions';




const InputGroup = Input.Group;
const Option = Select.Option;
const selitem_devicefields = [
  {
    value:'RdbNo',
    text:'RDB编号'
  },
  {
    value:'PackNo',
    text:'BMU PACK号'
  },
  {
    value:'PnNo',
    text:'车辆PN料号'
  },
];
const selitem_alarmfields = [
  {
    value:'ALARM_H',
    text:'警告代码'
  },
  {
    value:'ALARM_L',
    text:'故障代码'
  },
];

class TreeSearchBattery extends React.Component {


    componentWillMount(){
      const {g_devicesdb} = this.props;
      let deviceidlist = [];
      map(g_devicesdb,(item)=>{
          deviceidlist.push(item.DeviceId);
      });
      // let optionsarr=[];

      if (!!deviceidlist) {
        if(deviceidlist.length>100){
          deviceidlist.length=100;
        }
      }
      // //console.log(deviceidlist);
      this.props.dispatch(set_treesearchlist(deviceidlist));
    }

    constructor(props) {
        super(props);
        this.state = {
          notype:  '',
          notypevalue : '',
          alarmtype : '',
          alarmtypevalue:'',
          alarmlevel:'-1',
          groupid:'0',
          adcode:10000,
          onlinestatus:'all',
          deviceid:''
        };
    }
    onSelTreeNode_Group(groupid){
      this.setState({groupid});
    }
    onSelTreeNode_Loc(adcode){
      this.setState({adcode});
    }
    onChange_deviceid(deviceid){
        this.setState({deviceid});
    }
    onChange_onlinestatus(onlinestatus){
        this.setState({onlinestatus});
    }
    onChange_alarmlevel(alarmlevel){
      this.setState({alarmlevel});
    }
    onChange_notype(notype){
      this.setState({notype});
    }
    onChange_alarmtype(alarmtype){
      this.setState({alarmtype});
    }
    handleChange_notypevalue(notypevalue){
        this.setState({notypevalue});
    }
    handleChange_alarmtypevalue(alarmtypevalue){
        this.setState({alarmtypevalue});
    }

    onChange=(e)=>{
      let value = e.target.value;

      const {g_devicesdb} = this.props;
      let deviceidlist = [];
      map(g_devicesdb,(item)=>{
          if(!!item.DeviceId){
            deviceidlist.push(item.DeviceId);
          }
          else{
            console.log(item);
          }
      });
      let optionsarr=[];

      if (!!deviceidlist) {
        optionsarr = filter(deviceidlist,function(o,index) {
          const deviceItem = g_devicesdb[o];
          if(!!o){
             if(o.indexOf(value)!==-1){
               return true;
             };
          }
          const PackNo_BMU = getPackNo_BMU(deviceItem);
          if(PackNo_BMU !== ''){
             if(PackNo_BMU.indexOf(value)!==-1){
               return true;
             }
          }
          return false;
        })
        if(optionsarr.length > 100){
          optionsarr.length = 100;
        }
      }
      this.props.dispatch(set_treesearchlist(optionsarr));
    }

    onClickQuery=()=>{
      let query = {};

      if(this.state.groupid !== '0'){
        query['groupid'] = this.state.groupid;
      }
      if(this.state.adcode !== 10000){
        query['adcode'] = this.state.adcode;
      }
      if(this.state.adcode !== ''){
        query['deviceid'] = this.state.deviceid;
      }

      // if(this.state.notype!== '' && this.state.notypevalue!=''){
      //   query.querydevice[this.state.notype] = this.state.notypevalue;
      // }
      // if(this.state.alarmtype!== '' && this.state.alarmtypevalue!=''){
      //   query.querydevice[this.state.alarmtype] = this.state.alarmtypevalue;
      // }
      //
      // if(this.state.alarmlevel !== '-1'){
      //   query.queryalarm['warninglevel'] = parseInt(this.state.alarmlevel);
      // }
      //
      // if(this.state.onlinestatus !== 'all'){
      //   query.querydevice['onlinestatus'] = this.state.onlinestatus;
      // }
      //console.log(`【searchtree】查询条件:${JSON.stringify(query)}`);
      if(!!this.props.onClickQuery){
        this.props.onClickQuery({query});
      }
    }
    render(){
        return (
            <div className="searchtree" style={{textAlign: "center"}}>
                    <br/>
                    <Input
                        name="searchkey" id="searchkey" placeholder="请输入车辆ID或PACK号" style={{width: "320px"}}
                        onChange={this.onChange}
                    />

                    <div style={{display: "none"}}>

                      <TreeSelectBygroup placeholder={"请选择分组"} width={370} onSelTreeNode={this.onSelTreeNode_Group.bind(this)}/>
                      <div style={{display:"none"}} >
                        <TreeselectByloc placeholder={"请选择地区"} width={370} onSelTreeNode={this.onSelTreeNode_Loc.bind(this)}/>
                      </div>



                      <AutoComplete
                              style={{ width: 370,display: "none" }}
                              onChange={this.onChange_deviceid.bind(this)}
                              placeholder="请输入编号"
                          />



                          <div style={{display:"none"}}>
                            <InputGroup compact>
                              <Select
                                defaultValue="选择编号类型"
                                style={{ width: 120 }}
                                onChange={this.onChange_notype.bind(this)}
                                >
                                {
                                    map(selitem_devicefields,(field,key)=>{
                                        return (<Option key={key} value={field.value}>{field.text}</Option>)
                                    })
                                }
                              </Select>
                              <AutoComplete
                                style={{ width: 250 }}
                                onChange={this.handleChange_notypevalue.bind(this)}
                                placeholder="请输入编号"
                              />
                            </InputGroup>

                      <InputGroup compact>
                          <Select defaultValue="选择代码类型" style={{ width: 120 }}  onChange={this.onChange_alarmtype.bind(this)}>
                              {
                                  map(selitem_alarmfields,(field,key)=>{
                                    return (<Option key={key} value={field.value}>{field.text}</Option>)
                                  })
                              }
                          </Select>
                          <AutoComplete
                              style={{ width: 250 }}
                              placeholder="请输入代码"
                              onChange={this.handleChange_alarmtypevalue.bind(this)}
                          />
                      </InputGroup>

                      <Select className="Selectalarmlevel" defaultValue={'-1'}  style={{ width: 370 }} onChange={this.onChange_alarmlevel.bind(this)}>
                          <Option value={"-1"}>选择报警等级</Option>
                          <Option value={"0"} >三级</Option>
                          <Option value={"1"} >二级</Option>
                          <Option value={"2"} >一级</Option>
                      </Select>

                      <Select defaultValue={"是否在线"} style={{ width: 370 }}  onChange={this.onChange_onlinestatus.bind(this)}>
                          <Option value="all" >全部</Option>
                          <Option value="online" >在线</Option>
                          <Option value="offline" >离线</Option>
                      </Select>
                      </div>

                      <Button type="primary" icon="search"  onClick={this.onClickQuery} style={{width: "370px"}}>查询</Button>
                    </div>
            </div>

        );
    }
}

const mapStateToPropsSelectDevice = ({device}) => {
    const {g_devicesdb} = device;
    return {g_devicesdb};
}

export default connect(mapStateToPropsSelectDevice)(TreeSearchBattery);
