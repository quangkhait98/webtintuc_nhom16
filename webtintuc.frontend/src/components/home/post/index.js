import React, { Component } from "react";
import { connect } from "react-redux";
// import * as menuAction from "../../actions/menuAction";
import { bindActionCreators } from "redux";
import _ from "lodash";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb, Icon, Button } from "antd";
import { Form, Input } from "antd";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import NewsPost from "./newspost";
import NewsManage from "./newsmanage";
const { Header, Footer, Sider } = Layout;

class Post extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  //   componentDidMount() {
  //     this.props.actions.getCategory();
  //   }
  render() {
    // const { categories } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />

              <span>
                <Link to={`/post`} style={{ color: "white" }}>
                  Quản lý bài đăng
                </Link>
              </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>
                <Link to={`/post/newspost`} style={{ color: "white" }}>
                  Đăng bài
                </Link>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Switch>
            <Route exact path="/post" component={NewsManage} />
            <Route path="/post/newspost" component={NewsPost} />
          </Switch>
          {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        //getCategory: menuAction.getCategory
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  //categories: _.get(state, ["menuReducer", "categories"])
});

const WrappedRegistrationForm = Form.create({ name: "register" })(Post);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
