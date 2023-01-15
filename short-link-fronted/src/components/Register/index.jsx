import React, { Component } from "react";
import classnames from "classnames";
import "./index.css";
import axios from "axios";

export default class Register extends Component {
  state = {
    name: "",
    email: "",
    pwd: "",
    // passwordConfirm: "",
    secQ: "",
    secA: "",
  };

  fpost = async () => {
    console.log(this.state);
    let res = await fetch("http://localhost:1926/api/user/register", {
      method: "post",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    });

    let json = await res.json();
    console.log(json);

    if (res.status === 100) {
      alert("用户名已被使用");
    } else if (res.status === 101) {
      alert("用户创建成功");
    } else if (res.status === 107) {
      alert("用户创建失败");
    }
  };

  fpost2 = () => {
    axios({
      method: "post",
      url: "http://localhost:1926/api/user/register",
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
      <div className="content">
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              用户名
            </label>
            <input
              type="text"
              className={classnames("form-control")}
              id="userName"
              name="name"
              required
              onChange={this.saveFormData("name")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              邮箱
            </label>
            <input
              type="email"
              className={classnames("form-control")}
              id="email"
              aria-describedby="emailHelp"
              name="email"
              required
              onChange={this.saveFormData("email")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              密码
            </label>
            <input
              type="password"
              className={classnames("form-control")}
              id="password"
              name="pwd"
              required
              onChange={this.saveFormData("pwd")}
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">
              确认密码
            </label>
            <input
              type="password"
              className={classnames("form-control")}
              id="passwordConfirm"
              name="passwordConfirm"
              required
              onChange={this.saveFormData("passwordConfirm")}
            />
          </div> */}
          <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">
              密保问题
            </label>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className={classnames("form-control")}
              placeholder="请输入密保问题"
              id="secQ"
              name="secQ"
              required
              onChange={this.saveFormData("secQ")}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className={classnames("form-control")}
              placeholder="请输入密保问题的答案"
              id="secA"
              name="secA"
              required
              onChange={this.saveFormData("secA")}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            点击注册
          </button>
        </form>
      </div>
    );
  }
}
