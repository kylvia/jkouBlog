import React, { FC, useEffect, useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { personalPageModelState } from './model';
import { connect } from 'umi';
import { Dispatch } from 'redux';

interface propsType {
  personalPageModel: personalPageModelState,
  dispatch: Dispatch
}
const PersonalPage: FC<propsType> = ({personalPageModel: {userMess}, dispatch}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch({
      type: 'personalPageModel/getUserMess',
      payload: {
        username: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).username : '',
      }
    })
  }, [])
  useEffect(() => {
    form.setFieldsValue(userMess)
  }, [userMess])
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 8 },
  };
  const onFinish = async (e) => {
    console.log(e)
    const res = await dispatch({
      type: 'personalPageModel/insUserMess',
      payload: e
    })
    if (res.status === 200) {
      res.data && (localStorage.setItem('userInfo', JSON.stringify(res.data)));
      message.success('修改成功！')
      // form.setFieldsValue(res.data)
    }
  }
  console.log(userMess)
  return (<Card title="个人资料">
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{ ...userMess }}>
      <Form.Item name="username" label="姓名" rules={[{ required: true, message: '请输入姓名!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="电话" rules={[{ required: true, message: '请输入电话!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="qq" label="QQ" rules={[{ required: true, message: '请输入QQ!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: '请输入Email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="intro" label="简介" rules={[{ required: true, message: '请输入简介!' }]}>
        <Input.TextArea maxLength={250} />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) => {
          return getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          修改
        </Button>
      </Form.Item>
    </Form>
  </Card>);
};

export default connect(({personalPageModel}: {personalPageModel: personalPageModelState}) => ({personalPageModel}))(PersonalPage);
