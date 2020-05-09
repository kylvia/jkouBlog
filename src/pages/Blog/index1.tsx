import React, { FC, useEffect } from 'react';
import { connect, Loading } from 'umi';
import { authState } from '@/models/auth';
import { Dispatch } from 'redux';
import MarkDownView from '@/components/MarkDownView'
import codePreviewMd from './codePreviewer.md'

interface propsType {
  codePreviewMd: any,
  auth: authState,
  loading: Loading,
  dispatch: Dispatch
}
const Blog: FC<propsType> = ({auth, loading, dispatch}) => {
  useEffect(() => {
    dispatch({type: 'auth/isLogin'})
  },[])
  return (<MarkDownView
    source={codePreviewMd}
    escapeHtml={false}
  />);
};

export default connect(({ auth, loading } : { auth: authState, loading: Loading }) => ({ loading: loading.models.auth, auth }))(Blog);
