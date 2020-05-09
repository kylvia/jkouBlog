import React, { FC, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

const BackSystem: FC = () => {

  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = () => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  };
  return (<div>
    aaa
  </div>);
};

export default BackSystem;
