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
    this.setState({ value });
    let adcode = parseInt(value,10);
    this.props.onSelTreeNode(adcode);
  }
  render() {
    const {datatree,gmap_acode_treename} = this.props;
    const renderComponentFromNode = (datatreenode)=>{
      let hasChild = false;
      if(!!datatreenode.children){
        hasChild = datatreenode.children.length > 0 && (datatreenode.type !== 'group_area');
      }
      const adcode = ''+datatreenode.adcode;
      if(!hasChild){
        return <TreeNode value={adcode} title={gmap_acode_treename[datatreenode.adcode]} key={adcode} />
      }
      return (
        <TreeNode value={adcode} title={gmap_acode_treename[datatreenode.adcode]} key={adcode} >
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

const mapStateToProps = ({device:{datatreeloc:datatree,gmap_acode_treename}}) => {
  return {datatree,gmap_acode_treename};
}

export default connect(mapStateToProps)(Treeselect);
