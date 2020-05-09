import React, { FC } from 'react';
import Icon from '@ant-design/icons';

const ManagementSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M796.1 370.11h72.56a15.5 15.5 0 0 0 15.5-15.5V214.42a5.25 5.25 0 0 0-1.54-3.75c-13-12.72-28.46-3.75-28.46 8.84v115.43a5.17 5.17 0 0 1-5.17 5.17H791a5.25 5.25 0 0 0-3.75 1.54c-12.71 12.95-3.74 28.46 8.85 28.46z" fill="#666666" p-id="2213"></path><path d="M736.85 355.6m-15 0a15 15 0 1 0 30 0 15 15 0 1 0-30 0Z" fill="#666666" p-id="2214"></path><path d="M391.16 38.11h-345v345a100 100 0 0 0 100 100h345v-345a100 100 0 0 0-100-100z m20 365h-265a20 20 0 0 1-20-20v-265h265a20 20 0 0 1 20 20zM552.16 138.11v345h345a100 100 0 0 0 100-100v-345h-345a100 100 0 0 0-100 100z m345 265h-265v-265a20 20 0 0 1 20-20h265v265a20 20 0 0 1-20 20zM46.16 641.11v345h345a100 100 0 0 0 100-100v-345h-345a100 100 0 0 0-100 100z m345 265h-265v-265a20 20 0 0 1 20-20h265v265a20 20 0 0 1-20 20zM897.16 541.11h-345v345a100 100 0 0 0 100 100h345v-345a100 100 0 0 0-100-100z m20 365h-265a20 20 0 0 1-20-20v-265h265a20 20 0 0 1 20 20z" p-id="2215"></path>
  </svg>
);
const ManagementIcon:FC<any> = props => <Icon component={ManagementSvg} {...props} />;

export default ManagementIcon;
