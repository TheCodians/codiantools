import React from "react";
import Particles from "react-particles-js";
import { Register } from "./components/index";
import { Login } from "./components/index";
import Home from "./components/Home";
import Submit from "./components/Submit";
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Navbar, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

//import logo from './logo.jpg'

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
      input: "",
      route: "signin",
      isSignIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

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

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  //API c0c0ac362b03416da06ab3fa36fb58e3 for Clarifai.FACE_DETECT_MODEL

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("http://localhost:3000/submit", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: this.state.message,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState({ isLoginActive: true });
      this.setState({ isSignedIn: false });
      this.setState({ isSubmit: false });
      this.setState({ message: "" });
      this.setState({ input: "" });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
      this.setState({ isSubmit: false });
    } else if (route === "submit") {
      this.setState({ isSignedIn: true });
      this.setState({ isSubmit: true });
    }
    this.setState({ route: route });
  };

  defaultRoute = (route) => {
    this.setState({ route: route });
  };

  changeState() {
    const { isLoginActive } = this.state;
    if (isLoginActive) {
      this.RightSide.classList.remove("right");
      this.RightSide.classList.add("left");
    } else {
      this.RightSide.classList.remove("left");
      this.RightSide.classList.add("right");
    }
    this.setState((prevState) => ({ isLoginActive: !prevState.isLoginActive }));
  }

  render() {
    const { isSignedIn, route } = this.state;
    const { isLoginActive } = this.state;
    const current = isLoginActive ? "Register" : "Login";

    return (
      <div className="App">
        <Navbar
          sticky="top"
          bg="dark"
          variant="dark"
          className="container-fluid"
        >
          <Navbar.Brand href="">Codian Tools</Navbar.Brand>
          <Form className="social-container ml-auto">
            <Button
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "5px",
                borderColor: " #17A2B8",
                backgroundColor: " #17A2B8",
              }}
              type="button"
              onClick={() => window.open("https://facebook.com", "_blank")}
            >
              <FaFacebook />
            </Button>
            <Button
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "5px",
                borderColor: " #17A2B8",
                backgroundColor: " #17A2B8",
              }}
              type="button"
              onClick={() => window.open("https://linkedin.com", "_blank")}
            >
              <FaLinkedinIn />
            </Button>
            <Button
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "5px",
                borderColor: " #17A2B8",
                backgroundColor: " #17A2B8",
              }}
              type="button"
              onClick={() => window.open("https://twitter.com", "_blank")}
            >
              <FaTwitter />
            </Button>
          </Form>
        </Navbar>

        {route === "signin" ? (
          <div className="login">
            <Particles className="particles" param={particlesOptions} />
            <div className="container">
              {isLoginActive && (
                <Login
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange}
                  containerRef={(ref) => (this.current = ref)}
                />
              )}
              {!isLoginActive && (
                <Register
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange}
                  containerRef={(ref) => (this.current = ref)}
                />
              )}
            </div>
            <RightSide
              current={current}
              containerRef={(ref) => (this.RightSide = ref)}
              onClick={this.changeState.bind(this)}
            />
          </div>
        ) : route === "home" ? (
          <div>
            <Home
              isSignedIn={isSignedIn}
              onRouteChange={this.onRouteChange}
              name={this.state.user.name}
            />
            <Particles className="particles" param={particlesOptions} />
          </div>
        ) : (
          <div>
            <Submit
              onRouteChange={this.onRouteChange}
              email={this.state.user.email}
            />
          </div>
        )}
      </div>
    );
  }
}

const RightSide = (props) => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;
