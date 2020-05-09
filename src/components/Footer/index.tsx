import React, {FC} from 'react'
import { Divider } from 'antd'
import './index.less'
import { EmailIcon } from '@/components/Icon';

interface FooterType {
  location: {
    pathname: string
  }
}
const Footer:FC<FooterType> = ({ location }) => {
  return (<div className={`"footer" ${location.pathname}`}>
    <div>
      © 2018 Liu Chi | Site words total count: 88.8k
      个人专属 |Personal's Page — Liu Chi
    </div>
  </div>)
}

export default Footer
