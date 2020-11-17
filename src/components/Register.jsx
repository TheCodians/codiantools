import React from "react";
import { Form, Input, Button } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
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

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onConfirmPasswordChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmitRegister = () => {
    if (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.input
    ) {
      if (this.state.password === this.state.input) {
        fetch("http://localhost:3000/register", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
          }),
        })
          .then((response) => response.json())
          .then((user) => {
            if (user) {
              this.props.loadUser(user);
              this.props.onRouteChange("home");
            }
          });
      }else{
        console.log("Password does not match");
      }
    }
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
            <h4 style={{ color: "#17A2B8" }}>Register</h4>
          </Form.Item>

          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your Name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="name"
              placeholder="Name"
              onChange={this.onNameChange}
            />
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

          <Form.Item
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: "Please re-enter your Password!",
              },
            ]}
          >
            <Input
              prefix={<EyeInvisibleOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Re-enter Password"
              onChange={this.onConfirmPasswordChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ width: "100%", backgroundColor:"#17A2B8",  color:"#ffffff"}}
              type="button"
              className="login-form-button"
              onClick={this.onSubmitRegister}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
