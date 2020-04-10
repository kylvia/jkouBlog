import React, {FC, useState} from 'react'
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Drawer } from 'antd'
import './index.less'
import { history } from 'umi';

const menus = [
  {path: '/home', name: '首页'},
  {path: '/', name: '分类'},
  {path: '/about', name: '关于'},
]
const TopBar:FC = () => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };
  const toLink = (path: string) => {
    history.push(path)
    setVisible(false)
  };
  return (<div className="topBar">
    <div className="lMenu">
      <div>
        <MenuOutlined onClick={showDrawer} className="icon" />
        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          {
            menus.map(item => <p key={item.path} className="drawerRow"><a className="drawerLink" onClick={() => toLink(item.path)}>{item.name}</a></p>)
          }
        </Drawer>
      </div>
    </div>
    <div className="cTitle">fhasdfh</div>
    <div className="rTool"><SearchOutlined className="icon" /></div>
  </div>)
}

export default TopBar
