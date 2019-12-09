import React, { Component } from "react";
import { connect } from "react-redux";
import * as columnleftAction from "../../actions/columnleftAction";
import { bindActionCreators } from "redux";
import image from "../../assets/images/3.png";
import _ from "lodash";
import { Link } from "react-router-dom";

class ColumnLeft extends Component {
  componentDidMount() {
    this.props.actions.getNewsViewMost();
  }
  render() {
    const { newsViewMost } = this.props;
    return (
      <div>
        <div className="box-cat">
          <div className="cat">
            <div className="main-cat">
              <a href="#">Tin xem nhiều</a>
            </div>
            <div className="clear" />
            <div className="cat-content">
              {(newsViewMost || []).map(value => {
                return (
                  <div className="col1">
                    <div className="news">
                      <img className="images_news" src={value.image} alt="" />
                      <h3 className="title">
                        <Link to={`/homepage/news/${value._id}`}>{value.title}</Link>
                        <span className="hit">{value.viewsNumber}</span>
                      </h3>
                      <div className="clear" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getNewsViewMost: columnleftAction.getNewsViewMost
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  newsViewMost: _.get(state, ["columnleftReducer", "newsViewMost"])
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnLeft);
