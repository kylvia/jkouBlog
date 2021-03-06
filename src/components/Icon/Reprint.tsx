import React, { FC } from 'react';
import Icon from '@ant-design/icons';

const ReprintSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M96 864c-3.2 0-6.4 0-6.4 0C73.6 860.8 64 848 64 832c0-9.6-6.4-201.6 169.6-374.4 115.2-115.2 275.2-134.4 342.4-137.6L576 160c0-12.8 6.4-25.6 19.2-28.8s25.6-3.2 35.2 6.4l320 288c6.4 6.4 9.6 16 9.6 22.4s-3.2 19.2-9.6 22.4l-320 288c-9.6 9.6-22.4 9.6-35.2 6.4C582.4 761.6 576 748.8 576 736l0-160c-51.2 0-160 9.6-240 60.8-137.6 83.2-211.2 211.2-214.4 211.2C118.4 857.6 108.8 864 96 864zM598.4 384c-38.4 0-208 6.4-320 118.4-70.4 70.4-108.8 147.2-128 204.8 38.4-41.6 89.6-89.6 153.6-128 124.8-76.8 297.6-70.4 307.2-67.2 16 0 32 16 32 32l0 121.6 240-217.6L640 230.4 640 352c0 9.6-3.2 16-9.6 22.4C624 380.8 614.4 384 608 384 604.8 384 604.8 384 598.4 384z" p-id="8418" ></path>
  </svg>
);
const ReprintIcon:FC<any> = props => <Icon component={ReprintSvg} {...props} />;

export default ReprintIcon;
