import React from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";

export class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
      route: "submit",
      isSignIn: true,
      message: "",
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  onMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  onSubmitMessage = () => {
    fetch("http://localhost:3000/sumbit", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        message: this.state.message,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          console.log("Invalid Input");
        }
      });
  };

  render() {
    const { TextArea } = Input;
    return (
      <div>
        <div className="container">
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item>
              <h2 style={{ color: "#17A2B8" }}>Feedback / Suggestions</h2>
            </Form.Item>
            <TextArea rows={4} />
            <Form.Item>
              <Button
                style={{
                marginRight: "10px",
                marginTop: "10px",
                borderRadius: "25px",
                color: "green",
                backgroundColor: "#82CDD9",
                borderColor: "white",
                width: "7em",
                }}
                variant="outline-info"
                type="submit"
                onClick={this.onSubmitMessage}
              >
                Submit
              </Button>
              <Button
                style={{
                marginRight: "10px",
                marginTop: "10px",
                borderRadius: "25px",
                backgroundColor: "#82CDD9",
                color: "red",
                borderColor: "white",
                width: "7em",
                }}
                variant="outline-info"
                type="submit"
                onClick={()=> this.props.onRouteChange('home')}
              >
                Close
              </Button>

            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Submit;
