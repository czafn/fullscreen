/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import styled from 'styled-components';

const Table = styled.table`
  width: 95%;
  padding: 0;
  th{
    width: 27%;
    background: #0c6da4;
    font-weight: 400;
    font-size: 13px;
    text-align: left;
    padding: 0 15px;
  }
  td{
    width: 27%;
    font-weight: 300;
    font-size: 13px;
    text-align: left;
    padding: 0 15px;
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
    }
  }
  th:nth-child(3),td:nth-child(3){
    width: 40%;
  }

`;


class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {listData} = this.props;
        return (
          <div >
            <Table cellSpacing="0" cellPadding="0" >
              <thead>
                <tr>
                  <th>编号</th>
                  <th>预警类型</th>
                  <th>更新时间</th>
                </tr>
              </thead>
              <tbody>
                {
                  lodashmap(listData,(obj,index)=>{
                    return (<tr key={index}>
                    <td>{obj.DeviceId}</td>
                    <td>{obj.type}</td>
                    <td>{obj.update_time}</td>
                  </tr>);
                  })
                }
              </tbody>
            </Table>
          </div>
        );
    }
}

const mapStateToProps = ({catlworking}) => {
    const listData = catlworking.warningf;
    // [
    //     {"update_time":"2017/11/18 04:26:00","DeviceId":"1727204012","type":"过压"},
    //     {"update_time":"2017/11/17 22:20:00","DeviceId":"1719100098","type":"过温"},
    //     {"update_time":"2017/11/17 22:04:00","DeviceId":"1627100777","type":"欠压"},
    //     {"update_time":"2017/11/18 10:03:00","DeviceId":"1724101290","type":"SOC不一致"},
    //     {"update_time":"2017/11/18 04:55:00","DeviceId":"1627100478","type":"SOC不一致"},
    //     {"update_time":"2017/11/20 09:56:00","DeviceId":"1724101531","type":"温度跳变"},
    //     {"update_time":"2017/11/20 10:06:00","DeviceId":"1724106076","type":"温度跳变"},
    //     {"update_time":"2017/11/20 01:37:00","DeviceId":"1719103339","type":"过压"}
    // ]
    return {listData};
}
export default connect(mapStateToProps)(Page);
