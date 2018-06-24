/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';
import lodashsortby from 'lodash.sortby';
import lodashgroupby from 'lodash.groupby';
import lodashdropright from 'lodash.dropright';
import lodashreverse from 'lodash.reverse';

import styled from 'styled-components';

import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import './alarm.css';

const Table = styled.table`
  width: 100%;

  padding: 0;
  th{
    width: 30%;
    background: #0c6da4;
    font-size: 13px;
    font-weight: 400;
    text-align: left;
    padding: 0 15px;
  }
  td{
    width: 30%;
    font-weight: 300;
    font-size: 13px;
    text-align: left;
    padding: 0 15px;
  }
  td span{
    line-height:16px;
    float: left;
  }
  tbody{
    tr:nth-child(even){background:rgba(14, 63, 93, 0.69);}
  }
  tr{
    height: 23px;
    img{
        width: 16px;
        height: 16px;
        vertical-align: bottom;
        margin-left: 5px;
        float: left;
    }
  }
  th:nth-child(2),td:nth-child(2){
    width: 40%;
  }

`;


class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    timeTicket = null;

    componentDidMount() {

        this.timeTicket = setInterval(() => {
            this.nextAlarm()
        }, 10000);

    };
    componentWillUnmount() {
        if (this.timeTicket) {
            clearInterval(this.timeTicket);
        }
    };

    nextAlarm(){
        // debugger
        // this.refs.ddd
        this.refs.ddd.next();
    }

    render() {
        const {level1_ListData, level2_ListData, level3_ListData} = this.props;
        return (
          <div >
              <Carousel ref='ddd' >
                  <div>
                      <Table cellSpacing="0" cellPadding="0" >
                          <thead>
                          <tr>
                              <th>编号</th>
                              <th>报警时间</th>
                              <th>报警等级</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                              lodashmap(level3_ListData,(obj,index)=>{
                                  let td;
                                  if(obj.type === '一级'){
                                      td = <td><span style={{color:'#f6d06a'}}>{obj.type}</span> <span></span></td>
                                  }
                                  else if(obj.type === '二级'){
                                      td = <td><span style={{color:'#ed932f'}}>{obj.type} </span> <span></span></td>
                                  }
                                  else{
                                      td = <td><span style={{color:'#d31e25'}}>{obj.type} </span> <span></span></td>
                                  }
                                  return (<tr key={index}>
                                      <td>{obj.DeviceId}</td>
                                      <td>{obj.update_time}</td>
                                      {td}
                                  </tr>);
                              })
                          }
                          </tbody>
                      </Table>

                  </div>
                  <div>
                      <Table cellSpacing="0" cellPadding="0" >
                          <thead>
                          <tr>
                              <th>编号</th>
                              <th>报警时间</th>
                              <th>报警等级</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                              lodashmap(level2_ListData,(obj,index)=>{
                                  let td;
                                  if(obj.type === '一级'){
                                      td = <td><span style={{color:'#f6d06a'}}>{obj.type}</span> <span></span></td>
                                  }
                                  else if(obj.type === '二级'){
                                      td = <td><span style={{color:'#ed932f'}}>{obj.type} </span> <span></span></td>
                                  }
                                  else{
                                      td = <td><span style={{color:'#d31e25'}}>{obj.type} </span> <span></span></td>
                                  }
                                  return (<tr key={index}>
                                      <td>{obj.DeviceId}</td>
                                      <td>{obj.update_time}</td>
                                      {td}
                                  </tr>);
                              })
                          }
                          </tbody>
                      </Table>
                  </div>
                  <div>
                      <Table cellSpacing="0" cellPadding="0" >
                          <thead>
                          <tr>
                              <th>编号</th>
                              <th>报警时间</th>
                              <th>报警等级</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                              lodashmap(level1_ListData,(obj,index)=>{
                                  let td;
                                  if(obj.type === '一级'){
                                      td = <td><span style={{color:'#f6d06a'}}>{obj.type}</span> <span></span></td>
                                  }
                                  else if(obj.type === '二级'){
                                      td = <td><span style={{color:'#ed932f'}}>{obj.type} </span> <span></span></td>
                                  }
                                  else{
                                      td = <td><span style={{color:'#d31e25'}}>{obj.type} </span> <span></span></td>
                                  }
                                  return (<tr key={index}>
                                      <td>{obj.DeviceId}</td>
                                      <td>{obj.update_time}</td>
                                      {td}
                                  </tr>);
                              })
                          }
                          </tbody>
                      </Table>
                  </div>
              </Carousel>
          </div>
        );
    }
}

