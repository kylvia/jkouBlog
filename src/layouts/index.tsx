import React, { Fragment, useEffect, useState } from 'react';
import Login from '@/pages/Login';
import { Layout } from 'antd';
import TopBar from '../components/TopBar';
const { Header, Footer, Sider, Content } = Layout;
import SysLyouts from './SysLyouts';
import { Dispatch } from 'redux';
import { connect } from 'umi';
import './index.less'

interface Greeting {
  children?: any,
  dispatch: Dispatch,
  location: {
    pathname: string
  };
}
const LayoutMain: React.FC<Greeting> = ({children, location, dispatch}) => {
  if (location.pathname === '/login') {
    return <div>{children}</div>
  }
  if (location.pathname === '/') {
    return <div>{children}</div>
  }
  if (location.pathname.toUpperCase().includes('BACKSYSTEM')) {
    return <SysLyouts children={children} location={location} />
  }

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };
  return (
    <Fragment>
      <Header><TopBar /></Header>
      <Layout>
        <div className="mainBox">{ children }</div>
      </Layout>
      <Footer>
        <div className="footer">
          © 2018 kj&nbsp;|&nbsp;个人专属&nbsp;|&nbsp;Personal's Page — 阿娇
        </div>
      </Footer>
    </Fragment>

  );
};

export default connect()(LayoutMain);
