import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }

  componentDidMount() {
    if (this.props.itemEditing) {
      this.setState({
        id: this.props.itemEditing.id,
        name: this.props.itemEditing.name,
        status: this.props.itemEditing.status,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.itemEditing) {
      this.setState({
        id: nextProps.itemEditing.id,
        name: nextProps.itemEditing.name,
        status: nextProps.itemEditing.status,
      });
    } else if (!nextProps.itemEditing) {
      this.setState({
        id: "",
        name: "",
        status: false,
      });
    }
  }

  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSave(this.state);
    this.onClear();
    this.onCloseForm();
  };

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  render() {
    var { id } = this.state;
    if (!this.props.isDisplayForm) return "";

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{id != "" ? "Cập nhật" : "Thêm"}</h3>
          <button className="btn btn-danger" onClick={this.onCloseForm}>
            x
          </button>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                name="name"
                onChange={this.onChange}
                className="form-control"
                value={this.state.name}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              name="status"
              onChange={this.onChange}
              required="required"
              value={this.state.status}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Thêm
              </button>
              &nbsp;
              <button
                type="button"
                onClick={this.onClear}
                className="btn btn-danger"
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSave: (task) => {
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
