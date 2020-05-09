import React, { FC, useEffect, Fragment } from 'react';
import { Table, Popconfirm, message } from 'antd';
import { sysBlogState } from './model';
import { Dispatch } from 'redux';
import { Link, connect, history } from 'umi';
import './index.less'

interface BlogPageType {
  sysBlog: sysBlogState,
  dispatch: Dispatch
}
const BlogPage: FC<BlogPageType> = ({sysBlog, dispatch}) => {
  useEffect(() => {
    dispatch({
      type: 'sysBlog/setPageData'
    })
  }, [])
  const cancel = async (id: number) => {
    const res = await dispatch({
      type: 'sysBlog/delBlog',
      payload: {id}
    })
    if(res && (res.status === 200)){
      message.success('删除成功！')
      dispatch({
        type: 'sysBlog/setPageData'
      })
    }
  };
  //ID	博客名	创建时间	操作
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '博客名',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Fragment>
          <Link to={{
            pathname: '/blog',
            query: {
              id: record.id
            }
          }}><a style={{ marginRight: 16 }}>编辑</a></Link>
          <Popconfirm
            okText="确认"
            cancelText="取消"
            title="确认删除?"
            onConfirm={() => cancel(record.id)}>
            <a>删除</a>
          </Popconfirm>
      </Fragment>
      ),
    },
  ];
  return (<Table columns={columns} dataSource={sysBlog.list && sysBlog.list.rows || []} />);
};

export default connect(({sysBlog}: {sysBlog: sysBlogState}) => ({sysBlog}))(BlogPage);
