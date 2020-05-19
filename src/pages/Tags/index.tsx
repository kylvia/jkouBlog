import React, { FC, useEffect, useState, Fragment } from 'react';
import { connect, Loading, ConnectProps, Link } from 'umi';
import { TagState } from '@/pages/Tags/model';
import { TagsOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { List } from 'antd';
import './index.less'
import { RowsType } from '@/pages/Home/data';
import { OriginIcon, ReprintIcon } from '@/components/Icon'

const colors = ['#CCCCFF', '#FFCCCC', '#9999CC', '#FF99CC', '#CCCC99', '#009966', '#669999', '#999999', '#663366', '#996666', '#990066'];
export interface pageTagsProps extends ConnectProps{
  tag: TagState;
  loading: boolean,
  dispatch: Dispatch<any>,
  location : {
    state?: {
      readonly labelId?: string
      readonly labelName?: string
    }
  }
}
const Tags: FC<pageTagsProps> = ({tag, location, loading, dispatch}) => {
  const [tagName, setTagName] = useState('')
  useEffect(() => {
    location.state && location.state.labelName && setTagName(location.state.labelName)
    location.state && location.state.labelId && dispatch({
      type: 'tag/getTagsDetail',
      payload: {
        tags: location.state.labelId
      }
    })
    dispatch({
      type: 'tag/getTags'
    })
  }, [])
  const getTag = (tags: string, tagName: string): void =>{
    setTagName(tagName)
    dispatch({
      type: 'tag/getTagsDetail',
      payload: {
        tags
      }
    })
  }
  const { tagList, articleList} = tag
  return (<div className="tagsPage">
    <div className="topSection">
      {tagList && tagList.map((i, index) => {
        return <a key={i.id} onClick={() => getTag(i.id, i.labelName)} className="tags" style={{ backgroundColor: colors[index % (colors.length)] }}>{i.labelName}</a>
      })}
    </div>
    <Fragment>
      <p className="tagsName"><TagsOutlined />&nbsp;<span className="tagsDes">分类</span>：{tagName}</p>
      <List<Partial<RowsType>>
        itemLayout="vertical"
        loading={loading}
        dataSource={articleList}
        renderItem={item => (
          <List.Item
            key={item.id}
          >
            <p className="tagDetailTitle">
              <Link to={{
                pathname: '/detail',
                query: {
                  id: item.id
                }
              }}>{
                item.selectType === '转载' ? <ReprintIcon /> : <OriginIcon />
              }&nbsp;{item.title}</Link>
              <span>{item.createTime}</span>
            </p>

          </List.Item>
        )}
      />
    </Fragment>
  </div>);
};

export default connect(({tag, loading}: {
  tag: TagState,
  loading: Loading
}) => ({
  tag,
  loading: loading.models.tag
}))(Tags);
