import React, { FC } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
// 设置高亮样式
import { tomorrowNightEighties } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockType {
  value: any,
}
const CodeBlock: FC<CodeBlockType> = ({value}) => {
  return (<figure className="highlight">
    <SyntaxHighlighter style={tomorrowNightEighties}>
      {value}
    </SyntaxHighlighter>
  </figure>);
};

export default CodeBlock;
