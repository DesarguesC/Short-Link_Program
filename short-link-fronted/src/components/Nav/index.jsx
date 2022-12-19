import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <Link className="navbar-brand" to="/">短链接生成器</Link>
                            <div className="navbar-nav" style={{ margin: "0 10px" }}>
                                <Link className="nav-link" to='/'>新增</Link>
                                <Link className="nav-link" to='/delete'>还原</Link>
                                <Link className="nav-link" to='/pause'>暂停</Link>
                                <Link className="nav-link" to='/update'>更新</Link>
                            </div>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">注册</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">登录</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav >
            </div >
        )
    }
}
