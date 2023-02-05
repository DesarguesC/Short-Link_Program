import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default class Nav extends Component {
  logOut = async () => {
    await fetch("http://localhost:1926/api/user/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data is", data);
        if (data.code === 900) {
          swal(`退出登录失败`);
        } else if (data.code === 901) {
          swal("您已成功登出！");
        }
      })
      .catch((error) => console.log("error is", error));
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <Link className="navbar-brand" to="/">
                短链接生成器
              </Link>
              <div className="navbar-nav" style={{ margin: "0 10px" }}>
                <Link className="nav-link" to="/">
                  新增
                </Link>
                <Link className="nav-link" to="/delete">
                  还原
                </Link>
                <Link className="nav-link" to="/pause">
                  暂停
                </Link>
                <Link className="nav-link" to="/update">
                  更新
                </Link>
                <Link className="nav-link" to="/list">
                  列表
                </Link>
              </div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    注册
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    登录
                  </Link>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link"
                    style={{ cursor: `pointer` }}
                    onClick={this.logOut}
                  >
                    登出
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
