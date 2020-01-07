import React from "react";
import { Input, Form, Button, notification } from "antd";
import "./_login.scss";
import { doLogin } from "../../api/apiCalls";

export default function Login(props) {
  const [state, setState] = React.useState({
    username: "",
    password: "",
    loading: false
  });

  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const handleLoginSubmit = () => {
    const payload = { username: state.username, password: state.password };
    setUsernameError("");
    setPasswordError("");
    setState({ ...state, loading: true });
    doLogin(payload)
      .then(res => {
        setState({
          ...state,
          loading: false
        });
        localStorage.setItem("login_details", JSON.stringify(res.details));
        localStorage.setItem("token", res.token);
        if (res.details.is_admin) {
          props.history.push("/admin");
        }
        if (res.details.is_user) {
          props.history.push("/store_user");
        }
      })
      .catch(err => {
        if (err.username) {
          setUsernameError(err.username);
        }
        if (err.password) {
          setPasswordError(err.password);
        }
        if (err.message) {
          notification.error({
            message: err.message,
            duration: 5
          });
        }
      });
  };

  return (
    <section id="login">
      <div className="login-controls">
        <header>
          <div className="title">Shrestha Store Login</div>
        </header>
        <Form
          onSubmit={e => {
            e.preventDefault();
            handleLoginSubmit();
          }}
        >
          <Form.Item
            validateStatus={usernameError ? "error" : "success"}
            help={usernameError}
          >
            <Input
              onChange={e => {
                setState({ ...state, username: e.target.value });
              }}
              placeholder="Username"
            ></Input>
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? "error" : "success"}
            help={passwordError}
          >
            <Input.Password
              onChange={e => {
                setState({ ...state, password: e.target.value });
              }}
              placeholder="Password"
            ></Input.Password>
          </Form.Item>
          <Button block htmlType="submit" type="primary">
            Login
          </Button>
        </Form>
      </div>
    </section>
  );
}
