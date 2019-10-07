import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import LayoutCustomer from '../../components/Layouts/Customer';
import { Button, Col, Row } from 'react-bootstrap';
import AuthActions from '../../redux/actions/AuthActions';

class HomePage extends Component {

  handleLogout = () => {
    this.props.logout();
    this.props.history.push('/login');
  };

  render() {
    return (
      <LayoutCustomer onClickLogout={this.handleLogout}>
        <Row>
          <Col md={1}>
            <Button variant="link">Templates</Button>
            <Button variant="link">Screens</Button>
            <Button variant="link">Text</Button>
            <Button variant="link">Background</Button>
            <Button variant="link">Images</Button>
          </Col>
          <Col md={11}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, laborum!
          </Col>
        </Row>
      </LayoutCustomer>
    );
  }
}

const mapDispatchToProps = {
  logout: AuthActions.logout,
};

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(HomePage);