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
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data is", data);
        if (data.code === 102) {
          swal(`邮箱或密码错误`);
        } else if (data.code === 103) {
          swal(`登录成功！`);
        } else if (data.code === 105) {
          swal(`登陆失败`);
        }
      })
      .catch((error) => console.log("error is", error));
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
