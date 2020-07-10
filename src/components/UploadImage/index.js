import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, message } from 'antd';
import classnames from 'classnames';

import { getAccessKey } from '../../utils/OSSUtil';
import './index.less';

let uuid = 0;

class UploadImage extends Component {
  static propTypes = {
    length: PropTypes.number,
    label: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    multiple: PropTypes.bool,
    required: PropTypes.bool,
    enName: PropTypes.bool,
    dirName: PropTypes.string,
    onRemove: PropTypes.func,
    disabled: PropTypes.bool,
    imgType: PropTypes.bool, // 是否控制上传的图片类型
  };

  static defaultProps = {
    length: 1,
    label: '',
    multiple: false,
    required: false,
    enName: true,
    type: '0',
    dirName: 'e-stage',
    onChange: () => '',
    onRemove: () => '',
    disabled: false,
    imgType: false, // 默认不控制
  };

  state = {
    showView: false, // 是否显示预览
    viewItem: {}, // 预览需要的数据
    uploadList: [], // 上传列表，受控
    dirty: false,
  };

  componentWillMount() {
    const { uploadList, onChange } = this.props;
    onChange(uploadList);
    this.setState({
      uploadList,
    });
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line react/destructuring-assignment
    // if (!this.state.dirty) {
    const { uploadList, onChange } = nextProps;
    onChange(uploadList);
    this.setState({
      uploadList,
    });
    // }
  }

