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
      render: (text: any, record: { id: number; }) => (
        <Fragment>
          <Link style={{ marginRight: 16 }} to={{
            pathname: '/blog',
            query: {
              id: record.id
            }
          }}>编辑</Link>
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
  const fetchList = (pageData: any) => {
    dispatch({
      type: 'sysBlog/setPageData',
      payload: {
        pageNum: pageData
      }
    })
  }
  return (<Table
    rowKey="id"
    columns={columns}
    dataSource={sysBlog.list && sysBlog.list.rows || []}
    pagination={{
      onChange: page => fetchList(page),
      total: sysBlog.list && sysBlog.list.records || 0,
      pageSize: sysBlog.blogListParms && sysBlog.blogListParms.pageSize || 10,
    }}
  />);
};

export default connect(({sysBlog}: {sysBlog: sysBlogState}) => ({sysBlog}))(BlogPage);
