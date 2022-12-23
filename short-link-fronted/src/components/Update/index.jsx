import React, { Component } from 'react'

export default class Update extends Component {
  state = {
    origin: '',
    comment: '',
    startTime: '',
    expireTime: ''
  }

  fpost = async () => {
    let res = await fetch('/api/url/update', {
      method: 'post',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })

    let json = await res.json()
    console.log(json)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.fpost()
  }

  saveFormData = (dataType) => {
    return (event) => {
      this.setState({ [dataType]: event.target.value })
    }
  }

  render() {
    return (
      <div>
        <form action="">
          <strong htmlFor="basic-url" className="form-label">更新短网址</strong>
          <div className="input-group mb-3" style={{ margin: "10px 0" }}>
            <span className="input-group-text" id="basic-addon3">https://xxx.com/</span>
            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"
              placeholder='补全短网址' name="origin" required onChange={this.saveFormData('origin')} />
          </div>
          <strong htmlFor="basic-url" className="form-label">备注（可选）</strong>
          <div className="input-group mb-3">
            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"
              placeholder='短链接备注' name="comment" onChange={this.saveFormData('comment')} />
          </div>
          <strong htmlFor="basic-url" className="form-label">有效期自（可选）</strong>
          <div className="input-group mb-3">
            <input type="datetime-local" className="form-control" id="basic-url" aria-describedby="basic-addon3"
              placeholder='留空表示不限制' name="startTime" onChange={this.saveFormData('startTime')} />
          </div>
          <strong htmlFor="basic-url" className="form-label">有效期自（可选）</strong>
          <div className="input-group mb-3">
            <input type="datetime-local" className="form-control" id="basic-url" aria-describedby="basic-addon3"
              placeholder='留空表示不限制' name="expireTime" onChange={this.saveFormData('expireTime')} />
          </div>
          <button type="button" className="btn btn-outline-dark" onClick={this.handleSubmit}>更新</button>
        </form>
      </div>
    )
  }
}
