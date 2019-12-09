import React, { Component } from "react";
import { connect } from "react-redux";
import * as simpleAction from "../../actions/simpleAction";
import { bindActionCreators } from "redux";
import image from "../../assets/images/3.png";
import _ from "lodash";
import { Link } from "react-router-dom";
class Header extends Component {
  componentDidMount() {
    this.props.actions.getNewsest();
  }

  render() {
    const { newsest } = this.props;
    return (
      <div id="slide-left">
        {(newsest || []).map((value, index) => {
          if (index === 0) {
            return (
              <div id="slideleft-main">
                <img
                  src={value.image}
                  alt=""
                  style={{width:"490px", height: "200px"}}
                />
                <br />
                <h2 className="title">
                  <Link to={`/homepage/news/${value._id}`}>{value.title}</Link>
                </h2>
                <div className="des">{value.summary}</div>
              </div>
            );
          }
        })}

        <div id="slideleft-scroll">
          <div className="content_scoller width_common">
            <ul>
              {(newsest || []).map((value, index) => {
                if (index !== 0) {
                  return (
                    <li>
                      <div className="title_news">
                        <Link to={`/homepage/news/${value._id}`} className="txt_link">
                          {value.title}
                        </Link>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          {/* <div id="gocnhin">
            <img alt="" src={image} width="100%" />
            <div className="title_news" />
          </div> */}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getNewsest: simpleAction.getNewsest
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  newsest: _.get(state, ["simpleReducer", "newsest"])
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
