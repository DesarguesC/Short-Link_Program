import React, { Component } from "react";
import classnames from "classnames";
import "./index.css";
import swal from "sweetalert";

export default class Register extends Component {
  state = {
    name: "",
    email: "",
    pwd: "",
    secQ: "",
    secA: "",
  };

  fpost = async () => {
    await fetch("http://localhost:1926/api/user/register", {
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
          swal(`创建用户成功！`);
          this.refs.form.reset();
        } else if (data.code === 107) {
          swal("用户创建失败");
        } else if (data.code === 100) {
          swal("用户名已被使用");
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

  render() {
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit} ref="form">
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
