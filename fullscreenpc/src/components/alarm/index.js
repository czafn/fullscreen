/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import lodashmap from 'lodash.map';
import './alarm.css';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {listData} = this.props;
        return (
          <div>
            <table cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  <th>RBD</th>
                  <th>报警时间</th>
                  <th>报警等级</th>
                </tr>
              </thead>
              <tbody>
                {
                  lodashmap(listData,(obj,index)=>{
                    let td;
                    if(obj.type === '一级'){
                      td = <td>{obj.type} <span><img src="alarm/error02.png" alt=""></img></span></td>
                    }
                    else if(obj.type === '二级'){
                      td = <td>{obj.type} <span><img src="alarm/warning.png" alt=""></img></span></td>
                    }
                    else{
                      td = <td>{obj.type} <span><img src="alarm/warning5.png" alt=""></img></span></td>
                    }
                    return (<tr key={index}>
                    <td>{obj.RBD}</td>
                    <td>{obj.update_time}</td>
                    {td}
                  </tr>);
                  })
                }
              </tbody>
            </table>
          </div>
        );
    }
}

const mapStateToProps = ({}) => {
    const listData =
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
    return {listData};
}
export default connect(mapStateToProps)(Page);
