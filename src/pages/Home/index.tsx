import React, { useEffect } from 'react'
import { ConnectProps, connect, HomeModelState, Loading, Link } from 'umi';
import { Dispatch } from 'redux';
import { List, Avatar } from 'antd';
import { EyeOutlined, TagsOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { RowsType } from './data.d'
import './index.less'
import { TagState } from '@/models/tag';
interface Pageprops extends ConnectProps{
  home: HomeModelState,
  commonTag: TagState,
  loading: boolean,
  dispatch: Dispatch<any>
}
interface pageDataType {
  pageSize: 5,
  pageNum: 1
}
const Home: React.FC<Pageprops> = ({ home, commonTag, loading, dispatch }) => {
  const { articleData, articleListParms } = home
  useEffect(() => {
    dispatch({
      type: 'home/setPageData',
      payload: {
        pageNum: 1
      }
    })
    dispatch({
      type: 'commonTag/getTags'
    })
  },[])
  const fetchList = (pageData: any) => {
    dispatch({
      type: 'home/setPageData',
      payload: {
        pageNum: pageData
      }
    })
  }
  const getTagId = (tags: string[]) => {
    const { tagList } = commonTag
    const vals = tags.map((i: string) => {
      return tagList.filter((j: { labelName: string; }) => j.labelName === i)
    })
    return vals
  }
  const IconText = ({ icon, text, ...reset }: { icon: any, text: any, key: string }) => (
    <span {...reset}>
    {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
  </span>
  );
  const getText = (item: any) => {
    const tagsVal = item.tagValue && getTagId(item.tagValue) || [];
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
  return (
    <div className="listPage">
      <List<Partial<RowsType>>
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => fetchList(page),
          pageSize: articleListParms && articleListParms.pageSize || 10,
          total: articleData &&  articleData.total || 0,
        }}
        loading={loading}
        dataSource={articleData && articleData.rows || []}
        renderItem={item => (
          <List.Item
            className="listItem"
            key={item.id}
            actions={[
              <IconText icon={FieldTimeOutlined} text={item.createTime} key="list-vertical-star-o" />,
              <IconText icon={TagsOutlined} text={getText(item)} key="list-vertical-like-o" />,
              <IconText icon={EyeOutlined} text={item.look} key="list-vertical-message" />,
            ]}
          >
            <List.Item.Meta
              /*avatar={<Avatar src={item.avatar} />}*/
              title={<Link to={{
                pathname: '/detail',
                query: {
                  id: item.id
                }
              }}>{item.title}</Link>}
            />
            {item.articleTabled}
          </List.Item>
        )}
      />
    </div>
  )
}

export default connect(({ commonTag, home, loading }: {
  commonTag: TagState,
  home: HomeModelState,
  loading: Loading,
}) => ({
  commonTag,
  home,
  loading: loading.models.home
}))(Home)
