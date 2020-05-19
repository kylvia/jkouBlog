import React, { FC, useEffect, ReactNode, useState, createElement } from 'react';
import { connect, Link, Loading } from 'umi';
import { Divider } from 'antd'
import { DetailModelState } from '@/pages/Detail/model';
import { Dispatch } from 'redux';
import { EyeOutlined, TagsOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { TagState } from '@/models/tag';
import './index.less'
import { EmailIcon } from '@/components/Icon';
import MarkDownView from '@/components/MarkDownView';
import Message from '@/components/Message';

interface propsType {
  articleDetail: DetailModelState,
  dispatch: Dispatch<any>,
  commonTag: TagState,
  location: {
    query?: {
      readonly id: string
    }
  }
}
const Detail: FC<propsType> = ({ dispatch, commonTag, articleDetail, location }) => {
  const { tagList } = commonTag
  const [message, setMessage] = useState()
  useEffect(() => {
    if(!location.query) return
    dispatch({
      type: 'articleDetail/fetchDetail',
      payload: {
        articleId: location.query.id
      }
    })
    dispatch({
      type: 'commonTag/getTags'
    })
    dispatch({
      type: 'articleDetail/getComment',
      payload: {
        blogId: location.query.id
      }
    })
  }, [])
  const IconText = ({ icon, text, ...rest }: { icon: any, text: string | number | ReactNode, className: string, key: string }) => (
    <span {...rest}>
    {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
  </span>
  );
  const getTagId = (tags: string[]) => {
    if(!tagList.length){
      return []
    }
    const vals = tags.map((i: string) => {
      return tagList.filter((j: { labelName: string; }) => j.labelName === i)
    })
    return vals
  }
  const getText = (item: string[] = []) => {
    const tagsVal = item && getTagId(item) || [];
    return tagsVal.map((j, index) => {
      if(!j.length) return;
      const i = j[0]
      return <Link key={i.id} className="tags" to={{
        pathname: '/tags',
        state : {
          labelId: i.id,
          labelName: i.labelName,

        }
      }}>{i.labelName}{tagsVal.length - 1 === index ? '' : '，'}</Link>
    })
  };

  const like = (commentId: string) => {
    dispatch({
      type: 'articleDetail/updLikes',
      payload: {
        blogId: location.query ? location.query.id : '',
        commentId
      }
    })
    // setLikes(1)
  }
  const handleCommentSubmit = async (values: Partial<{
    blogId: number,
    comName: string,
    commentId: number,
    repMess: string,
    message: string,
  }>, repComment: {commentId: string, comName: string} | '') => {
    const _repComment = !repComment ? {} : {...repComment}
    return await dispatch({
      type: `articleDetail/${!repComment ? 'insComment' : 'insRepComment'}`,
      payload: {
        blogId: location.query ? location.query.id : '',
        ...values,
        ..._repComment
      }
    })
  }
  return (
    <div className="detailPage">
      <h2 className="title">{articleDetail.detail && articleDetail.detail.title || ''}</h2>
      <div className="message">
        <IconText className="messageItem" icon={FieldTimeOutlined} text={articleDetail.detail && articleDetail.detail.createTime || ''} key="list-vertical-star-o" />
        <IconText className="messageItem" icon={TagsOutlined} text={articleDetail.detail && articleDetail.detail.tagValue && getText(articleDetail.detail.tagValue)} key="list-vertical-like-o" />
        <IconText className="messageItem" icon={EyeOutlined} text={`浏览量${articleDetail.detail && articleDetail.detail.look}`} key="list-vertical-message" />
      </div>
      <MarkDownView source={articleDetail.detail && articleDetail.detail.text || ''} />
      <Message
        comments={articleDetail.comments && articleDetail.comments[0] || []}
        likeFunc={like}
        handleCommentSubmit={handleCommentSubmit}
      />
      <div className="endBox">
        <Divider dashed className="divider">本文结束感谢您的阅读</Divider>
        <Divider dashed className="divider">如果有任何疑问,欢迎和我进行交流<EmailIcon style={{ color: '#b9b9b9' }} /> hh_todd@163.com</Divider>
      </div>
    </div>
  );
};

export default connect(({articleDetail, commonTag, loading}: {
  commonTag: TagState,
  articleDetail: DetailModelState,
  loading: Loading
}) => ({
  commonTag,
  articleDetail,
  loading: loading.models.articleDetail
}))(Detail);
