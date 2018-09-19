import React from "react";

const baseURL = "http://localhost:3000";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: ""
    };
  }

  loginExistingUser = e => {
    e.preventDefault();
    // debugger;
    fetch(`${baseURL}/login`, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.token) {
          localStorage.setItem("token", json.token);
        }
      });
  };

  render() {
    return (
      <form style={{ margin: 100 }} onSubmit={this.loginExistingUser}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <small id="emailHelp" className="form-text text-muted">
            Heads up we are stealing your information.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
        </div>
        <div className="form-group form-check" />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Login;
