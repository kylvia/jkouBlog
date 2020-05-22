import React, { FC, Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import HeadingBlock from './HeadingBlock';

interface MarkDownViewType {
  source: any,
  reset: any
}
const MarkDownView: FC<MarkDownViewType> = ({source, ...reset}) => {
  return (<Fragment>
    <ReactMarkdown
      source={source}
      {...reset}
      renderers={{
        code: CodeBlock,
        heading: ({level, children}) => HeadingBlock({level, children})
      }}
    />
    <div>
    </div>
  </Fragment>);
};

export default MarkDownView;
