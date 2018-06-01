/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
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

    render() {
        const {level1_ListData, level2_ListData, level3_ListData} = this.props;
        return (
          <div >
              <Carousel autoplay autoplaySpeed={10000}>
                  <div>
                      <Table cellSpacing="0" cellPadding="0" >
                          <thead>
                          <tr>
                              <th>RBD</th>
                              <th>报警时间</th>
                              <th>报警等级</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                              lodashmap(level1_ListData,(obj,index)=>{
                                  let td;
                                  if(obj.type === '一级'){
                                      td = <td><span>{obj.type}</span> <span><img src="alarm/error02.png" alt=""></img></span></td>
                                  }
                                  else if(obj.type === '二级'){
                                      td = <td><span>{obj.type} </span> <span><img src="alarm/warning.png" alt=""></img></span></td>
                                  }
                                  else{
                                      td = <td><span>{obj.type} </span> <span><img src="alarm/warning5.png" alt=""></img></span></td>
                                  }
                                  return (<tr key={index}>
                                      <td>{obj.RBD}</td>
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
                              <th>RBD</th>
                              <th>报警时间</th>
                              <th>报警等级</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                              lodashmap(level2_ListData,(obj,index)=>{
                                  let td;
                                  if(obj.type === '一级'){
                                      td = <td><span>{obj.type}</span> <span> <img src="alarm/error02.png" alt=""></img></span></td>
                                  }
                                  else if(obj.type === '二级'){
                                      td = <td><span>{obj.type}</span> <span> <img src="alarm/warning.png" alt=""></img></span></td>
                                  }
                                  else{
                                      td = <td><span>{obj.type}</span> <span> <img src="alarm/warning5.png" alt=""></img></span></td>
                                  }
                                  return (<tr key={index}>
                                      <td>{obj.RBD}</td>
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
                              <th>RBD</th>
                              <th>报警时间</th>
                              <th>报警等级</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                              lodashmap(level3_ListData,(obj,index)=>{
                                  let td;
                                  if(obj.type === '一级'){
                                      td = <td><span>{obj.type}</span> <span><img src="alarm/error02.png" alt=""></img></span></td>
                                  }
                                  else if(obj.type === '二级'){
                                      td = <td><span>{obj.type}</span> <span><img src="alarm/warning.png" alt=""></img></span></td>
                                  }
                                  else{
                                      td = <td><span>{obj.type}</span> <span><img src="alarm/warning5.png" alt=""></img></span></td>
                                  }
                                  return (<tr key={index}>
                                      <td>{obj.RBD}</td>
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

const mapStateToProps = ({}) => {
    const level1_ListData =
        [
          {"update_time":"2017/11/18 04:26:00","RBD":"1727204012","type":"一级"},
          {"update_time":"2017/11/17 22:20:00","RBD":"1719100098","type":"一级"},
          {"update_time":"2017/11/17 22:04:00","RBD":"1627100777","type":"一级"},
          {"update_time":"2017/11/18 10:01:00","RBD":"1702101873","type":"一级"},
          {"update_time":"2017/11/18 09:44:00","RBD":"1727210879","type":"一级"},
          {"update_time":"2017/11/18 09:50:00","RBD":"1719103955","type":"一级"},
          {"update_time":"2017/11/18 10:03:00","RBD":"1724101290","type":"一级"},
          {"update_time":"2017/11/18 04:55:00","RBD":"1627100478","type":"一级"}
        ]
    const level2_ListData =
        [
            {"update_time":"2017/11/18 04:26:00","RBD":"1727204012","type":"二级"},
            {"update_time":"2017/11/17 22:20:00","RBD":"1719100098","type":"二级"},
            {"update_time":"2017/11/17 22:04:00","RBD":"1627100777","type":"二级"},
            {"update_time":"2017/11/18 10:01:00","RBD":"1702101873","type":"二级"},
            {"update_time":"2017/11/18 09:44:00","RBD":"1727210879","type":"二级"},
            {"update_time":"2017/11/18 09:50:00","RBD":"1719103955","type":"二级"},
            {"update_time":"2017/11/18 10:03:00","RBD":"1724101290","type":"二级"},
            {"update_time":"2017/11/18 04:55:00","RBD":"1627100478","type":"二级"}
        ]
    const level3_ListData =
        [
            {"update_time":"2017/11/18 04:26:00","RBD":"1727204012","type":"三级"},
            {"update_time":"2017/11/17 22:20:00","RBD":"1719100098","type":"三级"},
            {"update_time":"2017/11/17 22:04:00","RBD":"1627100777","type":"三级"},
            {"update_time":"2017/11/18 10:01:00","RBD":"1702101873","type":"三级"},
            {"update_time":"2017/11/18 09:44:00","RBD":"1727210879","type":"三级"},
            {"update_time":"2017/11/18 09:50:00","RBD":"1719103955","type":"三级"},
            {"update_time":"2017/11/18 10:03:00","RBD":"1724101290","type":"三级"},
            {"update_time":"2017/11/18 04:55:00","RBD":"1627100478","type":"三级"}
        ]
    return {level1_ListData, level2_ListData, level3_ListData};
}
export default connect(mapStateToProps)(Page);
