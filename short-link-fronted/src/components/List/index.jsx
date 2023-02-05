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
    console.log(webs);
    return webs.map((web) => {
      return (
        // <div key={web.id}>
        //   <div>origin:{web.origin}</div>
        //   <div>short:{web.short}</div>
        // </div>

        <ul className="list-group" key={web.id}>
          <li className="list-group-item">
            <div>原网址:{web.origin}</div>
            <div>短链接:http://localhost:1926/{web.short}</div>
          </li>
        </ul>
      );
    });
  }

  render() {
    return <div>{this.renderList()}</div>;
  }
}
