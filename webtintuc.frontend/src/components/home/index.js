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
  useLocation
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

class Home extends Component {
  constructor(props) {
    super(props);
  }

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
              <Search placeholder="Tìm kiếm" size="small" />
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
    actions: bindActionCreators(
      {
        //getNewsest: simpleAction.getNewsest
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  //newsest: _.get(state, ["simpleReducer", "newsest"])
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
