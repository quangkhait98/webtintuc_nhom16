import React, { Component } from "react";
import { connect } from "react-redux";
import * as footerAction from "../../actions/footerAction";
import { bindActionCreators } from "redux";
import _ from "lodash";
class Footer extends Component {
  // componentDidMount() {
  //   this.props.actions.getCategory();
  // }
  render() {
    const { categories } = this.props;
    return (
      <React.Fragment>
        <div className="thongtin-title">
          <div className="right">
            <a href="#">
              <span className="SetHomePage ico_respone_01">&nbsp;</span>Đặt
              VnExpress làm trang chủ
            </a>
            <a href="#">
              <span className="top">&nbsp;</span>Về đầu trang
            </a>
          </div>
        </div>
        <div className="thongtin-content">
          {(categories || []).map((value, index) => {
            return (
              <ul className="ulBlockMenu">
                <li className="liFirst">
                  <h4>
                    <a className="mnu_giaoduc" href="/tin-tuc/giao-duc/">
                      {value.name}
                    </a>
                  </h4>
                </li>
                {value.newsType.map(value => {
                  return (
                    <li className="liFollow">
                      <h5>
                        <a href="/tin-tuc/the-gioi/">{value.name}</a>
                      </h5>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        //getCategory: footerAction.getCategory
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  categories: _.get(state, ["menuReducer", "categories"])
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
