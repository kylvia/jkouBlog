import React from 'react'
import { ConnectProps, AboutModelState, Loading, connect } from 'umi';

interface Pageprops extends ConnectProps{
  about: AboutModelState;
  Loading: boolean;
}
const About: React.FC<Pageprops> = ({ about, dispatch }) => {
  const { name } = about
  return (
    <div>
      Hello {name}
    </div>
  )
}
export default connect(({ about, loading }: {
  about: AboutModelState;
  loading: Loading;
}) => ({
  about,
  loading: loading.models.about,
}))(About);


