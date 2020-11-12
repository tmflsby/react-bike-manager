import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import MenuConfig from "../../config/menuConfig";
import "./index.less";

class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTreeNode: this.renderMenu(MenuConfig)
    };
    this.renderMenu = this.renderMenu.bind(this);
  }


  // 菜单渲染
  renderMenu(data) {
    return (
      // 递归遍历是否含有子菜单
      data.map(item => {
        if (item.children) {
          return (
            <Menu.SubMenu title={item.title} key={item.key}>
              {this.renderMenu(item.children)}
            </Menu.SubMenu>
          )
        }
        return (
          <Menu.Item title={item.title} key={item.key}>
            <NavLink to={item.key}>{item.title}</NavLink>
          </Menu.Item>
        )
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