  /**
   * 上传事件监听
   * @param target
   */
  onUpload = ({ target }) => {
    const { files } = target;
    if (!files.length) {
      return;
    }
    const { imgType } = this.props;
    if (imgType) {
      // 需要文字提示：请选择jpg/png格式图片上传。
      const types = ['image/jpeg', 'image/png'];
      if (files && files.length > 0) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (types.includes(file.type)) {
            if (!(file.size / 1024 < 800)) {
              message.error('文件不能超过800kb!');
            } else {
              this.readFile(files[i]);
            }
          } else {
            message.error('请选择jpg/png格式图片上传');
          }
        }
      }
    } else {
      Array.prototype.slice.call(files).forEach(file => this.readFile(file));
    }
  };

  /**
   * 读取上传的文件进行预览并开始上传
   * @param file
   */
  readFile = file => {
    const { onChange } = this.props;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const data = {
        // eslint-disable-next-line no-plusplus
        uuid: uuid++,
        src: fileReader.result,
        name: file.name,
        status: 'loading',
        percent: 0,
      };
      this.setState(state => {
        const newUploadList = [...state.uploadList, data];
        onChange(newUploadList);
        this.upload(data, file);
        return {
          dirty: true,
          uploadList: [...state.uploadList, data],
        };
      });
    };
    fileReader.readAsDataURL(file);
  };

  upload = (data, file) => {
    const { enName, dirName } = this.props;
    const formData = new FormData();
    const now = new Date();
    const dir = `${dirName}/${now.getFullYear()}${(
      '0' +
      (now.getMonth() + 1)
    ).slice(-2)}${now.getDate()}/`;
    const xhr = new XMLHttpRequest();
    const { name } = file;
    const dotIndex = name.lastIndexOf('.');
    let prefix;
    if (enName) {
      prefix = `${Math.random()}`.slice(2);
    } else {
      prefix = name.substring(0, dotIndex);
    }
    const suffix = name.substring(dotIndex + 1);
    const filename = `${prefix}_${Date.now()}.${suffix}`;
    getAccessKey(dir)
      .then(res => {
        formData.append('key', `${res.dir}${filename}`);
        formData.append('policy', res.policy);
        formData.append('OSSAccessKeyId', res.accessid);
        formData.append('success_action_status', 200);
        formData.append('signature', res.signature);
        formData.append('file', file);
        xhr.open('post', res.host);
        xhr.upload.onprogress = e => {
          const { uploadList } = this.state;
          const newUploadList = [...uploadList];
          const index = newUploadList.findIndex(
            item => item.uuid === data.uuid,
          );
          newUploadList[index].percent = (e.loaded / e.total) * 100;
          if (enName) {
            newUploadList[index].name = filename;
          }
          this.setState({
            dirty: true,
            uploadList: newUploadList,
          });
        };
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              this.onSuccessHandle(data, res, filename);
            } /* else {
            this.onErrorHandle(data);
          } */
          }
        };
        xhr.onerror = () => {
          this.onErrorHandle(data);
        };
        xhr.send(formData);
      })
      .catch(() => {
        this.onErrorHandle(data);
      });
  };

  onSuccessHandle = (file, res, filename) => {
    const { onChange } = this.props;
    this.setState(state => {
      const newUploadList = [...state.uploadList];
      const index = newUploadList.findIndex(item => item.uuid === file.uuid);
      newUploadList[index] = {
        ...newUploadList[index],
        status: 'done',
        percent: 100,
        src: `${res.host}/${res.dir}${filename}`,
        noHostUrl: `${res.dir}${filename}`.replace(/^res/, ''),
      };
      onChange(newUploadList);
      return {
        dirty: true,
        uploadList: [...newUploadList],
      };
    });
  };

  remove = (index, e) => {
    e.preventDefault();
    const { onChange, onRemove } = this.props;
    this.setState(prevState => {
      const { uploadList } = prevState;
      const item = uploadList.splice(index, 1)[0];
      onRemove(item, uploadList);
      onChange(uploadList);
      return {
        ...prevState,
        dirty: true,
        uploadList,
      };
    });
  };

  view = item => {
    this.setState({
      showView: true,
      viewItem: item,
    });
  };

  closeView = () => {
    this.setState({
      showView: false,
    });
  };

  onErrorHandle = file => {
    this.setState(state => {
      message.error('上传错误！');
      const { uploadList } = state;
      const newUploadList = [...uploadList];
      const index = newUploadList.findIndex(item => item.uuid === file.uuid);
      newUploadList[index] = {
        ...newUploadList[index],
        status: 'error',
      };
      return {
        uploadList: newUploadList,
      };
    });
  };

  render() {
    const { uploadList, showView, viewItem } = this.state;
    const { length, label, type, multiple, required, disabled } = this.props;
    const accpetVal = type === '0' ? 'image/*' : 'video/*';
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div className="upload">
        <ul className="upload-list">
          {uploadList.map((item, index) => (
            <li
              key={index.toString()}
              className={classnames('upload-list__item', {
                error: item.status === 'error',
              })}
            >
              {type === '0' ? (
                <img alt="" src={item.src} />
              ) : (
                <Icon
                  style={{ fontSize: '60px' }}
                  theme="outlined"
                  type="youtube"
                />
              )}
              {item.status === 'loading' ? (
                <React.Fragment>
                  <div className="percent-bg" />
                  <div
                    className="percent"
                    style={{ height: `${item.percent}%` }}
                  />
                  <span className="percent-text">
                    {`${item.percent.toFixed(0)}%`}
                  </span>
                </React.Fragment>
              ) : (
                <div className="do">
                  <div>
                    <Icon onClick={() => this.view(item)} type="eye-o" />
                    {!disabled && (
                      <Icon
                        onClick={d => this.remove(index, d)}
                        type="delete"
                      />
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
          {uploadList.length >= length ? null : (
            <li className="upload-list__item">
              {disabled ? (
                <span>无</span>
              ) : (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for
                <label>
                  <input
                    accept={accpetVal}
                    disabled={disabled}
                    multiple={multiple}
                    onChange={this.onUpload}
                    style={{ display: 'none' }}
                    type="file"
                  />
                  <Icon style={{ fontSize: '30px' }} type="plus" />
                </label>
              )}
            </li>
          )}
        </ul>
        {label && (
          <p className="label">
            {required ? <span className="ant-form-item-required"></span> : null}
            {label}
          </p>
        )}
        <Modal
          onCancel={this.closeView}
          onOk={this.closeView}
          style={{ textAlign: 'center' }}
          title="预览"
          visible={showView}
          width={800}
        >
          {type === '0' ? (
            <img
              alt={viewItem.name}
              src={viewItem.src}
              style={{ maxWidth: '100%' }}
            />
          ) : (
            <video
              autoPlay
              controls
              src={viewItem.src}
              style={{ maxWidth: '100%' }}
            />
          )}
        </Modal>
      </div>
    );
  }
}

export default UploadImage;
