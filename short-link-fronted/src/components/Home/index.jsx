import React, { Component } from "react";
import "./index.css";
import axios from "axios";

export default class Home extends Component {
  state = {
    origin: "",
    short: "",
    comment: "",
    starTime: "2022-01-01T08:00:00+08:00",
    expireTime: "2023-11-17T08:00:00+08:00",
  };

  fpost = async () => {
    console.log(this.state);
    let res = await fetch("http://localhost:1926/api/url/create", {
      method: "post",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    });

    let json = await res.json();
    console.log(json);
  };

  fpost2 = () => {
    axios({
      method: "post",
      url: "http://localhost:1926/api/url/create",
      data: this.state,
    }).then((res) => {
      console.log(res);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.fpost2();
  };

  saveFormData = (dataType) => {
    return (event) => {
      this.setState({ [dataType]: event.target.value });
    };
  };

  render() {
    return (
      <form action="">
        <strong htmlFor="basic-url" className="form-label">
          原始网址
        </strong>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
            placeholder="在此输入想要缩短的网址"
            name="origin"
            required
            onChange={this.saveFormData("origin")}
          />
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handleSubmit}
          >
            缩短
          </button>
        </div>
        <strong htmlFor="basic-url" className="form-label">
          自定义短链（可选）
        </strong>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">
            https://xxx.com/
          </span>
          <input
            type="text"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
            placeholder="字母、数字，5-15位"
            name="short"
            onChange={this.saveFormData("short")}
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
            name="starttime"
            onChange={this.saveFormData("starttime")}
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
            name="expireTime"
            onChange={this.saveFormData("expireTime")}
          />
        </div>
      </form>
    );
  }
}
