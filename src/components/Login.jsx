import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input:"",
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined:"",
      },
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitLogin = () => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
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
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item>
            <h4 style={{ color: "#17A2B8" }}>Login</h4>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
              onChange={this.onEmailChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={this.onPasswordChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ width: "100%", backgroundColor:"#17A2B8", color:"#ffffff"}}
              type="button"
              onClick={this.onSubmitLogin}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

//              onClick={() => this.props.onRouteChange('home')}
