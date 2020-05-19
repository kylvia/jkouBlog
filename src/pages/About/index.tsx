import React from 'react'
import { ConnectProps, AboutModelState, DetailModelState, Loading, connect } from 'umi';
import './index.less'

interface Pageprops extends ConnectProps{
  about: AboutModelState;
  articleDetail: DetailModelState;
  Loading: boolean;
}
const About: React.FC<Pageprops> = ({ about, articleDetail, dispatch }) => {
  const { name } = about
  return (
    <div className="aboutPage">
      <div className="aboutPageBck"></div>
      <div className="aboutPageMain">
        <h2>关于我</h2>
        <div>
          <p className="title">|关键</p>
          <p>只有忍受别人不能忍受的忍受，才能享受别人不能享受的享受</p>
        </div>
        <br />
        <div>
          <p className="title">|自我评价</p>
          <p>我就是我 一个不求伟大 却不甘堕落的人</p>
        </div>
        <br />
        <div>
          <p className="title">壹 | 关于我</p>
          <p>目前就读于中北大学，处在一个人才济济的宿舍，他们站的高度是我的动力，被动鞭策我成长</p>
        </div>
        <br />
        <div>
          <p className="title">贰 | 关于博客</p>
          <p>真正属于我自己的开源项目，也是自己的一个蜕变，也是自己的一个成长，也是自己的一个蜕变，也是自己的一个成长</p>
        </div>
        <br />
        <div>
          <p className="title">叁 | 关于此网站代码</p>
          <p>https://github.com/memo012/ac-blog，网站建设代码已开源到GitHub，可自行下载</p>
        </div>
        <br />
        <div>
          <p className="title">肆 | 最后想说的话</p>
          <p>希望自己可以勇往直前，乘风破浪，乘风破浪</p>
        </div>
      </div>

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


