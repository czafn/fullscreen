/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import {
    carmapshow_createmap,
    carmapshow_destorymap,
} from '../../actions';
const divmapid = 'mapmain';

let resizetimemap = null;

class MapPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height : this.props.height || window.innerHeight-64
        };
    }
    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        this.props.dispatch(carmapshow_createmap({divmapid}));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
        this.props.dispatch(carmapshow_destorymap({divmapid}));
    }

    onWindowResize=()=> {
        window.clearTimeout(resizetimemap);
        resizetimemap = window.setTimeout(()=>{
            this.setState({
                height: this.props.height || window.innerHeight-64
            });

        }, 10)
    }
    render() {
        return (
            <div className="AdminContent">
                <div id={divmapid} style={{height:`918px`}}/>
            </div>
        );
    }
}
export default connect()(MapPage);
