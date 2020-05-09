import React, { FC, useEffect } from 'react'
import { connect, Loading, Link } from 'umi'
import { commentState } from './model'
import { Dispatch } from 'redux';
import { List, Skeleton } from 'antd';
import { commentListType } from './data';
import './index.less'

interface commentType {
  dispatch: Dispatch
  commentModel: commentState
  loading: boolean
}
const Comment: FC<commentType> = ({ dispatch, commentModel: { list }, loading }) => {
  useEffect(() => {
    dispatch({
      type: 'commentModel/getUserReport',
    })
  }, [])
  return <div className="commentSection">
    <List
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item: commentListType) => (
        <List.Item
          extra={item.rcreateTime}
        >
          <Skeleton loading={loading} active>
            <List.Item.Meta
              title={<p><span className={['readCommentBtn', 'notReadComment'][item.risRead]}>{['已读', '未读'][item.risRead]}</span><a>{item.repCommentName}</a>评论了你的博客《<Link to={{
                pathname: '/detail',
                query: {
                  id: item.blogId
                }
              }}>{item.title}</Link>》</p>}
              description={item.repMess}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  </div>
}
export default connect(({commentModel, loading}: {
  commentModel: commentState,
  loading: Loading
}) => ({commentModel, loading: loading.models.commentModel}))(Comment)
