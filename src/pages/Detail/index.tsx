import React, { FC, useEffect, ReactNode } from 'react';
import { connect, Link, Loading } from 'umi';
import { Divider } from 'antd'
import { DetailModelState } from '@/pages/Detail/model';
import { Dispatch } from 'redux';
import { labelType } from './data.d';
import { EyeOutlined, TagsOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { TagState } from '@/models/tag';
import './index.less'
import { EmailIcon } from '@/components/Icon';

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
  }, [])
  console.log(articleDetail.detail)
  const createMarkup = () => {
    return {__html: articleDetail.detail && articleDetail.detail.articleHtmlContent || ''};
  }
  const IconText = ({ icon, text, ...rest }: { icon: any, text: string | number | ReactNode, className: string, key: string }) => (
    <span {...rest}>
    {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
  </span>
  );
  const getTagId = (tags: string[]) => {
    const { tagList } = commonTag
    const vals = tags.map((i: string) => {
      return tagList.filter((j: { labelName: string; }) => j.labelName === i)
    })
    return vals[0]
  }
  return (
    <div className="detailPage">
      <h2 className="title">{articleDetail.detail && articleDetail.detail.title || ''}</h2>
      <div className="message">
        <IconText className="messageItem" icon={FieldTimeOutlined} text={articleDetail.detail && articleDetail.detail.createTime || ''} key="list-vertical-star-o" />
        <IconText className="messageItem" icon={TagsOutlined} text={articleDetail.detail && articleDetail.detail.tagValue && getTagId(articleDetail.detail.tagValue).map((i: labelType) => {
          return <Link key={i.id} className="tagLink" to={{
            pathname: '/tags',
            state: {
              labelId: i.id,
              labelName: i.labelName,

            }
          }}>{i.labelName}</Link>
        })} key="list-vertical-like-o" />
        <IconText className="messageItem" icon={EyeOutlined} text={`浏览量${articleDetail.detail && articleDetail.detail.look}`} key="list-vertical-message" />
      </div>
      <div dangerouslySetInnerHTML={createMarkup()}></div>
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
