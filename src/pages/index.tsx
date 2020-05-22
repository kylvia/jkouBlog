import React, { FC } from 'react';
import { Link } from 'umi';
import './index.less'
import banner from '@/images/banner.jpg'

const NewPage: FC = () => {
  return (<div className="indexPage">
    <img className="banner" src={banner} alt=""/>
    {/*<div className="indexBack">
      <img src={banner} alt=""/>
    </div>*/}
    <div className="indexMain">
      <p className="pageTitle animate__swing">阿娇的个人网站</p>
      <p className="pageSubTitle">Jiao's personal website</p>
      <p className="pageSubTitle">
        <Link className="goHome" to="/home">→ HOME</Link>
      </p>
    </div>
  </div>);
};

export default NewPage;
