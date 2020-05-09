import React, { FC, useEffect, Fragment } from "react";

const elements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6"
};
interface HeadingType {
  level: number,
  children: any,
  props: any
}
const Heading: FC<HeadingType> = ({level, children, ...props}) => {
  return React.createElement(elements[level] || elements.h1, props, children);
};

export default Heading;
