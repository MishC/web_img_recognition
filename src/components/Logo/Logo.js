import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";

//import "brain.png";

const Logo = () => {
  return (
    <div className="Logo  mv3 ml3">
      <Tilt
        className="Tilt br2 shadow-2 ml4"
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner">
          <img src={require("./brain.png")} alt="logo" className="pt3 invert" />{" "}
        </div>
      </Tilt>
    </div>
  );
};
export default Logo;
