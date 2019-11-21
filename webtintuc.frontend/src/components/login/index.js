import React, { Component } from "react";
import { connect } from "react-redux";
import * as loginAction from "../../actions/loginAction";
import { bindActionCreators } from "redux";
import image from "../../assets/images/3.png";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import {
  Input,
  Button,
  Modal,
  Tabs,
  Form,
  Icon,
  Checkbox,
  Avatar,
  Dropdown,
  Menu
} from "antd";
import Cookies from "js-cookie";
const { TabPane } = Tabs;
class Login extends Component {
  constructor(props) {
    super(props);
    this.onClickFaceBook = this.onClickFaceBook.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
  }

  onClickFaceBook() {
    window.location.href = `http://localhost:8001/auth/facebook/`;
  }
  onClickGoogle() {
    window.location.href = `http://localhost:8001/auth/google/`;
  }

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  clickLogout = () => {
    Cookies.remove("user");
    Cookies.remove("isAuthenticated");
    Cookies.remove("token");
    window.location.href = `http://localhost:3000/`;
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.clickLogout}
          >
            Thoát
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <React.Fragment>
        {this.props.isAuthenticated ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Avatar icon="user" />
            <div style={{ marginLeft: "10px" }}>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link">
                  {this.props.user.name} <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Button size="small" onClick={this.showModal}>
              Đăng nhập
            </Button>
            <Button
              size="small"
              style={{ background: "#9F224E" }}
              onClick={this.showModal}
            >
              Tạo tài khoản
            </Button>
          </div>
        )}

        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}
          closable={false}
          footer={null}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Đăng nhập" key="1">
              <div className="modalcontent">
                <div className="modalcontentleft">
                  <span style={{ textAlign: "center", marginBottom: "20px" }}>
                    Đăng nhập với email
                  </span>
                  <div>
                    <Form className="login-form">
                      <Form.Item>
                        {
                          <Input
                            prefix={
                              <Icon
                                type="user"
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
                            }
                            placeholder="Username"
                          />
                        }
                      </Form.Item>
                      <Form.Item>
                        {
                          <Input
                            prefix={
                              <Icon
                                type="lock"
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
                            }
                            type="password"
                            placeholder="Password"
                          />
                        }
                      </Form.Item>
                      <Form.Item>
                        <Checkbox>Remember me</Checkbox>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          style={{ width: "100%" }}
                        >
                          Log in
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                <div className="modalcontentright">
                  <span style={{ textAlign: "center", marginBottom: "20px" }}>
                    Đăng nhập với
                  </span>
                  <Button
                    icon="facebook"
                    size="default"
                    style={{ marginBottom: "20px" }}
                    onClick={this.onClickFaceBook}
                  >
                    Facebook
                  </Button>
                  <Button
                    icon="google"
                    size="default"
                    onClick={this.onClickGoogle}
                  >
                    Google
                  </Button>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        loginFacebook: loginAction.loginFacebook
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  isAuthenticated: _.get(state, ["loginReducer", "isAuthenticated"]),
  user: _.get(state, ["loginReducer", "user"])
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
