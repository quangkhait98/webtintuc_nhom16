import React, { Component } from "react";
import { connect } from "react-redux";
import * as newstypeAction from "../../../actions/newstypeAction";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { Pagination } from "antd";
import "antd/dist/antd.css";
import * as simpleAction from "../../../actions/simpleAction";
import image from "../../../assets/images/3.png";
import { Link } from "react-router-dom";
class NewsSearch extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const { search } = this.props.location;
    this.props.actions.searchNews(search.slice(3, search.length), 1);
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.props.location;
    const prevSearch = this.props.keyword;

    if (search.slice(3, search.length) !== prevSearch) {
      this.props.actions.searchNews(search.slice(3, search.length), 1);
    }
  }
  onChange(page, pageSize) {
    this.props.actions.searchNews(this.props.keyword, page);
  }

  displayPagination = (totalPage, currentPage) => {
    return (
      <Pagination
        current={currentPage}
        total={totalPage * 10}
        onChange={this.onChange}
      />
    );
  };

  render() {
    const { newsSearch, totalPage, currentPage } = this.props;
    return (
      <React.Fragment>
        <div>
          {(newsSearch || []).map(value => {
            return (
              <div>
                <div className="cat-content">
                  <div className="col0 col1">
                    <div className="news">
                      <h3 className="title">
                        <Link to={`/homepage/news/${value._id}`}>
                          {value.title}
                        </Link>
                      </h3>
                      <img
                        className="images_news"
                        src={value.image}
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
          {this.displayPagination(totalPage, currentPage)}
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        searchNews: simpleAction.searchNews
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  keyword: _.get(state, ["simpleReducer", "keyword"]),
  newsSearch: _.get(state, ["simpleReducer", "newsSearch"]),
  totalPage: _.get(state, ["simpleReducer", "totalPage"]),
  currentPage: _.get(state, ["simpleReducer", "currentPage"])
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsSearch);
