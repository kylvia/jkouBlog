import React, { FC, useState, Fragment, useRef, useEffect } from 'react';
import EditBlog from "./Component/EditBlog";
import { history } from 'umi';
import { Modal, Upload, message, Button, Input } from 'antd';
import "easymde/dist/easymde.min.css";
import './index.less'
import BlogInfo from '@/pages/Blog/Component/BlogInfo';
import { BlogValsItem } from './data.d';
import { connect } from 'umi';
import { Dispatch } from 'redux';
import { blogModelState } from './model';

interface BlogPropsType {
  blogModel: blogModelState
  dispatch: Dispatch,
  location: {
    query?: {
      readonly id: string
    }
  }
}
const Blog: FC<BlogPropsType> = ({ dispatch, location, blogModel }) => {
  const blogRef = useRef()
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [blogVals, setBlogVals] = useState<BlogValsItem | {}>({})
  useEffect(() => {
    if(!location.query) return
    dispatch({
      type: 'blogModel/getDraftArticle',
      payload: {
        id: location.query.id
      }
    })
  }, [])
  useEffect(() => {
    setTitle(blogModel.draftArticle && blogModel.draftArticle.title || '')
  },[blogModel])
  // 发布
  const handlePublish = (value) => {
    const val = blogRef.current.getVal() || ''
    if(!val || !title){
      message.error('请输入标题和文章内容！')
      return
    }
    setVisible(true)
  }
  const hideVisible = () => {
    setVisible(false)
  }
  const setBlogArticle = (e) => {
    setBlogVals(e)
  }
  const sendData = async (e: Partial<BlogValsItem>) => {
    const val = blogRef.current.getVal() || '';
    const res = await dispatch({
      type: 'blogModel/publishEditor',
      payload: {
        ...e,
        text: val,
        id: location.query ? location.query.id : '',
        articleHtmlContent: val,
        title
      }
    })
    if(res && (res.status === 200)){
      message.success('添加成功！')
      history.push('/home');
    }else if(res && (res.status === 201)){
      message.success('修改成功！')
      history.push('/home');
    }else {
      message.error(res.msg)
    }
  }
  return (<Fragment>
    <div className="blogTitBox">
      <Input onInput={(e) => setTitle(e.target.value)} value={title} className="blogTit" placeholder="请输入文章标题" />
      <Button onClick={handlePublish}>发布</Button>
    </div>
    <EditBlog cRef={blogRef} defaultVal={blogModel.draftArticle || ''} setBlogArticle={setBlogArticle} />
    <BlogInfo visible={visible} defaultVal={blogModel.draftArticle || {}} hideVisible={hideVisible} sendData={e => sendData(e)} />
  </Fragment>);
};

export default connect(({blogModel}: {blogModel: blogModelState}) => ({blogModel}))(Blog);
