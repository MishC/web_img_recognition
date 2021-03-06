import React from "react";
import Logo from "../Logo/Logo";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <div className="Navigation">
        <nav
          className="mt2"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            {" "}
            <Logo />
          </div>{" "}
          <p className="f4 mt6 black ml0 dn-s ttc">
            <span className=" f3 white "> Magic brain</span> <br />
            will detect faces in your picture. Give it a try!
          </p>
          <div
            className="f3 link dim black underline pointer  pa3 mt3 mr3"
            onClick={() => onRouteChange("signout")}
          >
            Sign Out
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="Navigation">
        <nav
          className="mt2"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            {" "}
            <Logo />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              className="f3 link dim black underline pointer  pa3 mt3 mr3"
              onClick={() => onRouteChange("signin")}
            >
              Sign in
            </div>
            <div
              className="f3 link dim black underline pointer  pa3 mt3 mr3"
              onClick={() => onRouteChange("register")}
            >
              Register
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

export default Navigation;
