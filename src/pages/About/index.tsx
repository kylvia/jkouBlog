import React, {useEffect, useState, useRef} from 'react'
import { ConnectProps, AboutModelState, DetailModelState, Loading, connect } from 'umi';
import Typeface from './Typeface';
import './index.less'

interface Pageprops extends ConnectProps{
  about: AboutModelState;
  articleDetail: DetailModelState;
  Loading: boolean;
}
function useScroll(ref: any, fnc: Function) {
  useEffect(() => {
    const handleScroll = (e: any) => {
      console.log(e.currentTarget.scrollY)
      fnc(e.currentTarget.scrollY)
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref, fnc]);
}
const About: React.FC<Pageprops> = ({ about, articleDetail, dispatch }) => {
  const { name } = about
  const bScroll = useRef(null)
  const [fixTop, setFixTop] = useState(0);
  useScroll(bScroll, (scrollY: number) => {
    if(scrollY > 64){
      setFixTop(0)
    }else
    setFixTop(64 - scrollY)
  });
  // console.log('scorllTop:' + scorllTop)
  return (
    <div className="aboutPage">
      <div className="aboutPageBck" style={{top: fixTop}}>
        <div className="bg-keywords">
          <span className="font-8" style={{top: "2%"}}>TypeScript</span>
          <span className="font-3" style={{right: "30%", top: "30%"}}>JavaScript</span>
          <span className="font-4" style={{top: "40%", left: "10%"}}>NodeJs</span>
          <span className="font-4" style={{top: "68%",right:"10%"}}>Vue</span>
          <span className="font-5" style={{top: "40%",right:"30%"}}>Bootstrap</span>
          <span className="font-6" style={{top: "15%",right: "25%"}}>React</span>
          <span className="font-2" style={{top: "22%",left: "30%"}}>小程序</span>
          <span className="font-3" style={{bottom: "24%",right: "24%"}}>CSS</span>
          <span className="font-5" style={{top: "50%", right: "10%"}}>Webpack</span>
          <span className="font-3" style={{top: "68%", left: "18%"}}>jQuery</span>
          <span className="font-4" style={{top: "20%",right:"10%"}}>Stylus</span>
          <span className="font-6" style={{top: "70%",left:"30%"}}>ECMAScript</span>
          <span className="font-3" style={{bottom: "2%",left:"10%"}}>Babel</span>
          <span className="font-2" style={{top: "50%",left:"45%"}}>DOM</span>
          <span className="font-3" style={{top: "20%",left:"10%"}}>Mongodb</span>
          <span className="font-2" style={{top: "10%",right:"10%"}}>Electron</span>
          <span className="font-2" style={{top: "80%",left: "25%"}}>C#</span>
        </div>
      </div>
      <div className="aboutPageMain" ref={bScroll}>
        <h2>关于我</h2>
        <br />
        <br />
        <div>
          <p className="title">壹 | 技术</p>
          <Typeface />
        </div>
        <br />
        <div>
          <p className="title">贰 | 我</p>
          <p>中文名 阿娇，英文名enjoynce(在网上查了好久才选到的，以前叫kylvia，这是高中的时候随便拼凑的个，说后面改的，结果一拖，艾玛 到现在才改，不过我始终相信，现在 永远都不晚，好吧，我承认我是在为我的懒找借口......)</p>
          <p>15年入行前端，其实之前我会干java、Android、数据库，不过都是学校学的那些皮毛，毕业就转战0基础的前端</p>
          <p>还是说点正经的技术栈：TypeScript、JavaScript、React、Vue、less、sass、 小程序、Mongodb、SQL、stylus、 electron、 docker、 linux、 echarts、 leaflet ......
          </p>
        </div>
        <br />
        <div>
          <p className="title">叁 | 技术链接</p>
          <ul>
            <li>github：https://github.com/kylvia</li>
            <li>csdn：https://blog.csdn.net/u012612399</li>
            <li>email：hh_todd@163.com</li>
          </ul>
        </div>
        <div>
          <p className="title">肆 | 名言</p>
          <p>修己,以清心为要,涉世,以慎言为先,律己,宜带秋气,处世,须带春风,心术,以光明笃实为第一,容貌,以正大老成为第一,言语,以简重真切为第一,不自重者,取辱,不自畏者,招祸,恶,莫大于纵己之欲,祸,莫大于言人之非,施之君子,则丧吾德,施之小人,则杀吾身。
          </p>
          <p style={{float: 'right'}}> ——弘一法师</p>
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


