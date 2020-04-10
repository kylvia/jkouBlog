import React, { FC } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { connect, Link, Loading } from 'umi';
import './index.less'

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

const Login: FC = () => {
  const [form] = Form.useForm();
  const onFinish = values => {
    console.log('Success:', values);
  };
  return (
    <div className="container">
      <div className="content">
        <div className="top">
          <div className="header">
            <Link to="/">
              <span className="title">Ant Design</span>
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
              name="username"
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

export default Login;
