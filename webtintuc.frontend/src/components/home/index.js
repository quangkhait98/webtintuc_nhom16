import React, { Component } from "react";
import "./layout.css";
import logo from "../../assets/images/logo.gif";
import Menu from "../menu";
import Header from "../header";
import ColumnLeft from "../column-left";
import ColumnRight from "../column-right";
import Footer from "../footer";
import MainContent from "../content-main";
import Login from "../login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import quangcao1 from "../../assets/images/quangcao1.png";
import quangcao2 from "../../assets/images/quangcao2.png";
import quangcao3 from "../../assets/images/3.png";
import {
  Input,
} from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import moment from "moment";
const { Search } = Input;
moment.locale('vi');
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
            {moment().format('LLLL')}
            </div>
            <div className="left"></div>
            <a className="txt_24h left">
              RSS
            </a>
          </div>
          <div className="taskbarContainerright">
            <div className="block_search_web left">
              <Search placeholder="Tìm kiếm" size="small" />
              <Login />
            </div>
          </div>
        </div>
        <div id="wrap-vp">
          <div id="header-vp">
            <div id="logo">
              <img src={logo} alt="ac" />
            </div>
          </div>
          <div id="menu-vp">
            <Menu />
          </div>
          <div id="midheader-vp">
            <div id="left">
              <ul className="list_arrow_breakumb">
                <li className="start">
                  <a href="javascript">Trang nhất</a>
                  <span className="arrow_breakumb">&nbsp;</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="clear" />
          <div id="slide-vp">
            <Header />
            <div id="slide-right">
              <img width={250} src={quangcao1} alt="" />
              <div style={{ height: "10px" }} />
              <img width={250} src={quangcao2} alt="" />
              <div style={{ height: "10px" }} />
              <img width={250} src={quangcao3} alt="" />
              <div style={{ height: "10px" }} />
            </div>
          </div>
          <div id="content-vp">
            <div id="content-left">
              <ColumnLeft />
            </div>
            <div id="content-main">
              <MainContent />
            </div>
            <div id="content-right">
              <ColumnRight />
            </div>
            <div className="clear" />
          </div>
          <div id="thongtin"></div>
          <div className="clear" />
          <div id="footer">
            <Footer />
            <div className="ft-bot">
              <div className="bot1">
                <img src={logo} alt="" />
              </div>
              <div className="bot2">
                <p>
                  © <span>Copyright 1997 VnExpress.net,</span> All rights
                  reserved
                </p>
                <p>® VnExpress giữ bản quyền nội dung trên website này.</p>
              </div>
              <div className="bot3">
                <p>
                  <a href="http://fptad.net/qc/V/vnexpress/2014/07/">
                    VnExpress tuyển dụng
                  </a>
                  <a href="http://polyad.net/Polyad/Lien-he.htm">
                    Liên hệ quảng cáo
                  </a>
                  / <a href="/contactus">Liên hệ Tòa soạn</a>
                </p>
                <p>
                  <a
                    href="http://vnexpress.net/contact.htm"
                    style={{
                      color: "#686E7A",
                      font: "11px arial",
                      padding: "0 4px",
                      textDecoration: "none"
                    }}
                  >
                    Thông tin Tòa soạn:
                  </a>
                  <span>0123.888.0123</span> (HN) - <span>0129.233.3555</span>{" "}
                  (TP HCM)
                </p>
              </div>
            </div>
          </div>
        </div>
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
