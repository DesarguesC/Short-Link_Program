import React, { Component } from 'react'
import classnames from 'classnames';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    fpost = async () => {
        let res = await fetch('/login', {
            method: 'post',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })

        let json = await res.json()
        console.log(json)

        if (res.status === 102) {
            alert('邮箱或密码错误')
        } else if (res.status === 103) {
            alert('登录成功')
        } else if (res.status === 105) {
            alert('登录信息无效')
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state
        alert(`你输入的邮箱是：${email}，你输入的密码是：${password}`)
        this.fpost()
    };

    saveFormData = (dataType) => {
        return (event) => {
            this.setState({ [dataType]: event.target.value })
        }
    }

    render() {
        return (
            <div>
                <div className='content'>
                    <form onSubmit={this.handleSubmit} >
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">邮箱</label>
                            <input type="email"
                                className={classnames("form-control")}
                                id="email"
                                name="email"
                                required
                                onChange={this.saveFormData('email')} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">密码</label>
                            <input type="password"
                                className={classnames("form-control")}
                                id="password"
                                name="password"
                                required
                                onChange={this.saveFormData('password')} />
                        </div>
                        <button type="submit" className="btn btn-primary">点击登录</button>
                    </form>
                </div>
            </div>
        )
    }
}
