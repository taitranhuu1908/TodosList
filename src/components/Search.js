import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  };

  render() {
    return (
      <div className="input-group">
        <input
          name="keyword"
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa..."
          onChange={this.onChange}
          value={this.state.keyword}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onSearch}
          >
            Tìm
          </button>
        </span>
      </div>
    );
  }
}
