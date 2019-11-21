import React, { Component } from "react";
import { connect } from "react-redux";
import * as newstypeAction from "../../../actions/newstypeAction";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { Pagination } from "antd";
import "antd/dist/antd.css";
import image from "../../../assets/images/3.png";
import { Link } from "react-router-dom";
class NewsType extends Component {
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.actions.getNewsByNewsType(params.id, 1);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      match: { params }
    } = this.props;

    if (_.get(prevProps.newsByNewsType, "[0].newsType._id") !== params.id) {
      this.props.actions.getNewsByNewsType(params.id, 1);
    }
  }

  render() {
    const { newsByNewsType, totalPage, currentPage } = this.props;
    return (
      <React.Fragment>
        <div>
          Trang chủ >> {_.get(newsByNewsType, "[0].category.name")} >>
          {_.get(newsByNewsType, "[0].newsType.name")}
        </div>
        <div>
          {(newsByNewsType || []).map(value => {
            return (
              <div>
                <div className="cat-content">
                  <div className="col0 col1">
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
                </div>
                <div className="clear" />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination current={currentPage} total={totalPage} />
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getNewsByNewsType: newstypeAction.getNewsByNewsType
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  newsByNewsType: _.get(state, ["newstypeReducer", "newsByNewsType"]),
  totalPage: _.get(state, ["newstypeReducer", "totalPage"]),
  currentPage: _.get(state, ["newstypeReducer", "currentPage"])
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsType);
