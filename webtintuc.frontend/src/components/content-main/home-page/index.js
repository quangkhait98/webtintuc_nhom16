import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as homepageAction from "../../../actions/homepageAction";
import _ from "lodash";
import { Link } from "react-router-dom";
import image from "../../../assets/images/3.png";
class HomePage extends Component {
  componentDidMount() {
    this.props.actions.getNewsByCategory();
  }

  render() {
    const { newsByCategory } = this.props;
    console.log("newsByCategory", newsByCategory);
    return (
      <React.Fragment>
        {(newsByCategory || []).map((value, index) => {
          return (
            <React.Fragment>
              <div className="clear" />
              <div className="box-cat">
                <div className="cat">
                  <div className="main-cat">
                    <a>{value.name}</a>
                  </div>
                  <div className="child-cat">
                    {value.newsType.map(value => {
                      return (
                        <Link to={`/homepage/newstype/${value._id}`}>{value.name}</Link>
                      );
                    })}
                  </div>
                  <div className="clear" />
                  <div className="cat-content">
                    <div className="col1">
                      <div className="news">
                        <h3 className="title">
                          <a></a>
                          <Link
                            to={`/homepage/news/${_.get(value, `news[0]._id`)}`}
                            className="txt_link"
                          >
                            {_.get(value, `news[0].title`)}
                          </Link>
                        </h3>
                        <img
                          className="images_news"
                          src= {_.get(value, `news[0].image`)}
                          align="left"
                          alt=""
                        />
                        <div className="des">
                          {_.get(value, `news[0].summary`)}
                        </div>
                        <div className="clear" />
                      </div>
                    </div>
                    <div className="col2">
                      {value.news.map((value, index) => {
                        if (index !== 0) {
                          return (
                            <p className="tlq">
                              <Link
                                to={`/homepage/news/${value._id}`}
                                className="txt_link"
                              >
                                {value.title}
                              </Link>
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getNewsByCategory: homepageAction.getNewsByCategory
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  newsByCategory: _.get(state, ["homepageReducer", "newsByCategory"])
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
