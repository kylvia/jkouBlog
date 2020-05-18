import React, { FC, useState, Fragment, useImperativeHandle, useEffect } from 'react';
import SimpleMDE from "react-simplemde-editor";
import { Modal, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import "easymde/dist/easymde.min.css";
import './index.less'
import { aticleDraft } from '@/pages/BackSystem/ArticleManagement/Blog/data';

const EditBlog: FC<{
  cRef: any,
  defaultVal: aticleDraft
}> = ({cRef, defaultVal}) => {
  console.log(defaultVal)
  const [textValue, setTextValue] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [imgLoading, setImgLoading] = useState(false)
  const [uploadImgVisible, setUploadImgVisible] = useState()
  const [uploadList, setUploadList] = useState([])
  useEffect(() => {
    setTextValue(defaultVal.text)
  },[defaultVal])
  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    getVal: () => {
      return textValue
    }
  }));
  const handleChange = (value: unknown) => {
    setTextValue(value)
  }
  const addImg = () => {
    setUploadImgVisible(true)
    setImageUrl('')
    setUploadList([])
  }
  const handleUploadImgOk = () => {
    setUploadImgVisible(false)
    setTextValue(textValue + `![/api/${imageUrl}](/api/${imageUrl})`)
  }
  const handleUploadImgCancel = () => {
    setUploadImgVisible(false)
  }
  const handleUploadImgChange = ({ file, fileList }: {file: {
      status: 'uploading' | 'done' | 'removed',
      response?: {
        success: number,
        url: string
      }
    }, fileList: {
      url: string,
      uid: string,
      name: string,
      response?: {
        success: number,
        url: string
      }
    }[]}) => {
    if (file.status === 'uploading') {
      setImgLoading(true)
    }
    if (file.status === 'removed') {
      setImgLoading(false)
      setImageUrl('')
    }
    if (file.status === 'done') {
      setImgLoading(false)
      if(file.response && file.response.success === 1){
        fileList = fileList.map(i => {
          if (i.response) {
            i.url = i.response.url;
            setImageUrl(i.response.url)
          }
          return {
            uid: i.uid,
            url: i.url || '',
            name: i.name,
            status: 'done',
          };
        });

      }
    }
    setUploadList([...fileList]);
  };
  const beforeUpload = (file: { type: string; size: number; }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  const uploadButton = (
    <div>
      {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (<Fragment>
    <SimpleMDE
      id="MDE"
      onChange={handleChange}
      value={textValue}
      toolbar={toolbar}
      options={{
        spellChecker: false,
        toolbar: [
          'bold',
          'italic',
          'heading',
          '|',
          'quote',
          'code',
          'table',
          'horizontal-rule',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          {
            name: "image",
            action: addImg,
            className: "fa fa-picture-o",
            title: "Image",
          },
          '|',
          'side-by-side',
          'fullscreen',
          '|',
          'guide'
        ]
      }}
    />
    <Modal
      title="Basic Modal"
      visible={uploadImgVisible}
      onOk={handleUploadImgOk}
      onCancel={handleUploadImgCancel}
    >
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        // showUploadList={false}
        action="/api/uploadImage"
        accept="image/png, image/jpeg"
        fileList={uploadList}
        beforeUpload={beforeUpload}
        onChange={handleUploadImgChange}
      >
        {imageUrl ? '' : uploadButton}
      </Upload>
    </Modal>
  </Fragment>);
};

export default EditBlog;
