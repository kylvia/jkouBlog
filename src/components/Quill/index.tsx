import React, { useState, useEffect, FC, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css';
import { Modal, Upload, message } from 'antd';
import styles from './index.less';
// import UploadImage from '@/components/UploadImage';
import Icons from './icon';
import Video from './video';
import { aticleDraft } from '../../pages/BackSystem/ArticleManagement/Blog/data';
// 图标替换
Icons();
// 这里引入修改过的video模块并注册
// Quill.register(Video, true);
// Quill.register('modules/imageDrop', ImageDrop);
const Editor: FC<{
  defaultVal: aticleDraft;
  onChange: Function;
  content: unknown;
}> = ({ defaultVal, onChange, content }) => {
  const reactQuillRef = useRef();
  const [uploadQuillVisible, setUploadQuillVisible] = useState(false);
  const [uploadQuillType, setUploadQuillType] = useState(0); // 0：图片；1：视频
  const [fileQuillLists, setFileQuillLists] = useState([]);
  const [upLoadUrl, setUpLoadUrl] = useState('');
  const [uploadList, setUploadList] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    // this.reactQuillRef = React.createRef();
  }, []);

  const addImg = () => {
    setUploadQuillVisible(true);
    setImageUrl('');
    setUploadList([]);
  };

  const okQuillHandle = () => {
    setUploadQuillVisible(false);
    setFileQuillLists([]);
    setUpLoadUrl('');
    imageHandler(); // 处理插入图片到编辑器
  };

  const handleChange = value => {
    // eslint-disable-next-line react/destructuring-assignment
    onChange(value);
  };

  const imageHandler = () => {
    const { url = '' } = uploadList[0];
    // if (typeof reactQuillRef.current.getEditor !== 'function') return;
    const quill = reactQuillRef.current.editor;
    const index = quill.selection.savedRange.index || 0;
    quill.insertEmbed(index, ['image', 'video'][+uploadQuillType], url); // 插入图片/视频
    quill.setSelection(index + 1); // 光标位置加1
  };

  const showUploadImgBox = () => {
    setUploadQuillVisible(true);
    setUploadQuillType(0);
    setFileQuillLists([]);
    setUpLoadUrl('');
  };

  const showUploadVideoBox = () => {
    setUploadQuillVisible(true);
    setUploadQuillType(1);
    setFileQuillLists([]);
    setUpLoadUrl('');
  };
  const hideUploadQuillBox = () => {
    setUploadQuillVisible(false);
    setFileQuillLists([]);
    setUpLoadUrl('');
  };

  const modules = {
    history: {
      delay: 2000, // 在2000毫秒内的更改将被合并为单次更改
      maxStack: 500, // 历史记录撤销/重做堆栈的大小
      userOnly: true, // 仅撤销或重做用户的更改。
    },
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['clean'],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ align: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image', 'video'],
      ],
      handlers: {
        image: showUploadImgBox,
        video: showUploadVideoBox,
      },
    },
    // imageDrop: true,
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'align',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'clean',
    'code-block',
  ];

  const handleUploadImgChange = ({
    file,
    fileList,
  }: {
    file: {
      status: 'uploading' | 'done' | 'removed' | 'error';
      response?: {
        success: number;
        url: string;
      };
    };
    fileList: {
      url: string;
      uid: string;
      name: string;
      response?: {
        success: number;
        url: string;
      };
    }[];
  }) => {
    if (file.status === 'uploading') {
      setImgLoading(true);
    }
    if (file.status === 'removed') {
      setImgLoading(false);
      setImageUrl('');
    }
    if (file.status === 'error') {
      setImgLoading(false);
      setImageUrl('');
    }
    if (file.status === 'done') {
      setImgLoading(false);
      if (file.response && file.response.success === 1) {
        fileList = fileList.map(i => {
          if (i.response) {
            i.url = `/api${i.response.url}`;
            setImageUrl(`/api${i.response.url}`);
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
  const beforeUpload = (file: { type: string; size: number }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <div className={styles.editerWrapper} style={{ maxHeight: '500px' }}>
      <ReactQuill
        ref={reactQuillRef}
        formats={formats}
        modules={modules}
        onChange={handleChange}
        style={{ height: '500px' }}
        theme="snow"
        value={content}
      />
      <Modal
        maskClosable={false}
        onCancel={hideUploadQuillBox}
        onOk={okQuillHandle}
        title={+uploadQuillType ? '上传视频' : '上传图片'}
        visible={uploadQuillVisible}
        width={400}
      >
        <div className={styles.ImagaBox}>
          <div>
            {uploadQuillVisible && (
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
                {imageUrl || uploadList.length ? '' : uploadButton}
              </Upload>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Editor;
