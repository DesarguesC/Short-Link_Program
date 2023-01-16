import React, { Component } from "react";
// import swal from "sweetalert";

export default class Delete extends Component {
  state = {
    short: "",
  };

  fpost = async () => {
    await fetch("http://localhost:1926/api/url/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((res) => {
      console.log(res);
    });
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
      <div>
        <form action="">
          <strong htmlFor="basic-url" className="form-label">
            还原短网址
          </strong>
          <div className="input-group mb-3" style={{ margin: "10px 0" }}>
            <span className="input-group-text" id="basic-addon3">
              https://xxx.com/
            </span>
            <input
              type="text"
              className="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="补全短网址"
              name="short"
              required
              onChange={this.saveFormData("short")}
            />
            <button
              type="button"
              className="btn btn-outline-dark"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={this.handleSubmit}
            >
              还原
            </button>
          </div>
        </form>

        {/* <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button> */}

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                {/* <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button> */}
              </div>
              <div className="modal-body">
                {/* 已还原 https://xxx.com/{this.state.short} 这个短网址 */}
                {/* {this.json.code} */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  关闭
                </button>
                {/* <button type="button" className="btn btn-primary">
                  确认
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
