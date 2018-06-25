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

import { Carousel, WhiteSpace} from 'antd-mobile';
import 'antd/dist/antd.css';
import './alarm.css';

const Table = styled.table`
  width: 100%;

  padding: 0;
  th{
    width: 30%;
    background: #3aa2ec;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    padding: 10px 10px;
    white-space: nowrap;
    color: #ffffff;
    font-weight: 600;

  }
  td{
    width: 30%;
    font-weight: 300;
    font-size: 14px;
    text-align: left;
    padding: 10px 10px;
    color: #5c6b77;
  }
  td span{
    line-height:16px;
    float: left;

  }
  tbody{
    tr:nth-child(even){background: rgba(255, 255, 255, 0.5);}
  }
  tr{
    height: 23px;
    border: 1px solid #e9e9e9;
    img{
        width: 16px;
        height: 16px;
        vertical-align: bottom;
        margin-left: 5px;
        float: left;
    }
  }
  th:nth-child(2),td:nth-child(2){
    width: 45%;
  }
  .slider-frame{
    ul{
      height:500px    
    }
  }
`;


class Page extends React.Component {
    constructor(props) {
        super(props);
      this.state = {
        autoplayInterval : 10
      }
    }

    // timeTicket = null;

    componentDidMount() {

        // this.timeTicket = setTimeout(() => {
        //
        // }, 100);

    };
    componentWillUnmount() {
        // if (this.timeTicket) {
        //     clearInterval(this.timeTicket);
        // }

    };
    handleChange() {

    }
    render() {
        const {level1_ListData, level2_ListData, level3_ListData} = this.props;
        return (
          <div style={{height: '100%',width:'100%'}}>
              {/*<div className="crumbsTitle" style={{borderBottom: '0px solid #ccc'}}>报警信息</div>*/}
              <WhiteSpace size="lg" />
              <Carousel style={{minHeight:'490px' ,height: '100px',width:'100%'}} infinite autoplay autoplayInterval={10000} >
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
                              return (<tr key={index}>
                                  <td>{obj.DeviceId}</td>
                                  <td>{obj.update_time}</td>
                                  <td><span style={{color:'#d31e25'}}>{obj.type} </span> <span></span></td>
                              </tr>);
                          })
                      }
                      </tbody>
                  </Table>
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
                              return (<tr key={index}>
                                  <td>{obj.DeviceId}</td>
                                  <td>{obj.update_time}</td>
                                  <td><span style={{color:'#ed932f'}}>{obj.type} </span> <span></span></td>
                              </tr>);
                          })
                      }
                      </tbody>
                  </Table>
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
                                  return (<tr key={index}>
                                      <td>{obj.DeviceId}</td>
                                      <td>{obj.update_time}</td>
                                      <td><span style={{color:'#f6d06a'}}>{obj.type}</span> <span></span></td>
                                  </tr>);
                              })
                          }
                          </tbody>
                      </Table>
              </Carousel>
          </div>
        );
    }
}

const mapStateToProps = ({catlworking:{alarm3,alarm2,alarm1}}) => {
  let level1_ListData = [];
  let level2_ListData = [];
  let level3_ListData = [
            // {"update_time":"2017/11/18 04:26:00","DeviceId":"1727204012","type":"三级"},
            // {"update_time":"2017/11/17 22:20:00","DeviceId":"1719100098","type":"三级"},
            // {"update_time":"2017/11/17 22:04:00","DeviceId":"1627100777","type":"三级"},
            // {"update_time":"2017/11/18 10:01:00","DeviceId":"1702101873","type":"三级"},
            // {"update_time":"2017/11/18 09:44:00","DeviceId":"1727210879","type":"三级"},
            // {"update_time":"2017/11/18 09:50:00","DeviceId":"1719103955","type":"三级"},
    ];
  lodashmap(alarm3,(item)=>{
    level3_ListData.push({
      update_time:lodashget(item,'LastRealtimeAlarm.DataTime',''),
      DeviceId:lodashget(item,'DeviceId',''),
      type:'三级',
    })
  });
  lodashmap(alarm2,(item)=>{
    level2_ListData.push({
      update_time:lodashget(item,'LastRealtimeAlarm.DataTime',''),
      DeviceId:lodashget(item,'DeviceId',''),
      type:'二级',
    })
  });
  lodashmap(alarm1,(item)=>{
    level1_ListData.push({
      update_time:lodashget(item,'LastRealtimeAlarm.DataTime',''),
      DeviceId:lodashget(item,'DeviceId',''),
      type:'一级',
    })
  });
  // let device_all_alarms = [];
  // lodashmap(g_devicesdb,(item)=>{
  //   let warninglevel = lodashget(item,'warninglevel','');
  //   if(warninglevel === '高' || warninglevel === '中' || warninglevel === '低'  ){
  //     let type = '';
  //     if(warninglevel === '高'){
  //       type = '三级';
  //     }
  //     else if(warninglevel === '中'){
  //       type = '二级';
  //     }
  //     else if(warninglevel === '低'){
  //       type= '一级';
  //     }
  //     device_all_alarms.push({
  //       update_time:lodashget(item,'LastRealtimeAlarm.DataTime',''),
  //       DeviceId:lodashget(item,'DeviceId',''),
  //       type,
  //     })
  //   }
  // });
  // device_all_alarms = lodashsortby(device_all_alarms, [(o)=> { return o.update_time; }]);
  // device_all_alarms = lodashreverse(device_all_alarms);
  // let retgroup = lodashgroupby(device_all_alarms,(o)=>{
  //   return o.type;
  // });
  // // console.log(retgroup);
  //
  // let level1_ListData = lodashget(retgroup,'一级',[]);
  // let level2_ListData = lodashget(retgroup,'二级',[]);
  // let level3_ListData = lodashget(retgroup,'三级',[]);
  // const maxcount = 8;
  // if(level1_ListData.length > maxcount){
  //   level1_ListData = lodashdropright(level1_ListData,level1_ListData.length - maxcount);
  // }
  // if(level2_ListData.length > maxcount){
  //   level2_ListData = lodashdropright(level2_ListData,level2_ListData.length - maxcount);
  // }
  // if(level3_ListData.length > maxcount){
  //   level3_ListData = lodashdropright(level3_ListData,level3_ListData.length - maxcount);
  // }
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
