import React, { Component } from "react";
import { connect } from "react-redux";
import * as menuAction from "../../actions/menuAction";
import { bindActionCreators } from "redux";
import _ from "lodash";
import "./menu.css";
import logo from "../../assets/images/img_logo_home.gif";
import { Link } from "react-router-dom";
class MenuNews extends Component {
  componentDidMount() {
    this.props.actions.getCategory();
  }
  render() {
    const { categories } = this.props;
    console.log("categories", categories);
    return (
      <ul className="ulmenu">
        <li className="limenu">
          <Link to={`/`}>
            <img class="logo_icon_home" alt="" src={logo}></img>
          </Link>
        </li>
        {(categories || []).map(value => {
          if (value.newsType.length === 0) {
            return (
              <li className="limenu">
                <Link to={`/homepage/newstype/${value._id}`}>{value.name}</Link>
              </li>
            );
          } else {
            return (
              <li class="dropdown limenu">
                <a class="dropbtn amenu">{value.name}</a>
                <div class="dropdown-content">
                  {(value.newsType || []).map(value => {
                    return (
                      <Link to={`/homepage/newstype/${value._id}`}>
                        {value.name}
                      </Link>
                    );
                  })}
                </div>
              </li>
            );
          }
        })}
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getCategory: menuAction.getCategory
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  categories: _.get(state, ["menuReducer", "categories"])
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuNews);
