import React, { Component } from "react";
import classnames from "classnames";
import swal from "sweetalert";
// import axios from "axios";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  fpost = async () => {
    await fetch("http://localhost:1926/api/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((res) => {
      console.log("响应", res);
      if (res.status === 102) {
        swal("邮箱或密码错误");
      } else if (res.status === 103) {
        swal("登录成功");
      } else if (res.status === 105) {
        swal("登录信息无效");
      } else if (res.status === 200) {
        swal("登录成功！");
      }
    });
  };

  // fpost2 = () => {
  //   axios({
  //     method: "post",
  //     url: "/user/login",
  //     data: this.state,
  //   }).then((res) => {
  //     console.log(res);
  //   });
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    // const { email, password } = this.state;
    // alert(`你输入的邮箱是：${email}，你输入的密码是：${password}`);
    this.fpost();
  };

  saveFormData = (dataType) => {
    return (event) => {
      this.setState({ [dataType]: event.target.value });
    };
  };

  render() {
    return (
      <div>
        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                邮箱
              </label>
              <input
                type="email"
                className={classnames("form-control")}
                id="email"
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
                name="password"
                required
                onChange={this.saveFormData("password")}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              点击登录
            </button>
          </form>
        </div>
      </div>
    );
  }
}
