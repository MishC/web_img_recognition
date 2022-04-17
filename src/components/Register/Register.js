import React from "react";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      fail: false,
      double: false,
    };
  }
  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignIn = () => {
    let emailLength = this.state.email.length;
    let resultEmail = !!this.state.email.match(/[,:!?]/);
    let resultName = !!this.state.name.match(/[,:!?.]/);

    if (
      this.state.password.length < 8 ||
      this.state.email < 6 ||
      resultEmail ||
      resultName ||
      !this.state.email.includes("@") ||
      !this.state.email.slice(emailLength - 5, emailLength).includes(".")
    ) {
      this.setState({ fail: true });
      console.log("Fail email or password");
    } else if (this.state.name === "" || this.state.name === "Unknown") {
      this.setState({ name: "Unknown" });
    } else {
      fetch("http://localhost:3000/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user) {
            this.props.loadUser(user);
            if (user === "unable to register") {
              this.props.onRouteChange("register");
              this.setState({ double: true });
            } else {
              this.props.onRouteChange("home");
            }
          }
        });
    }
  };
  render() {
    const { fail, double } = this.state;
    return (
      <div className="Register center">
        <article className="br3 ba b--black-10 mv4 w-200 w-100-m w-200-l mw6 shadow-5 center">
          <main className="pa6 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f5" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba  hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f5" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba hover-bg-black hover-white w-100 "
                    minLength="5"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>

                <div className="mv3">
                  <label className="db fw6 lh-copy f5" htmlFor="password">
                    Password
                  </label>

                  <input
                    className="b br3 pa2 input-reset ba  hover-bg-black hover-white w-100"
                    minLength="8"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={this.onSubmitSignIn}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                />
              </div>
              {fail === true ? (
                <p className="f4 mt5">
                  Email must be valid. Password must have at least 8 signs.
                </p>
              ) : this.state.name === "Unknown" ? (
                <p className="f4 mt5">Please add name.</p>
              ) : double ? (
                <div>
                  <p className="f4 mt5">
                    You are already registered. Did you forget your password?
                  </p>
                  <div
                    className="f3 link dim black underline pointer  pa3 mt3 mr3"
                    onClick={() => this.props.onRouteChange("signin")}
                  >
                    Sign in
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Register;
