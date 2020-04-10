import React, {FC} from 'react'
import { Divider } from 'antd'
import './index.less'
import { EmailIcon } from '@/components/Icon';

const Footer:FC = () => {
  return (<div className="footer">
    <div>
      © 2018 Liu Chi | Site words total count: 88.8k
      个人专属 |Personal's Page — Liu Chi
    </div>
  </div>)
}

export default Footer
