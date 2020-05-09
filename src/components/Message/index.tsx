import React, { createElement, FC, Fragment, useState } from 'react';
import { Comment, Avatar, Tooltip, Form, Button, Input, List, Modal, message } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { Head1Icon, Head2Icon, Head3Icon, Head4Icon } from '@/components/Icon';
const { TextArea } = Input;
import { commentsType } from '@/pages/Detail/data.d';
import './index.less'

interface MessageType{
  comments: commentsType[] | []
  likeFunc: Function
  handleCommentSubmit: Function
}
interface CommentListType{
  comments: commentsType[] | []
  likeFunc: Function
  setVisible: Function
  setCommentType: Function
}
interface CommentListType{
  item: commentsType
  likeFunc: Function
  reply: Function
}
const avatarArr = [Head1Icon, Head2Icon, Head3Icon, Head4Icon]
const CommentItem = ({ item, likeFunc, reply }: CommentListType) => (
  <Comment
    actions={[
      <span key="comment-basic-reply-to"
            onClick={() => reply({commentId: item.id, comName: item.commentName})}><MessageOutlined className="commentIcon"/>回复</span>,
    ]}
    author={<a>{item.commentName}</a>}
    avatar={createElement(avatarArr[item.avatarType] || Head1Icon, {
      className: 'avatar',
    })}
    content={
      <p>{item.message}</p>
    }
    datetime={
      <Tooltip>
        <span>{item.createTime}</span>
      </Tooltip>
    }
  >
    {item.reportComments.map((i: Partial<commentsType>) => <Comment
      key={i.rid}
      actions={[
        <span key="comment-basic-reply-to"
              onClick={() => reply({ commentId: i.reportedId, comName: i.repName })}><MessageOutlined
          className="commentIcon"/>回复</span>,
      ]}
      author={<a>{i.repName}: @{i.comName}</a>}
      content={
        <p>{i.repMess}</p>
      }
      datetime={
        <Tooltip title={i.rcreateTime}>
          <span>{i.rcreateTime}</span>
        </Tooltip>
      }
    />)}
  </Comment>
);
const CommentList: FC<CommentListType> = ({ comments, likeFunc, setVisible, setCommentType }) => {

  const reply = (obj: {commentId: string, comName: string} | '') => {
    setVisible(true)
    setCommentType(obj)
  }
  return (
    <List
      dataSource={comments}
      header={<p><span style={{float: 'left'}}>{`${comments.length} ${comments.length > 1 ? '条评论' : 'reply'}`}</span><a onClick={() => reply()} style={{float: 'right'}}>发表评论</a></p>}
      itemLayout="horizontal"
      renderItem={item => <CommentItem item={item} likeFunc={likeFunc} reply={reply} />}
    />
  );
}
const Message: FC<MessageType> = ({ comments, likeFunc, handleCommentSubmit }) => {
  const [visible, setVisible] = useState(false)
  const [commentType, setCommentType] = useState('')
  const [form] = Form.useForm();
  const  handleSubmit = async () => {
    form
      .validateFields()
      .then(async values => {
        !commentType ? values.avatarType = Math.floor((Math.random()*avatarArr.length)) : values.repAvatarType = Math.floor((Math.random()*avatarArr.length))
        const res = await handleCommentSubmit(values, commentType)
        if (res === 200) {
          setVisible(false)
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <Fragment>
      <div className="commentsList">
        {comments.length > 0 ? <CommentList
          likeFunc={likeFunc}
          setVisible={setVisible}
          setCommentType={setCommentType}
          comments={comments} /> : <p><Button className="commentsBtn" type="link" onClick={() => setVisible(true)}>发表评论</Button></p>}
      </div>
      <Modal
        destroyOnClose
        forceRender
        title="评论"
        visible={visible}
        maskClosable={false}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="发表"
        cancelText="取消">
        <Form form={form}>
          <Form.Item
            name={!commentType ? "commentName" : "repCommentName"}
            label="您的大名"
            rules={[{ required: true, message: '请输入您的大名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={!commentType ? "commentEmail" : "repCommentEmail"}
            label="电子邮件"
            rules={[{ required: true, message: '请输入电子邮件!' }, {type: 'email', message: '请输入正确的电子邮件格式!'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={!commentType ? "message" : "repMess"}
            label="您的留言"
            rules={[{ required: true, message: '请输入您的留言!' }]}>
            <TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Message;
