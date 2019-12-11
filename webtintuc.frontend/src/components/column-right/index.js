import React, { Component } from "react";
import { connect } from "react-redux";
import * as columnrightAction from "../../actions/columnrightAction";
import { bindActionCreators } from "redux";
import image from "../../assets/images/3.png";
import { Link } from "react-router-dom";
import _ from "lodash";

class ColumnRight extends Component {
  componentDidMount() {
    this.props.actions.getNewsestByNewsType("5dc6d81d4a99f935c06a259b");
  }
  render() {
    const { newsByNewsType } = this.props;
    return (
      <React.Fragment>
        <div className="box-cat">
          <div className="cat">
            <div className="main-cat">
              <a href="#">Tin từ bạn đọc</a>
            </div>
            <div className="clear" />
            <div className="cat-content">
              {(newsByNewsType || []).map((value, index) => {
                return (
                  <div className="col1">
                    <div className="news">
                      <img className="images_news" src={image} alt="" />
                      <h3 className="title">
                        <Link to={`/homepage/news/${value._id}`}>
                          {value.title}
                        </Link>
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
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getNewsestByNewsType: columnrightAction.getNewsestByNewsType
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  newsByNewsType: _.get(state, ["columnrightReducer", "newsByNewsType"])
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnRight);
