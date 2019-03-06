import React, { Component } from "react";
import { Tree } from "antd";
import { data } from "../api";

const { TreeNode } = Tree;

class TreePage extends Component {
  onSelect = (selectedKeys, info) => {
  };

  onCheck = (checkedKeys, info) => {

    let nextKeys = [];

    if (checkedKeys.length > 3) {
      nextKeys = [...checkedKeys.splice(0, 3)];
    } else {
      nextKeys = [...checkedKeys];
    }
    const finallyKeys = nextKeys.map(item => +item.slice(-1));

    this.props.onChangeCheckbox(finallyKeys);

  };

  render() {
    const { clientId } = this.props;
    return (
      <Tree
        checkable
        defaultCheckedKeys={[`0-0-0-${clientId}`]}
        defaultExpandedKeys={["0-0-0", "0-0-1"]}
        // defaultSelectedKeys={['0-0-0', '0-0-1']}
        // defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
      >
        <TreeNode title="Вложение 1" key="0-0">
          <TreeNode title="Вложение 1-0" key="0-0-0">
            {data.map(item => {
              return <TreeNode title={item.name} key={`0-0-0-${item.id}`} />;
            })}
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}

export default TreePage;
