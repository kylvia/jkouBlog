import React, { Fragment, useState } from 'react';
import Login from '@/pages/Login';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './index.less'

interface Greeting {
  children: any,
  location: {
    pathname: string
  };
}

const LayoutMain: React.FC<Greeting> = (props) => {
  if (props.location.pathname === '/login') {
    return <Login />
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
        <div className="mainBox">{ props.children }</div>
      </Layout>
      <Footer>
        <div className="footer">
          © 2018 Liu Chi | Site words total count: 88.8k
          个人专属 |Personal's Page — Liu Chi
        </div>
      </Footer>
    </Fragment>

  );
};

export default LayoutMain;
