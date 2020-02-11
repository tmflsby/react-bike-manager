import React, { Component, Fragment } from "react";
import { Menu } from "antd";
import MenuConfig from "../../config/menuConfig";
import "./index.less";

const SubMenu = Menu.SubMenu; // 子菜单

class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.renderMenu = this.renderMenu.bind(this);
    const menuTreeNode = this.renderMenu(MenuConfig);
    this.state = {
      menuTreeNode
    };
  }


  // 菜单渲染
  renderMenu(data) {
    return (
      data.map(item => {
        if (item.children) { // 递归遍历是否含有子菜单
          return (
            <SubMenu title={item.title} key={item.key}>
              {this.renderMenu(item.children)}
            </SubMenu>
          )
        }
        return <Menu.Item title={item.title} key={item.key}>{item.title}</Menu.Item>
      })
    )
  }

  render() {
    return (
      <Fragment>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>Imooc MS</h1>
        </div>
        <Menu theme='dark'>
          {this.state.menuTreeNode}
        </Menu>
      </Fragment>
    );
  }
}

export default NavLeft;