const mapStateToProps = ({device:{g_devicesdb}}) => {
  let device_all_alarms = [];
  lodashmap(g_devicesdb,(item)=>{
    let warninglevel = lodashget(item,'warninglevel','');
    if(warninglevel === '高' || warninglevel === '中' || warninglevel === '低'  ){
      let type = '';
      if(warninglevel === '高'){
        type = '三级';
      }
      else if(warninglevel === '中'){
        type = '二级';
      }
      else if(warninglevel === '低'){
        type= '一级';
      }
      device_all_alarms.push({
        update_time:lodashget(item,'LastRealtimeAlarm.DataTime',''),
        DeviceId:lodashget(item,'DeviceId',''),
        type,
      })
    }
  });
  device_all_alarms = lodashsortby(device_all_alarms, [(o)=> { return o.update_time; }]);
  device_all_alarms = lodashreverse(device_all_alarms);
  let retgroup = lodashgroupby(device_all_alarms,(o)=>{
    return o.type;
  });
  // console.log(retgroup);

  let level1_ListData = lodashget(retgroup,'一级',[]);
  let level2_ListData = lodashget(retgroup,'二级',[]);
  let level3_ListData = lodashget(retgroup,'三级',[]);
  const maxcount = 8;
  if(level1_ListData.length > maxcount){
    level1_ListData = lodashdropright(level1_ListData,level1_ListData.length - maxcount);
  }
  if(level2_ListData.length > maxcount){
    level2_ListData = lodashdropright(level2_ListData,level2_ListData.length - maxcount);
  }
  if(level3_ListData.length > maxcount){
    level3_ListData = lodashdropright(level3_ListData,level3_ListData.length - maxcount);
  }
    // const level1_ListData =
    //     [
    //       {"update_time":"2017/11/18 04:26:00","DeviceId":"1727204012","type":"一级"},
    //       {"update_time":"2017/11/17 22:20:00","DeviceId":"1719100098","type":"一级"},
    //       {"update_time":"2017/11/17 22:04:00","DeviceId":"1627100777","type":"一级"},
    //       {"update_time":"2017/11/18 10:01:00","DeviceId":"1702101873","type":"一级"},
    //       {"update_time":"2017/11/18 09:44:00","DeviceId":"1727210879","type":"一级"},
    //       {"update_time":"2017/11/18 09:50:00","DeviceId":"1719103955","type":"一级"},
    //       {"update_time":"2017/11/18 10:03:00","DeviceId":"1724101290","type":"一级"},
    //       {"update_time":"2017/11/18 04:55:00","DeviceId":"1627100478","type":"一级"}
    //     ]
    // const level2_ListData =
    //     [
    //         {"update_time":"2017/11/18 04:26:00","DeviceId":"1727204012","type":"二级"},
    //         {"update_time":"2017/11/17 22:20:00","DeviceId":"1719100098","type":"二级"},
    //         {"update_time":"2017/11/17 22:04:00","DeviceId":"1627100777","type":"二级"},
    //         {"update_time":"2017/11/18 10:01:00","DeviceId":"1702101873","type":"二级"},
    //         {"update_time":"2017/11/18 09:44:00","DeviceId":"1727210879","type":"二级"},
    //         {"update_time":"2017/11/18 09:50:00","DeviceId":"1719103955","type":"二级"},
    //         {"update_time":"2017/11/18 10:03:00","DeviceId":"1724101290","type":"二级"},
    //         {"update_time":"2017/11/18 04:55:00","DeviceId":"1627100478","type":"二级"}
    //     ]
    // const level3_ListData =
    //     [
    //         {"update_time":"2017/11/18 04:26:00","DeviceId":"1727204012","type":"三级"},
    //         {"update_time":"2017/11/17 22:20:00","DeviceId":"1719100098","type":"三级"},
    //         {"update_time":"2017/11/17 22:04:00","DeviceId":"1627100777","type":"三级"},
    //         {"update_time":"2017/11/18 10:01:00","DeviceId":"1702101873","type":"三级"},
    //         {"update_time":"2017/11/18 09:44:00","DeviceId":"1727210879","type":"三级"},
    //         {"update_time":"2017/11/18 09:50:00","DeviceId":"1719103955","type":"三级"},
    //         {"update_time":"2017/11/18 10:03:00","DeviceId":"1724101290","type":"三级"},
    //         {"update_time":"2017/11/18 04:55:00","DeviceId":"1627100478","type":"三级"}
    //     ]
    return {level1_ListData, level2_ListData, level3_ListData};
}
export default connect(mapStateToProps)(Page);
