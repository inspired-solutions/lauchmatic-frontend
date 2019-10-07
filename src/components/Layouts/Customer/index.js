// import React from 'react';
// import PropTypes from 'prop-types';
// import { Container, Navbar, Row, Col, Button, NavDropdown } from 'react-bootstrap';

// const LayoutCustomer = ({ children, onClickLogout, onClickExport, onClickUpgrade }) => {
//   return (
//     <Container fluid>
//       <Navbar>
//         <Navbar.Brand href="#home">LaunchMatic</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Button onClick={onClickExport} variant="outline-secondary">Export</Button>
//           <Button onClick={onClickUpgrade} variant="outline-danger">Upgrade PRO</Button>

//           <NavDropdown title="MD" id="basic-nav-dropdown">
//             <NavDropdown.Item href="#">MD</NavDropdown.Item>
//             <NavDropdown.Divider />
//             <NavDropdown.Item onClick={onClickLogout} href="#">Logout</NavDropdown.Item>
//           </NavDropdown>
//         </Navbar.Collapse>
//       </Navbar>
//       {children}
//     </Container>

//   );
// };

// LayoutCustomer.propTypes = {
//   children: PropTypes.node.isRequired,
//   onClickLogout: PropTypes.func.isRequired,
//   onClickExport: PropTypes.func,
//   onClickUpgrade: PropTypes.func,
// };

// LayoutCustomer.defaultProps = {
//   onClickExport: () => null,
//   onClickUpgrade: () => null,
// };

// export default LayoutCustomer

import React from "react";
import Header from "../../Header";
import "./styles.scss";
import PropTypes from "prop-types";
import SideBar from "../../SideBar/SideBarCustomer";

function LayoutCustomer({ children }) {
  return (
    <div className="l-layout-customer__container">
      <Header />
      <SideBar />
      <div className="l-layout-customer__main">{children}</div>
    </div>
  );
}

LayoutCustomer.propTypes = {
  children: PropTypes.node.isRequired
};

export default LayoutCustomer;
