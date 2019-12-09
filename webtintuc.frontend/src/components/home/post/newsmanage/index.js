import React, { Component } from "react";
import { connect } from "react-redux";
import * as postAction from "../../../../actions/postAction";
import { bindActionCreators, compose } from "redux";
import _ from "lodash";
import "antd/dist/antd.css";
import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  InputNumber,
  Popconfirm,
  Form
} from "antd";
import { Table, Divider, Tag } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class NewsManage extends Component {
  constructor(props) {
    super(props);
    this.state = { editingKey: "" };
    this.columns = [
      {
        title: "Tiêu đề",
        dataIndex: "title",
        ellipsis: true,
        editable: true
      },
      {
        title: "Tóm tắt",
        dataIndex: "summary",
        ellipsis: true,
        editable: true
      },
      {
        title: "Nội dung",
        dataIndex: "content",
        ellipsis: true,
        editable: true
      },
      {
        title: "Số lượt xem",
        dataIndex: "viewNumber",
        width: "10%"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <a
                disabled={editingKey !== ""}
                onClick={() => this.edit(record.key)}
              >
                Edit
              </a>
              <Divider type="vertical" />
              <a onClick={() => this.deleteNews(record.key)}>Delete</a>
            </span>
          );
        }
      }
    ];
  }
  componentDidMount() {
    console.log("componentDidMount");
    this.props.actions.getMyNews();
  }

  deleteNews = key => {
    this.props.actions.deleteNews(key);
  };

  isEditing = record => record.key === this.state.editingKey;
  cancel = () => {
    this.setState({ editingKey: "" });
  };
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const { myNews } = this.props;
      const newsList = _.get(myNews, "news");
      (newsList || []).forEach(news => {
        if (news._id === key) {
          const diff = _.omitBy(row, function(v, k) {
            return news[k] === v;
          });
          if (!_.isEmpty(diff)) {
            console.log("diff", diff);
            this.props.actions.editNews(key, diff);
          }
        }
      });
      this.setState({ editingKey: "" });
    });
  }
  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const data = [];
    const { myNews } = this.props;
    const newsList = _.get(myNews, "news");
    (newsList || []).map(news => {
      const db = {
        key: news._id,
        title: news.title,
        summary: news.summary,
        content: news.content,
        viewNumber: news.viewsNumber
      };
      data.push(db);
    });

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "viewNumber" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <Content style={{ background: "#fff" }}>
        <Breadcrumb>
          <Breadcrumb.Item>Quản lý bài viết</Breadcrumb.Item>
        </Breadcrumb>
        <EditableContext.Provider value={this.props.form}>
          <Table
            components={components}
            bordered
            columns={columns}
            dataSource={data}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel
            }}
          />
        </EditableContext.Provider>
      </Content>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getMyNews: postAction.getMyNews,
        editNews: postAction.editNews,
        deleteNews: postAction.deleteNews
      },
      dispatch
    )
  };
};

const mapStateToProps = state => ({
  myNews: _.get(state, ["postReducer", "myNews"])
});
const EditableFormTable = Form.create()(NewsManage);
export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable);
