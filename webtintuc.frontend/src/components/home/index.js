import React, { Component } from "react";
import "./layout.css";
import Login from "../login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { Input } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import Main from "./main";
import Post from "./post";
import Cookies from "js-cookie";
import {
  Route,
  Link,
  BrowserRouter,
  Redirect,
  Redirect as Router,
  Switch,
  useLocation,
  withRouter
} from "react-router-dom";
const { Search } = Input;
moment.locale("vi");

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Cookies.get("isAuthenticated") === "true" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/homepage" />
      )
    }
  />
);

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

const removeVietNameseAccent = str => {
  if (!str) {
    return undefined;
  }
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  str = str.replace(/\s/g, "");
  return str;
};

class Home extends Component {
  constructor(props) {
    super(props);
  }

  onSearch = value => {
    if (value !== "") {
      this.props.history.push(
        `/homepage/newsSearch?q=${removeVietNameseAccent(value)}`
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="taskbar">
          <div className="taskbarContainerleft">
            <div className="txt_timer left" id="clockPC">
              {moment().format("LLLL")}
            </div>
            <div className="left"></div>
            <a className="txt_24h left">RSS</a>
          </div>
          <div className="taskbarContainerright">
            <div className="block_search_web left">
              <Search
                placeholder="Tìm kiếm"
                size="small"
                enterButton={true}
                onSearch={this.onSearch}
              />
              <Login />
            </div>
          </div>
        </div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/homepage" />
          </Route>
          <Route path="/homepage" component={Main} />
          <PrivateRoute path="/post" component={Post} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

const mapStateToProps = state => ({
  //newsest: _.get(state, ["simpleReducer", "newsest"])
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
