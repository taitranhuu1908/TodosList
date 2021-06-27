import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import { connect } from "react-redux";
import * as actions from "./actions/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskEditing: null,
      filter: {
        name: "",
        status: -1,
      },
      keyword: "",
      sortBy: "name",
      sortValue: 1,
    };
  }

  // Toggle Form
  onToggleForm = () => {
    var { itemEditing } = this.props;
    if (itemEditing && itemEditing.id !== "") {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: "",
      name: "",
      status: false,
    });
  };

  // Close Form
  onCloseForm = () => {
    this.props.onCloseForm();
  };
  // Open Form
  onOpenForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  //Find Item
  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        return (result = index);
      }
    });
    return result;
  };

  //Update Item
  onUpdate = (id) => {
    var { tasks, taskEditing } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing,
    });
    this.onOpenForm();
  };
  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase(),
    });
  };

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
  };

  render() {
    var { sortBy, sortValue } = this.state;
    var { isDisplayForm } = this.props;
    // Lọc
    // if (filter) {
    //   if (filter.name) {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.name) != -1;
    //     });
    //   }

    //   // tasks = tasks.filter((task) => {
    //   //   if (filter.status === -1) {
    //   //     return task;
    //   //   } else {
    //   //     return task.status === (filter.status === 1 ? true : false);
    //   //   }
    //   // });
    // }
    // if (keyword) {
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   });
    // }
    // if (sortBy === "name") {
    //   tasks.sort((a, b) => {
    //     if (a.name > b.name) return -sortValue;
    //     else if (a.name < b.name) return sortValue;
    //     else return 0;
    //   });
    // } else {
    //   tasks.sort((a, b) => {
    //     if (a.status > b.status) return -sortValue;
    //     else if (a.status < b.status) return sortValue;
    //     else return 0;
    //   });
    // }

    return (
      <div className="container">
        <div className="text-center">
          <h1> Quản Lý Công Việc </h1> <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-4" : ""}>
            <TaskForm /> {/* Task Form */}
          </div>
          <div className={isDisplayForm ? "col-8" : "col-12"}>
            <button
              type="button"
              onClick={this.onToggleForm}
              className="btn btn-primary mb-3 me-3"
            >
              Thêm Công Việc
            </button>
            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />{" "}
            {/* Control */}
            <div className="row mt-3">
              <TaskList onFilter={this.onFilter} />
            </div>
          </div>
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
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
