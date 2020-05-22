import React, { FC, useRef, useState, useEffect, Fragment } from 'react';
import './index.less'

const arr = ['TypeScript','JavaScript','小程序','less','sass' ];//显示的文本
let j = 0; //从数组第一个开始展示
const NewPage: FC = () => {
  const [text, setText] = useState(arr[0])
  const [flag, setFlag] = useState<boolean>(false)
  const timer = useRef(0);
  const typeface = useRef()
  useEffect(() => {
    // timer 需要在点击时建立，因此这里只做清理使用
    return () => {
      window.clearTimeout(timer.current);
    }
  }, []);

  useEffect(() => {
    !flag && func(j)
  }, [flag])

// 递归函数
  const func =(j: number) => {
    const dom = typeface.current
    if (!dom) {
      setFlag(false)
      return
    }
    setFlag(true)
    /*if(j < arr.length){
      const item = arr[j]
      const itemLen = item === '小程序' ? 6 : item.length; // 汉字是占两个ch
      setText(item) // 显示文字
      // setInterval(() => {
      //   func(j + 1)
      // }, itemLen*500)
    }*/
    if(j < arr.length){ // 当达到数组长度时，就从头开始继续
      const item = arr[j]
      const itemLen = item === '小程序' ? 2*item.length : item.length; // 汉字是占两个ch
      setText(item) // 显示文字
      console.log(item)
      for (var i = 0, len = itemLen; i < len; i++) { // 添加文本效果
        const s = dom.style;
        s.animationTimingFunction = "steps(" + itemLen + "), steps(1)"; //动态设置steps
        s.animationName = `typing${itemLen}`; //文本长度不同，展示的宽度就不同，所以需要动态设置
        s.animationDuration = `${itemLen/2}s,${itemLen/2}s`; //这儿设置速度
      }
      timer.current = setTimeout(() => {
        func(j + 1)
      },itemLen*500) //这儿和上面的animationDuration速度一致，只不过这儿是毫秒，所以要乘以1000

    }else{
      func(0); //就从头开始继续
    }
  }
  return (<Fragment><div className="typeface" ref={typeface}>{text}</div></Fragment>);
};

export default NewPage;
