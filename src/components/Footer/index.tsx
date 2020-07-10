import React, { FC } from 'react';
import { Divider } from 'antd';
import './index.less';
import { EmailIcon } from '@/components/Icon';

interface FooterType {
  location: {
    pathname: string;
  };
}
const Footer: FC<FooterType> = ({ location }) => {
  return (
    <div className={`"footer" ${location.pathname}`}>
      <div>
        © 2020 kj&nbsp;|&nbsp;个人专属&nbsp;|&nbsp;Personal's Page — 阿娇
      </div>
    </div>
  );
};

export default Footer;
