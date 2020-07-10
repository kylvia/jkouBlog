import React, {
  FC,
  useState,
  Fragment,
  useImperativeHandle,
  useEffect,
} from 'react';
import Editer from '@/components/Quill';
import { aticleDraft } from '@/pages/BackSystem/ArticleManagement/Blog/data';

const EditBlog: FC<{
  cRef: any;
  defaultVal: aticleDraft;
}> = ({ cRef, defaultVal }) => {
  const [textValue, setTextValue] = useState();
  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    getVal: () => {
      return textValue;
    },
  }));

  useEffect(() => {
    setTextValue(defaultVal.text);
  }, [defaultVal]);
  const handleChange = (value: undefined) => {
    textValue(value);
  };
  return (
    <Fragment>
      <Editer content={textValue} onChange={handleChange} />
    </Fragment>
  );
};

export default EditBlog;
