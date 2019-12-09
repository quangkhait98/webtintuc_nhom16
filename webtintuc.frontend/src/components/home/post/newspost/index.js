import React, { Component } from "react";
import { connect } from "react-redux";
import * as postAction from "../../../../actions/postAction";
import { bindActionCreators } from "redux";
import _ from "lodash";
import "antd/dist/antd.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Layout, Menu, Breadcrumb, Icon, Button, notification } from "antd";
import { Form, Input } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { Redirect, useHistory, withRouter } from "react-router-dom";
const { Content } = Layout;

class NewsPost extends Component {
  handleSubmitForm = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.postNews({
          title: _.get(values, "title"),
          content: _.get(values, "content.blocks[0].text"),
          summary: _.get(values, "summary.blocks[0].text")
        });
        notification.success({
          message: "Thông báo",
          description: "Bạn vừa đăng một bài viết.",
          onClick: () => this.props.history.push("/post")
        });
        setTimeout(() => this.props.history.push("/post"), 3000);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Content style={{ background: "#fff" }}>
        <Breadcrumb>
          <Breadcrumb.Item>Đăng bài viết</Breadcrumb.Item>
        </Breadcrumb>
        <Form onSubmit={this.handleSubmitForm}>
          <Form.Item label="Tiêu đề ">
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Please input title !"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Tóm tắt">
            {getFieldDecorator("summary", {
              rules: [
                {
                  required: true,
                  message: "Please input summary !"
                }
              ]
            })(
              <Editor
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            )}
          </Form.Item>
          <Form.Item label="Nội dung">
            {getFieldDecorator("content", {
              rules: [
                {
                  required: true,
                  message: "Please input content !"
                }
              ]
            })(
              <Editor
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            )}
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit">
              Đăng bài
            </Button>
          </Form.Item>
        </Form>
      </Content>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        postNews: postAction.postNews
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({});

const WrappedRegistrationForm = Form.create({ name: "postnews" })(NewsPost);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm)
);
