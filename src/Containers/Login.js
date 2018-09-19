import React from "react";

const baseURL = "http://localhost:3000";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
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
        // debugger;
        if (json.token) {
          localStorage.setItem("token", json.token);
          this.props.setUser();
        }
      });
  };

  saveUser = e => {
    e.preventDefault();
    e.persist();
    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.loginExistingUser(e);
      });
  };

  render() {
    return (
      <div>
        {this.props.signIn ? (
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
        ) : (
          <form style={{ margin: 100 }} onSubmit={this.saveUser}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="First Name"
                onChange={e => this.setState({ firstName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Last Name"
                onChange={e => this.setState({ lastName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Email"
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
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
        )}
      </div>
    );
  }
}

export default Login;
