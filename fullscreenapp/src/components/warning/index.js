/**
 * Created by zhangzp on 2018-05-29
 */
import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import styled from 'styled-components';
import { WhiteSpace} from 'antd-mobile';

const Table = styled.table`
  width: 100%;
  padding: 0;
  th{
    width: 25%;
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
    width: 25%;
    font-weight: 300;
    font-size: 14px;
    text-align: left;
    padding: 10px 10px;
    color: #5c6b77;
  }
  tbody{
    tr:nth-child(even){background: rgba(255, 255, 255, 0.5);}
  }
  tr{
    height: 23px;
    border-bottom: 1px solid #e9e9e9;
    img{
        width: 16px;
        height: 16px;
        vertical-align: bottom;
        margin-left: 5px;
    }
  }
  th:nth-child(3),td:nth-child(3){
    width: 48%;
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
            {/*<div className="crumbsTitle" style={{borderBottom: '0px solid #ccc'}}>预警信息</div>*/}
            <WhiteSpace size="lg" />
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
