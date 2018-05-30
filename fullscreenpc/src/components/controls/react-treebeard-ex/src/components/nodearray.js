import React from 'react';
import PropTypes from 'prop-types';
import TreeNode from './node.js';
import map from 'lodash.map';

class NodeArray extends React.Component {
    constructor(props) {
       super(props);
       this.state = { expanded: false };
       this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState({ expanded: !this.state.expanded });
    }
    render(){
      const {subnodes,animations, decorators: propDecorators, style,
        _eventBubbles,treeviewstyle,onToggle} = this.props;
      if(this.state.expanded){
        return (<div>
          {
            map(subnodes,(child,index)=>{
              return (<TreeNode {..._eventBubbles}
                    animations={animations}
                    decorators={propDecorators}
                    onToggle={onToggle}
                    key={child.id || index}
                    node={child}
                    style={style}
                    treeviewstyle={treeviewstyle}
                  />)
            })
          }
        </div>)
      }
      return (<div onClick={this.handleClick.bind(this)}>...</div>);
    }
}

NodeArray.propTypes = {
    subnodes:PropTypes.array.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
    _eventBubbles: PropTypes.object
};

export default NodeArray;
