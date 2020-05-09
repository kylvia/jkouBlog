import React, { FC } from 'react';
import Icon from '@ant-design/icons';

const Head2Svg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M390.69933 577.807798c0 51.591005-15.161305 93.460602-33.888831 93.460602-18.678408 0-33.865295-41.87062-33.865295-93.460602 0-51.619658 15.186887-93.460602 33.865295-93.460602C375.538025 484.347197 390.69933 526.18814 390.69933 577.807798z" p-id="5661"></path><path d="M708.435904 577.807798c0 51.591005-15.161305 93.460602-33.863249 93.460602-18.705014 0-33.891901-41.87062-33.891901-93.460602 0-51.619658 15.186887-93.460602 33.891901-93.460602C693.275623 484.347197 708.435904 526.18814 708.435904 577.807798z" p-id="5662"></path><path d="M514.536776 124.557854c-212.911134 0-385.494795 172.557054-385.494795 385.494795 0 212.885552 172.58366 385.491725 385.494795 385.491725 212.885552 0 385.491725-172.607196 385.491725-385.491725C900.029524 297.114908 727.422328 124.557854 514.536776 124.557854zM514.536776 851.160513c-188.411137 0-341.109911-152.72231-341.109911-341.107865 0-37.764092 6.362918-74.015737 17.701151-107.983363 28.735461-45.306882 74.9142-86.86744 146.771785-81.326237 0 0 53.696969 203.136513 273.200242 130.765229 0 0-93.408413-32.712029-39.71349-114.422006 0 0 125.761262 177.6347 279.024901 115.420753 3.208065 18.755156 5.233188 37.893029 5.233188 57.546647C855.644641 698.438203 702.922331 851.160513 514.536776 851.160513z" p-id="5663"></path>
  </svg>
);
const Head2Icon:FC<any> = props => <Icon component={Head2Svg} {...props} />;

export default Head2Icon;
