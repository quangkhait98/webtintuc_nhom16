import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as simpleAction from "../../actions/simpleAction";
import _ from "lodash";
import { Link } from "react-router-dom";
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
  Menu,
  notification
} from "antd";
import Cookies from "js-cookie";
const { TabPane } = Tabs;
class Login extends Component {
  constructor(props) {
    super(props);
    this.onClickFaceBook = this.onClickFaceBook.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      if (Cookies.get("isAuthenticated") === "true") {
        this.props.actions.checkToken();
      }
    }, 3000);
    const isAuthenticated =
      Cookies.get("isAuthenticated") === "true" ? true : false;
    const token = Cookies.get("token");
    const user = _.isUndefined(Cookies.get("user"))
      ? null
      : JSON.parse(Cookies.get("user").slice(2, Cookies.get("user").length));
    this.setState({ isAuthenticated, token, user });
  }

  onClickFaceBook() {
    window.location.href = `${process.env.REACT_APP_REST_API_LOCATION}/auth/facebook/`;
  }
  onClickGoogle() {
    window.location.href = `${process.env.REACT_APP_REST_API_LOCATION}/auth/google/`;
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
    Cookies.remove("isAuthenticated");
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.href = window.location.href;
  };

  openNotification = () => {
    notification.open({
      message: "Thông báo",
      description: "Phiên đăng nhập của bạn đã hết hạn !!!"
    });
  };

  componentDidUpdate() {
    if (
      Cookies.get("isAuthenticated") === "true" &&
      this.props.isExpied === true
    ) {
      Cookies.remove("isAuthenticated");
      Cookies.remove("token");
      Cookies.remove("user");
      this.openNotification();
    }
  }

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
        <Menu.Item>
          <Link to={"/post"}>Đăng bài</Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <React.Fragment>
        {this.state.isAuthenticated && this.props.isExpied === undefined ? (
          <div
            style={{ display: "flex", flexDirection: "row", width: "170px" }}
          >
            <Avatar icon="user" src={this.state.user.avatar} />
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link">
                  {this.state.user.name} <Icon type="down" />
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
        checkToken: simpleAction.checkToken
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  isExpied: _.get(state, ["simpleReducer", "isExpied"])
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
