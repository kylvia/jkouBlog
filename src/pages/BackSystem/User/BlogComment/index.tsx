import React, { FC, useEffect } from 'react'
import { connect, Loading, history } from 'umi'
import { blogCommentState } from './model'
import { Dispatch } from 'redux';
import { List, Skeleton } from 'antd';
import { blogCommentListType } from './data';
import './index.less'

interface commentType {
  dispatch: Dispatch
  blogCommentModel: blogCommentState
  loading: boolean
}
const BlogComment: FC<commentType> = ({ dispatch, blogCommentModel: { list }, loading }) => {
  useEffect(() => {
    dispatch({
      type: 'blogCommentModel/getBlogUserReport',
    })
  }, [])
  const clearOneBlogNotComm = async ({ id, blogId }: { id: number, blogId: number }) => {
    const res = await dispatch({
      type: 'blogCommentModel/clearOneBlogNotComm',
      payload: {
        id
      }
    })

    if(res && (res.status === 200)){
      history.push({
        pathname: '/detail',
        query: {
          id: blogId
        }
      });
    }
  }
  return <div className="blogCommentSection">
    <List
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item: blogCommentListType) => (
        <List.Item
          extra={item.createTime}
        >
          <Skeleton loading={loading} active>
            <List.Item.Meta
              title={<p><span className={['readCommentBtn', 'notReadComment'][item.isRead]}>{['已读', '未读'][item.isRead]}</span><a>{item.commentName}</a>评论了你的博客</p>}
              description={<a onClick={() => clearOneBlogNotComm(item)}>{item.message}</a>}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  </div>
}
export default connect(({blogCommentModel, loading}: {
  blogCommentModel: blogCommentState,
  loading: Loading
}) => ({blogCommentModel, loading: loading.models.blogCommentModel}))(BlogComment)
