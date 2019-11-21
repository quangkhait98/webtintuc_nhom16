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
              <a href="#">{_.get(newsByNewsType, "[0].newsType.name")}</a>
            </div>
            <div className="clear" />
            <div className="cat-content">
              {(newsByNewsType || []).map((value, index) => {
                if (index === 0) {
                  return (
                    <div className="col1">
                      <div className="news">
                        <h3 className="title">
                          <Link to={`/news/${value._id}`}>{value.title}</Link>
                        </h3>
                        <img
                          className="images_news"
                          src={image}
                          align="left"
                          alt=""
                        />
                        <div className="des">{value.summary}</div>
                        <div className="clear" />
                      </div>
                    </div>
                  );
                }
              })}

              <div className="col2">
                {(newsByNewsType || []).map((value, index) => {
                  if (index !== 0) {
                    return (
                      <h3 className="tlq">
                      <Link to={`/news/${value._id}`}>{value.title}</Link>
                      </h3>
                    );
                  }
                })}
              </div>
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
