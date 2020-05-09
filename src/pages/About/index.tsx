import React from 'react'
import { ConnectProps, AboutModelState, DetailModelState, Loading, connect } from 'umi';

interface Pageprops extends ConnectProps{
  about: AboutModelState;
  articleDetail: DetailModelState;
  Loading: boolean;
}
const About: React.FC<Pageprops> = ({ about, articleDetail, dispatch }) => {
  const { name } = about
  console.log(articleDetail)
  return (
    <div>
      Hello {name}
    </div>
  )
}
export default connect(({ about, loading, articleDetail }: {
  about: AboutModelState;
  articleDetail: DetailModelState;
  loading: Loading;
}) => ({
  about,
  articleDetail,
  loading: loading.models.about,
}))(About);


