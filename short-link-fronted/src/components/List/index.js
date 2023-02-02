import React, { Component } from "react";

export default class List extends Component {
  fget = async () => {
    await fetch("http://localhost:1926/api/url/get")
      .then((response) => response.json())
      .then((data) => {
        console.log("data is", data);
      })
      .catch((error) => console.log("error is", error));
  };

  componentDidMount() {
    this.fget();
  }

  render() {
    return <div>List</div>;
  }
}
