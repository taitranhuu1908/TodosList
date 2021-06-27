import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1, // all: -1, active: 1, deative: 0
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    // this.props.onFilter(
    //   name === "fiterName" ? value : this.state.filterName,
    //   name === "filterStatus" ? value : this.state.filterStatus
    // );
    this.setState({
      [name]: value,
    });
  };
  render() {
    var { tasks } = this.props;
    var { filterName, filterStatus } = this.state;
    var elmItem = tasks.map((task, index) => {
      return <TaskItem key={index} task={task} index={index} />;
    });
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Trạng Thái</th>
              <th className="text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  name="filterName"
                  value={filterName}
                  onChange={this.onChange}
                  className="form-control"
                />
              </td>
              <td>
                <select
                  name="filterStatus"
                  value={filterStatus}
                  onChange={this.onChange}
                  className="form-control"
                >
                  <option value={-1}>Tất Cả</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích Hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmItem}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, null)(TaskList);
