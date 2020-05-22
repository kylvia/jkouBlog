import React, {FC, useState, useEffect} from 'react'
import { MenuOutlined, MailOutlined, GithubOutlined, WechatOutlined, QqOutlined } from "@ant-design/icons";
import { Drawer, Popover } from 'antd'
import './index.less'
import { history, Link, connect } from 'umi';
import { QuillPenIcon, ManagementIcon } from '@/components/Icon';
import { HomeOutlined, BarsOutlined, SmileOutlined } from '@ant-design/icons';
import head from '@/images/head.jpeg';
import wx from '@/images/wx.jpg';
import qq from "@/images/qq.jpg";

const menus = [
  {path: '/home', name: '首页', icon: <HomeOutlined className="menuIcon" />},
  {path: '/tags', name: '分类', icon: <BarsOutlined className="menuIcon" />},
  {path: '/about', name: '关于', icon: <SmileOutlined className="menuIcon" />},
]
const TopBar:FC = () => {
  const [visible, setVisible] = useState(false)
  const [userInfo, setUserInfo] = useState<Partial<{
    username: string
    intro: string
    email: string
  }>>({})

  useEffect(() => {
    let readLS:string|null = localStorage.getItem('userInfo');
    setUserInfo(readLS ? JSON.parse(readLS) : {})
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
            <p className="username">{userInfo.username || ''}</p>
            <pre className="intro">{userInfo.intro || ''}</pre>
            <p></p>
          </div>
          {
            menus.map(item => <p key={item.path} className="drawerRow"><a className="drawerLink" onClick={() => toLink(item.path)}>{item.icon}{item.name}</a></p>)
          }
          <div className="blogInfo blogInfo1">
            <p><MailOutlined className="icon" style={{color: "#C74245"}} />{userInfo.email || ''}</p>
            <p>
              <a href="https://github.com/kylvia" target="_blank"><GithubOutlined style={{color: "#78CC72"}} className="icon" /></a>
              <Popover placement="bottom" content={<img className="qrcode" src={wx} alt=""/>}>
                <WechatOutlined style={{color: "#D8BA53"}} className="icon" />
              </Popover>
              <Popover placement="bottom" content={<img className="qrcode" src={qq} alt=""/>}>
                <QqOutlined style={{color: "#CD72A4"}} className="icon" />
              </Popover>
            </p>
          </div>
        </Drawer>
      </div>
    </div>
    <div className="cTitle"><Link className="goHome" to="/">Joynce</Link></div>
    {localStorage.getItem('isLogin') && <div className="rTool">
      <div className="toolBarItem"><QuillPenIcon className="icon" /><Link className="toolBarItemLink" to="/blog">写博客</Link></div>
      <div className="toolBarItem"><ManagementIcon className="icon" /><Link className="toolBarItemLink" to="/backSystem">管理系统</Link></div>
    </div> || ''}
  </div>)
}

export default connect()(TopBar)
