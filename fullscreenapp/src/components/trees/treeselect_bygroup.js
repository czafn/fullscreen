import React from 'react';
import {connect} from 'react-redux';
import { TreeSelect } from 'antd';
import map from 'lodash.map';
const TreeNode = TreeSelect.TreeNode;

class Treeselect extends React.Component {
  state = {
    value: undefined,
  }
  onChange = (value) => {
    //console.log(arguments);
    this.setState({ value });
    let groupid = value;
    this.props.onSelTreeNode(groupid);
  }
  render() {
    const {datatree} = this.props;
    const renderComponentFromNode = (datatreenode)=>{
      let hasChild = false;
      if(!!datatreenode.children){
        hasChild = datatreenode.children.length > 0 && (datatreenode.type !== 'group_leaf');
      }

      if(!hasChild){
        return <TreeNode value={datatreenode.id} title={datatreenode.name} key={datatreenode.id} />
      }
      return (
        <TreeNode value={datatreenode.id} title={datatreenode.name} key={datatreenode.id}  >
          {
            map(datatreenode.children,(node)=>{
               return renderComponentFromNode(node)
            })
          }
        </TreeNode>)
    };
    let treenoderoot = renderComponentFromNode(datatree);
    return (
      <TreeSelect
        showSearch
        style={{ width: this.props.width }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder={this.props.placeholder}
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        {
           treenoderoot
        }
      </TreeSelect>
    );
  }
}

const mapStateToProps = ({device:{datatreegroup:datatree}}) => {
  return {datatree};
}

export default connect(mapStateToProps)(Treeselect);
