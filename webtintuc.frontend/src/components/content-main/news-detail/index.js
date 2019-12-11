import React, { Component } from "react";
import { connect } from "react-redux";
import * as newsdetailAction from "../../../actions/newsdetailAction";
import { bindActionCreators } from "redux";
import image from "../../../assets/images/3.png";
import _ from "lodash";
import {
  Comment,
  Tooltip,
  List,
  Avatar,
  Form,
  Button,
  Input,
  notification
} from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class NewsDetail extends Component {
  state = {
    submitting: false,
    value: ""
  };

  componentDidMount() {
    console.log("aaaaaaaaaa");
    const {
      match: { params }
    } = this.props;
    this.props.actions.getNewsDetail(params.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isProcessing === true) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      match: { params }
    } = this.props;
    if (prevProps.newsdetail._id !== params.id) {
      this.props.actions.getNewsDetail(params.id);
    }
  }

  handleSubmit = () => {
    const user = _.isUndefined(Cookies.get("user"))
      ? null
      : JSON.parse(Cookies.get("user").slice(2, Cookies.get("user").length));
    if (!this.state.value || user === null) {
      console.log("pass");
      this.openNotification();
      return;
    }

    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: ""
      });
    }, 500);
    this.props.actions.postComment(this.props.newsId, this.state.value);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  openNotification = () => {
    notification.open({
      message: "Thông báo",
      description: "Bạn cần đăng nhập để thực hiện bình luận"
    });
  };

  render() {
    const { newsdetail, newsSameType, comments } = this.props;
    const user = _.isUndefined(Cookies.get("user"))
      ? null
      : JSON.parse(Cookies.get("user").slice(2, Cookies.get("user").length));
    console.log("newsSameType", comments);
    const { submitting, value } = this.state;
    const displayComments = [];
    (comments || []).map(comment => {
      var time = moment(`${comment.createdDate}`).format("X");
      const cmt = {
        author: comment.user.name,
        avatar: _.get(comment, "user.avatar"),
        content: <p>{comment.content}</p>,
        datetime: (
          <Tooltip title={moment.unix(time).format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment.unix(time).fromNow()}</span>
          </Tooltip>
        )
      };
      displayComments.push(cmt);
    });

    return (
      <React.Fragment>
        {/* <h1 className="title">{newsdetail.title}</h1>
        <div className="des">{newsdetail.summary}</div> */}
        <div className="chitiet">
          {/*noi dung*/}
          <div dangerouslySetInnerHTML={{ __html: newsdetail.content }} />

          {/*//noi dung*/}
        </div>
        <div className="clear" />
        <a
          className="btn_quantam"
          id="vne-like-anchor-1000000-3023795"
          href="#"
          total-like={21}
        />
        <div className="number_count">
          <span id="like-total-1000000-3023795">{newsdetail.viewsNumber}</span>
        </div>
        {/*face*/}
        <div className="left">
          <div
            className="fb-like fb_iframe_widget"
            data-send="false"
            data-layout="button_count"
            data-width={450}
            data-show-faces="true"
            data-href="http://vnexpress.net/tin-tuc/the-gioi/ukraine-gianh-kiem-soat-nhieu-khu-vuc-gan-hien-truong-mh17-3023795.html"
            fb-xfbml-state="rendered"
            fb-iframe-plugin-query="app_id=&href=http%3A%2F%2Fvnexpress.net%2Ftin-tuc%2Fthe-gioi%2Fukraine-gianh-kiem-soat-nhieu-khu-vuc-gan-hien-truong-mh17-3023795.html&layout=button_count&locale=en_US&sdk=joey&send=false&show_faces=true&width=450"
          />
        </div>
        {/*twister*/}
        <div className="left" />
        {/*google*/}
        <div className="left">
          <div
            id="___plusone_0"
            style={{
              textIndent: "0px",
              margin: "0px",
              padding: "0px",
              borderStyle: "none",
              float: "none",
              lineHeight: "normal",
              fontSize: "1px",
              verticalAlign: "baseline",
              display: "inline-block",
              width: "90px",
              height: "20px",
              background: "transparent"
            }}
          />
        </div>
        <div className="clear" />
        <div id="tincungloai">
          <div className="clear" />
          <ul>
            {(newsSameType || []).map(value => {
              return (
                <li style={{ width: "170px", height: "150px" }}>
                  <a href="#">
                    <img
                      src={value.image || image}
                      style={{ width: "160px", height: "80px" }}
                    />
                  </a>
                  <br />
                  <Link to={`/homepage/news/${value._id}`} className="title">
                    {value.title}
                  </Link>
                  <span className="no_wrap"></span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="clear" />
        <div>
          {comments.length > 0 && <CommentList comments={displayComments} />}
          <Comment
            avatar={
              <Avatar
                src={
                  user
                    ? user.avatar
                    : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                }
                alt="Han Solo"
              />
            }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getNewsDetail: newsdetailAction.getNewsDetail,
        getnewssametype: newsdetailAction.getnewssametype,
        postComment: newsdetailAction.postComment
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  newsdetail: _.get(state, ["newsdetailReducer", "newsdetail"]),
  newsSameType: _.get(state, ["newsdetailReducer", "newsSameType"]),
  isProcessing: _.get(state, ["newsdetailReducer", "isProcessing"]),
  comments: _.get(state, ["newsdetailReducer", "comments"]),
  user: _.get(state, ["loginReducer", "user"]),
  newsId: _.get(state, ["newsdetailReducer", "newsId"])
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
