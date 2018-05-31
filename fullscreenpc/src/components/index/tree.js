/**
 * Created by jiaowenhui on 2017/7/28.
    底部点击展开菜单栏
 */
import React from 'react';
import {connect} from 'react-redux';
import Search from '../search/searchtree_device.js';
import { Tabs } from 'antd';

// import "../../css/antd.css";
import '../../css/treestyle.css';

import TreeByloc from '../trees/tree_byloc';
import TreeBygroup from '../trees/tree_bygroup';
import TreeBysearchresult from '../trees/tree_bysearchresult';
import {searchbatterylocal_request} from '../../actions';

const TabPane = Tabs.TabPane;
let resizetimetree = null;

class TreeExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height : window.innerHeight+290
        };
    }

    onFilterMouseUp(e) {
        const filter = e.target.value.trim();
        if(!!filter){
          if(filter.length <= 3){
            return;
          }
        }
        // this.props.dispatch(md_ui_settreefilter({inputtreevalue:filter}));
    }
    onClickQuery =(query)=>{
      this.props.dispatch(searchbatterylocal_request(query));
      //SERACH LOCAL
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize=()=> {
        window.clearTimeout(resizetimetree);
        resizetimetree = window.setTimeout(()=>{
            this.setState({
                height: window.innerHeight+290
            });

        }, 10)
    }

    render(){
        const {modeview} = this.props;

        return (
            <div className="treePage" >
                <div className="treehead">
                    地理位置
                </div>

                {
                    modeview === 'device' &&
                    <Tabs
                        defaultActiveKey="1"
                        style={{ height: `870px`}}
                        tabBarStyle={{width : "350px"}}
                        className="treetabs"
                        >
                        <TabPane tab="地址位置" key="1">
                            <TreeByloc />
                        </TabPane>
                        <TabPane tab="分组" key="2">
                            <TreeBygroup />
                        </TabPane>
                        <TabPane tab="搜索" key="3">
                            <Search onClickQuery={this.onClickQuery}/>
                            <TreeBysearchresult/>
                        </TabPane>
                    </Tabs>
                }
                {
                    modeview !== 'device' &&
                    <div style={{    height: '870px',overflowY: 'auto'}}>
                        <TreeByloc />
                    </div>

                }
            </div>
        );
    }
}

const mapStateToPropsTip = ({app}) => {
    const {modeview} = app;
    return { modeview };
}

export default connect(mapStateToPropsTip)(TreeExample);
