import React, { FC, Fragment } from "react";
import Heading from "./Heading";

interface HeadingBlockType {
  level: number,
  children: any,
}
const HeadingBlock: FC<HeadingBlockType> = ({level, children}) => {
  const renderHtml = () => {
    if (children && children.length > 0) {
      const nodeValue = children[0].props.value;
      return (
        <Heading level={`h${level}`} id={nodeValue}>
          <span className="title">{children}</span>
          <a href={`#${nodeValue}`} className="link">
            #
          </a>
        </Heading>
      );
    } else {
      return <>{children}</>;
    }
  };
  return (<Fragment>{renderHtml()}</Fragment>);
};

export default HeadingBlock;
