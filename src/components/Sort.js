import React, { Component } from "react";

export default class Sort extends Component {
  constructor(props) {
    super(props);
  }

  onClick = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue);
  };

  render() {
    return (
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Sắp Xếp
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li
            onClick={() => this.onClick("name", 1)}
            className={
              this.props.sortBy === "name" && this.props.sortValue === 1
                ? "bg-success text-white"
                : ""
            }
          >
            <a role="button">Tên A-Z</a>
          </li>
          <li
            onClick={() => this.onClick("name", -1)}
            className={
              this.props.sortBy === "name" && this.props.sortValue === -1
                ? "bg-success text-white"
                : ""
            }
          >
            <a role="button">Tên Z-A</a>
          </li>
          <li
            onClick={() => this.onClick("status", 1)}
            className={
              this.props.sortBy === "status" && this.props.sortValue === 1
                ? "bg-success text-white"
                : ""
            }
          >
            <a role="button">Trạng Thái Kích Hoạt</a>
          </li>
          <li
            onClick={() => this.onClick("status", -1)}
            className={
              this.props.sortBy === "status" && this.props.sortValue === -1
                ? "bg-success text-white"
                : ""
            }
          >
            <a role="button">Trạng Thái Ẩn</a>
          </li>
        </ul>
      </div>
    );
  }
}
