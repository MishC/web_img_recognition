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
const initialState = {
  input: " ",
  imageUrl: "",

  dataBox: [],
  route: "signin",
  isSignedIn: false,
  user: { id: "", name: "", email: "", entries: 0, joined: "" },
  count: 0,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: " ",
      imageUrl: "",

      dataBox: [],
      route: "signin",
      isSignedIn: false,
      user: { id: "", name: "", email: "", entries: 0, joined: "" },
      count: 0,
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then(console.log);
  }
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
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
          this.setState({ count: this.state.count + 1 });
          this.setState(
            Object.assign(this.state.user, { entries: this.state.count })
          );
        })
        .then((response) => {
          // console.log("hi", response);
          if (response) {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            });
          }
        })

        .catch((error) => console.log("error", error));
    } else {
      return null;
    }
  };
  /****************************/
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };
  /*********************/
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
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <FaceDetection
              imageUrl={imageUrl}
              dataBox={dataBox}
              image={document.getElementById("inputimage")}
            />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : route === "fail" ? (
          <div>
            <Signin
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
            <p className="f4 black">! Wrong password or email !</p>
          </div>
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
