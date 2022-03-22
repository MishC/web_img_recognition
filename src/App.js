import React, { Component } from "react";
//import ReactDOM from "react-dom";
import "./App.css";
import "tachyons";

import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "react-tsparticles";
import particlesOptions from "./particles.json";
import FaceDetection from "./components/FaceDetection/FaceDetection";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: " ",
      imageUrl: "",

      dataBox: [],
      route: "signin",
      isSignedIn: false,
    };
  }
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    /******************************/
    /*********************https://docs.clarifai.com/api-guide/predict/images*****************************/
    const raw = JSON.stringify({
      user_app_id: {
        user_id: "",
        app_id: "",
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key ",
      },
      body: raw,
    };

    if (this.state.input) {
      fetch(
        "https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          //  console.log(JSON.parse(result, null, 2).outputs[0].data.regions);

          this.setState({
            dataBox: JSON.parse(result, null, 2).outputs[0].data.regions,
          });
        })
        .catch((error) => console.log("error", error));
    } else {
      return null;
    }
    /****************************/
  };

  render() {
    const { imageUrl, dataBox, isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <div>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceDetection
              imageUrl={imageUrl}
              dataBox={dataBox}
              image={document.getElementById("inputimage")}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
