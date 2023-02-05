import React, { Component } from "react";
import swal from "sweetalert";

export default class Update extends Component {
  state = {
    origin: "",
    comment: "",
    startTime: "2022-01-01T08:00:00+08:00",
    expireTime: "2023-11-17T08:00:00+08:00",
  };

  fpost = async () => {
    console.log(this.state);
    await fetch("http://localhost:1926/api/url/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data is", data);
        if (data.code === 200) {
          swal(`更新短链接成功！`);
          this.refs.form.reset();
        }
        if (data.code === 400) {
          swal(`更新短链接失败！`);
        }
      })
      .catch((error) => console.log("error is", error));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.fpost();
  };

  saveFormData = (dataType) => {
    return (event) => {
      this.setState({ [dataType]: event.target.value });
    };
  };

  saveTimeData = (dataType) => {
    return (event) => {
      this.setState({ [dataType]: event.target.value + ":00+08:00" });
    };
  };

  render() {
    return (
      <div>
        <form ref="form">
          <strong htmlFor="basic-url" className="form-label">
            更新短网址
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
              name="origin"
              required
              onChange={this.saveFormData("origin")}
            />
          </div>
          <strong htmlFor="basic-url" className="form-label">
            备注（可选）
          </strong>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="短链接备注"
              name="comment"
              onChange={this.saveFormData("comment")}
            />
          </div>
          <strong htmlFor="basic-url" className="form-label">
            有效期自（可选）
          </strong>
          <div className="input-group mb-3">
            <input
              type="datetime-local"
              className="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="留空表示不限制"
              name="startTime"
              onChange={this.saveTimeData("startTime")}
            />
          </div>
          <strong htmlFor="basic-url" className="form-label">
            有效期至（可选）
          </strong>
          <div className="input-group mb-3">
            <input
              type="datetime-local"
              className="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="留空表示不限制"
              name="expireTime"
              onChange={this.saveTimeData("expireTime")}
            />
          </div>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handleSubmit}
          >
            更新
          </button>
        </form>
      </div>
    );
  }
}
