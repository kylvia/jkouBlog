import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Select, Input, Radio, Button, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { aticleDraft } from '@/pages/BackSystem/ArticleManagement/Blog/data';

interface BlogInfoType {
  visible: boolean,
  hideVisible: Function
  defaultVal: aticleDraft
}
const BlogInfo: FC<BlogInfoType> = ({ visible, hideVisible, sendData, defaultVal }) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        if(!values.tagValue){
          message.error('请输入文章标签！')
          return
        }
        sendData(values)
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
    }
  const handleCancel = () => {
    hideVisible()
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  return (<Modal
    destroyOnClose
    forceRender
    title="发布博客"
    visible={visible}
    maskClosable={false}
    onOk={handleOk}
    onCancel={handleCancel}
    okText="确认"
    cancelText="取消"
  >
    <Form form={form} initialValues={{ message: 0, ...defaultVal }}>
      <Form.List name="tagValue" label="文章标签">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? '文章标签' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入文章标签",
                      },
                    ]}
                    noStyle
                  >
                    <Input />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              {
                (fields.length < 5) && <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: '60%' }}
                  >
                    <PlusOutlined /> 添加标签
                  </Button>（最多添加5个标签）
                </Form.Item>
              }
            </div>
          );
        }}
      </Form.List>
      <Form.Item
        name="selectType"
        label="文章类型"
        rules={[{ required: true, message: '请选择文章类型!' }]}
      >
        <Select placeholder="请选择">
          <Select.Option key={1} value="原创">原创</Select.Option>
          <Select.Option key={2} value="转载">转载</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="selectCategories"
        label="博客分类"
        rules={[{ required: true, message: '请选择博客分类!' }]}
      >
        <Select placeholder="请选择">
          <Select.Option key="面试" value="面试">面试</Select.Option>
          <Select.Option key="心情窗口" value="心情窗口">心情窗口</Select.Option>
          <Select.Option key="程序录" value="程序录">程序录</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="selectGrade"
        label="文章等级"
        rules={[{ required: true, message: '请选择文章等级!' }]}
      >
        <Select placeholder="请选择">
          <Select.Option key={1} value={1}>☆</Select.Option>
          <Select.Option key={2} value={2}>☆☆</Select.Option>
          <Select.Option key={3} value={3}>☆☆☆</Select.Option>
          <Select.Option key={4} value={4}>☆☆☆☆</Select.Option>
          <Select.Option key={5} value={5}>☆☆☆☆☆</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="originalAuthor"
        label="文章作者"
        rules={[{ required: true, message: '请输入文章作者' }]}
      >
        <Input style={{ width: '50%' }} />
      </Form.Item>
      <Form.Item
        name="message"
        label="发布形式"
      >
        <Radio.Group>
          <Radio key="0" value="0">公开</Radio>
          <Radio key="1" value="1">私密</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  </Modal>);
};

export default BlogInfo;
