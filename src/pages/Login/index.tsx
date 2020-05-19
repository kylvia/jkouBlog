import React, { FC } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { connect, Link, Loading } from 'umi';
import { Dispatch } from 'redux';
import './index.less'
import { LoginState } from '@/pages/Login/model';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
interface propsType {
  login: LoginState,
  loading: Loading,
  dispatch: Dispatch<any>
}
interface LoginType {
  phone: number,
  password: string
}

const Login: FC<propsType> = ({ login, loading, dispatch }) => {
  const onFinish = async (values: LoginType) => {
    const res = await dispatch({
      type: 'login/loginUser',
      payload: values
    })
  };
  return (
    <div className="container">
      <div className="content">
        <div className="top">
          <div className="header">
            <Link to="/">
              <span className="title">登录</span>
            </Link>
          </div>
        </div>
        <div className="main">
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="用户名"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default connect(({login, loading}: {
  login: LoginState,
  loading: Loading
}) => ({loading: loading.models.login, login}))(Login);
