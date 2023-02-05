import React, { Component } from "react";

export default class List extends Component {
  state = { webs: [] };

  fget = async () => {
    await fetch("http://localhost:1926/api/url/get")
      .then((response) => response.json())
      .then((data) => {
        console.log("data is", data);
        this.setState({ webs: data.data[0].urls });
      })
      .catch((error) => console.log("error is", error));
  };

  componentDidMount() {
    this.fget();
  }

  renderList() {
    const { webs } = this.state;
    return webs.map((web) => {
      return (
        <li className="list-group-item" key={web.id}>
          <div>原网址:{web.origin}</div>
          <div>短链接:http://localhost:1926/{web.short}</div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="list-group" style={{ width: "75%", margin: "auto" }}>
        {this.renderList()}
      </ul>
    );
  }
}
