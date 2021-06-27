import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";
export default class Control extends Component {
  render() {
    return (
      <div className="row mt-15">
        <div className="col-6">
          <Search onSearch={this.props.onSearch} />
        </div>
        <div className="col-6">
          <Sort
            onSort={this.props.onSort}
            sortBy={this.props.sortBy}
            sortValue={this.props.sortValue}
          />
        </div>
      </div>
    );
  }
}
