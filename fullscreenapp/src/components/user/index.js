/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';

import Avatar from '../../img/19.png';
import {List, ListItem} from 'material-ui/List';
import Settingicon from '../../img/20.png';
import Users from '../../img/21.png';
import Rightlnk from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import {ui_menuclick_logout}  from '../../actions';
import config from '../../env/config';


class Page extends React.Component {

    render() {
        const {username,avatar} = this.props;
        let avatarurl = avatar || Avatar;
        return (
            <div className="usercenterPage AppPage"
                style={{height : `${window.innerHeight}px`,overflow: "hidden",paddingBottom:"0"}}
                >
                <div className="navhead">
                    <div className="back" onClick={()=>{this.props.history.goBack()}}></div>
                    <span className="title" style={{paddingRight : "30px"}}>帐号</span>
                </div>
                <div className="content">
                    <div className="head">
                        <img src={avatarurl} alt=""/>
                        <div className="username">
                            <span>用户名</span>
                            <span>{username}</span>
                        </div>
                        <span className="changepwd" onClick={()=>{this.props.history.push("/changepwd")}}>修改密码</span>
                    </div>
                    <List style={{background: "#FFF",padding:"0"}}>
                        {/*<ListItem*/}
                            {/*primaryText="报警推送设置"*/}
                            {/*leftIcon={<img src={Settingicon}  alt=""/>}*/}
                            {/*rightIcon={<Rightlnk />}*/}
                            {/*style={{marginBottom: "1px"}}*/}
                            {/*onClick={()=>{this.props.history.push("/settings")}}*/}
                            {/*/>*/}
                            {/*<div style={{height:"1px",width : "100%", background:"#EEE"}}></div>*/}
                        <ListItem
                            primaryText={`${config.appversion}`}
                            leftIcon={<img src={Users}  alt=""/>}
                            style={{background : "#FFF"}}
                            onClick={()=>{}}
                            />
                    </List>
                    <div className="loginout" onClick={
                      ()=>{
                        this.props.dispatch(ui_menuclick_logout());
                      }
                    }>退出登录</div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = ({userlogin}) => {
   const {username,role,avatar} = userlogin;
   return {username,role,avatar};
}
export default connect(mapStateToProps)(Page);
