import React, { Component } from "react";
import {Card, Tabs, Icon, message } from "antd";
import "./ui.less"

class Tabses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panes: [
        {
          title: 'Tab 1',
          content: 'Tab 1',
          key: '1'
        },
        {
          title: 'Tab 2',
          content: 'Tab 2',
          key: '2'
        },
        {
          title: 'Tab 3',
          content: 'Tab 3',
          key: '3'
        },
        {
          title: 'Tab 4',
          content: 'Tab 4',
          key: '4'
        },
      ]
    };
    this.handleCallback = this.handleCallback.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.newTabIndex = 0;
  }

  componentDidMount() {
    this.setState({
      activeKey: this.state.panes[0].key
    });
  }

  render() {
    return (
      <div>
        <Card title='Tab页签' className='card-wrap'>
          <Tabs defaultActiveKey='1' onChange={this.handleCallback}>
            <Tabs.TabPane tab="Tab 1" key="1">Content of Tab Pane 1</Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2" disabled>Content of Tab Pane 2</Tabs.TabPane>
            <Tabs.TabPane tab="Tab 3" key="3">Content of Tab Pane 3</Tabs.TabPane>
          </Tabs>
        </Card>
        <Card title='Tab带图的页签' className='card-wrap'>
          <Tabs defaultActiveKey='1' onChange={this.handleCallback}>
            <Tabs.TabPane tab={<span><Icon type='plus'/> Tab 1</span>} key="1">Content of Tab Pane 1</Tabs.TabPane>
            <Tabs.TabPane tab={<span><Icon type='edit'/> Tab 2</span>} key="2">Content of Tab Pane 2</Tabs.TabPane>
            <Tabs.TabPane tab={<span><Icon type='delete'/> Tab 3</span>} key="3">Content of Tab Pane 3</Tabs.TabPane>
          </Tabs>
        </Card>
        <Card title='Tab可编辑的页签' className='card-wrap'>
          <Tabs type='editable-card' onChange={this.handleCallback}
                onChange={this.onChange} activeKey={this.state.activeKey}
                onEdit={this.onEdit}
          >
            {
              this.state.panes.map((panel) => {
                return <Tabs.TabPane tab={panel.title} key={panel.key}>{panel.content}</Tabs.TabPane>
              })
            }
          </Tabs>
        </Card>
      </div>
    );
  }

  handleCallback(key) {
    message.info('Hi, 您选择了页签：' + key)
  }

  onChange(activeKey) {
    this.setState({
      activeKey
    });
  }

  onEdit(targetKey, action) {
    this[action](targetKey);
  }

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };
}

export default Tabses;
