import React, { Fragment, useState } from 'react';
import Login from '@/pages/Login';
import TopBar from '../components/TopBar';
// import './index.less'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { history } from 'umi';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const menus = [
  {
  name: '个人主页',
  pathname: 'user',
  children: [
    {name: '个人资料',pathname: 'personalPage'},
    {name: '安全配置',pathname: 'security'},
    {name: '我的留言',pathname: 'message'},
    {name: '我的评论',pathname: 'comment'},
    {name: '博客评论',pathname: 'blogComment'}
  ]
  },
  {
    name: '网站后台',
    pathname: 'articleManagement',
    children: [
      {name: '网站信息',pathname: 'webInfo'},
      {name: '用户管理',pathname: 'user'},
      {name: '博客管理',pathname: 'blog'},
    ],
}]
interface Greeting {
  children?: any,
  location: {
    pathname: string
  };
}

const LayoutMain: React.FC<Greeting> = ({children}) => {
  const [breadcrumb, setBreadcrumb] = useState()
  const toPage = (e) => {
    setBreadcrumb(e.item.props.breadcrumbname)
    history.push(e.key);
  }
  return (
    <Fragment>
      <Header><TopBar /></Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['personalPage']}
            defaultOpenKeys={['user', 'articleManagement']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {menus.map(item => {
              if(item.children){
                return <SubMenu
                  key={item.pathname}
                  title={
                    <span>
                      <UserOutlined />
                      {item.name}
                    </span>
                  }>
                  {
                    item.children.map(i => <Menu.Item onClick={toPage} key={`/backSystem/${item.pathname}/${i.pathname}`} breadcrumbname={`${item.name} / ${i.name}`}>{i.name}</Menu.Item>)
                  }
                </SubMenu>
              }
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Fragment>

  );
};

export default LayoutMain;
