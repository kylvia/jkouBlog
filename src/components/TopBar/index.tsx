import React, {FC, useState, useEffect} from 'react'
import { MenuOutlined, MailOutlined, GithubOutlined, WechatOutlined, QqOutlined } from "@ant-design/icons";
import { Drawer, Popover } from 'antd'
import './index.less'
import { history, Link, connect } from 'umi';
import { QuillPenIcon, ManagementIcon } from '@/components/Icon';
import head from '@/images/head.jpeg';
import wx from '@/images/wx.jpg';
import qq from '@/images/qq.jpg';

const menus = [
  {path: '/home', name: '首页'},
  {path: '/tags', name: '分类'},
  {path: '/about', name: '关于'},
]
const TopBar:FC = () => {
  const [visible, setVisible] = useState(false)
  const [userInfo, setUserInfo] = useState(false)

  useEffect(() => {
    console.log(123)
    setUserInfo(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '')
  }, [localStorage.getItem('userInfo')])
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
          <div className="blogInfo">
            <div className="head"><img src={head} alt=""/></div>
            <p>{userInfo.username || ''}</p>
            <p>{userInfo.intro || ''}</p>
            <p></p>
          </div>
          {
            menus.map(item => <p key={item.path} className="drawerRow"><a className="drawerLink" onClick={() => toLink(item.path)}>{item.name}</a></p>)
          }
          <div className="blogInfo blogInfo1">
            <p><MailOutlined className="icon" />{userInfo.email || ''}</p>
            <p>
              <a href="https://github.com/kylvia" target="_blank"><GithubOutlined className="icon" /></a>
              <Popover placement="bottom" content={<img className="qrcode" src={wx} alt=""/>}>
                <WechatOutlined className="icon" />
              </Popover>
              <Popover placement="bottom" content={<img className="qrcode" src={qq} alt=""/>}>
                <QqOutlined className="icon" />
              </Popover>
            </p>
          </div>
        </Drawer>
      </div>
    </div>
    <div className="cTitle">fhasdfh</div>
    {localStorage.getItem('isLogin') && <div className="rTool">
      <div className="toolBarItem"><QuillPenIcon className="icon" /><Link className="toolBarItemLink" to="/blog">写博客</Link></div>
      <div className="toolBarItem"><ManagementIcon className="icon" /><Link className="toolBarItemLink" to="/backSystem">管理系统</Link></div>
    </div> || ''}
  </div>)
}

export default connect()(TopBar)
