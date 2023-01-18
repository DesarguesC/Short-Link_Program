import React, { Component } from "react";
import swal from "sweetalert";

export default class Pause extends Component {
  state = {
    short: "",
  };

  fpost = async (e) => {
    await fetch("http://localhost:1926/api/url/pause", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data is", data);
        if (data.code === 200 && e.target.name === "pause") {
          swal(`暂停短链接成功！`);
          this.refs.form.reset();
        } else if (data.code === 200 && e.target.name === "restart") {
          swal(`重启短链接成功！`);
          this.refs.form.reset();
        }
      })
      .catch((error) => console.log("error is", error));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.fpost(e);
  };

  saveFormData = (dataType) => {
    return (event) => {
      this.setState({ [dataType]: event.target.value });
    };
  };

  render() {
    return (
      <div>
        <form ref="form">
          <strong htmlFor="basic-url" className="form-label">
            暂停短网址
          </strong>
          <div className="input-group mb-3" style={{ margin: "10px 0" }}>
            <span className="input-group-text" id="basic-addon3">
              http://localhost:1926/visit/
            </span>
            <input
              type="text"
              className="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="补全短网址"
              name="short"
              onChange={this.saveFormData("short")}
            />
            <button
              type="button"
              className="btn btn-outline-dark"
              name="pause"
              onClick={this.handleSubmit}
            >
              暂停
            </button>
          </div>
          <strong htmlFor="basic-url" className="form-label">
            重启短网址
          </strong>
          <div className="input-group mb-3" style={{ margin: "10px 0" }}>
            <span className="input-group-text" id="basic-addon3">
              http://localhost:1926/visit/
            </span>
            <input
              type="text"
              className="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="补全短网址"
              name="short"
              onChange={this.saveFormData("short")}
            />
            <button
              type="button"
              className="btn btn-outline-dark"
              name="restart"
              onClick={this.handleSubmit}
            >
              重启
            </button>
          </div>
        </form>
      </div>
    );
  }
}
