import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import HeadingBlock from './HeadingBlock';

interface MarkDownViewType {
  source: any,
  reset: any
}
const MarkDownView: FC<MarkDownViewType> = ({source, ...reset}) => {
  return (<ReactMarkdown
    source={source}
    {...reset}
    renderers={{
      code: CodeBlock,
      heading: HeadingBlock
    }}
  />);
};

export default MarkDownView;
