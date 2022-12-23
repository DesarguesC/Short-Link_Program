import React, { Component } from 'react'

export default class Pause extends Component {
  state = {
    short: '',
  }

  fpost = async () => {
    let res = await fetch('/api/url/pause', {
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
        <form action="" onSubmit={this.handleSubmit}>
          <strong htmlFor="basic-url" className="form-label">暂停短网址</strong>
          <div className="input-group mb-3" style={{ margin: "10px 0" }}>
            <span className="input-group-text" id="basic-addon3">https://xxx.com/</span>
            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"
              placeholder='补全短网址' name="short" onChange={this.saveFormData('short')} />
            <button type="button" className="btn btn-outline-dark">暂停</button>
          </div>
          <strong htmlFor="basic-url" className="form-label">重启短网址</strong>
          <div className="input-group mb-3" style={{ margin: "10px 0" }}>
            <span className="input-group-text" id="basic-addon3">https://xxx.com/</span>
            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"
              placeholder='补全短网址' name="short" onChange={this.saveFormData('short')} />
            <button type="button" className="btn btn-outline-dark">重启</button>
          </div>
        </form>
      </div>
    )
  }
}
