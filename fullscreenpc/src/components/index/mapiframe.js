/**`
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
// import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

import AdminContent from "./map";
import Tree from "./tree";

import {
    ui_showmenu,
} from '../../actions';

// let resizetime = null;
let resizetimecontent = null;
// this.props.dispatch(ui_showmenu(menuitemstring));

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerWidth : window.innerWidth,
            innerHeight : window.innerHeight,
            openaddress : false,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize=()=> {
        window.clearTimeout(resizetimecontent);
        resizetimecontent = window.setTimeout(()=>{
            this.setState({
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
            });

        }, 10)
    }
    menuevent = () => this.props.dispatch(ui_showmenu(""));

    getdrawstyle=(width)=>{
        return ({
            drawopenstyle : {
                marginLeft: 0,
                order: -1,
                transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                zIndex: 100
            },
            drawclosestyle : {
                marginLeft: `-${width}`,
                order: -1,
                transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                zIndex: 100
            },
        })
    }


    render() {
        const {showmenu} = this.props;
        const treestyle = this.getdrawstyle("350px");
        return (
            <div className="AppPage" id="AppPage" style={{height : `958px`}}>
                <div className="content">
                    <div className="bodycontainer" style={{height: `958px`}}>
                        <div className="admincontainer">
                            <AdminContent />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({app:{showmenu}}) => {
    return {showmenu};
};


export default connect(mapStateToProps)(Page);
