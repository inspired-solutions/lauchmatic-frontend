import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Redirect, withRouter } from "react-router-dom";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import AppActions from "../../../redux/actions/AppActions";
import AuthActions from "../../../redux/actions/AuthActions";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    showAlert: false
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { username, password } = this.state;
    const { setLoading, login } = this.props;

    setLoading(true);
    try {
      const { status, data } = await login(username, password);

      if (status === 200) {
        const { is_superuser } = data;
        const route = is_superuser ? "/admin" : "/";
        /**temp, after modifed api.js file */
        // window.location.reload();
        this.props.history.push(route);
      } else {
        this.setShow(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  setUsername = username => {
    this.setState({ username });
  };

  setPassword = password => {
    this.setState({ password });
  };

  setShow = showAlert => {
    this.setState({ showAlert });
  };

  render() {
    const { username, password, showAlert } = this.state;
    const { loading, auth } = this.props;
    const { token, is_superuser } = auth;

    if (token) {
      const route = is_superuser ? "/admin" : "/";

      return <Redirect to={route} />;
    }

    return (
      <Container>
        <Card
          style={{
            width: 350,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Card.Body>
            {showAlert && (
              <Alert
                variant="danger"
                onClose={() => this.setShow(false)}
                dismissible
              >
                Incorrect credentials!
              </Alert>
            )}

            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={e => this.setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={e => this.setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" block disabled={loading}>
                Sign in
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  auth: state.auth
});

const mapDispatchToProps = {
  setLoading: AppActions.setLoading,
  login: AuthActions.login
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginPage);

LoginPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
