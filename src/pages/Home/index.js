// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { compose } from 'recompose';
// import { withRouter } from 'react-router-dom';
// import LayoutCustomer from '../../components/Layouts/Customer';
// import { Button, Col, Row } from 'react-bootstrap';
// import AuthActions from '../../redux/actions/AuthActions';

// class HomePage extends Component {

//   handleLogout = () => {
//     this.props.logout();
//     this.props.history.push('/login');
//   };

//   render() {
//     return (
//       <LayoutCustomer onClickLogout={this.handleLogout}>
//         <Row>
//           <Col md={1}>
//             <Button variant="link">Templates</Button>
//             <Button variant="link">Screens</Button>
//             <Button variant="link">Text</Button>
//             <Button variant="link">Background</Button>
//             <Button variant="link">Images</Button>
//           </Col>
//           <Col md={11}>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, laborum!
//           </Col>
//         </Row>
//       </LayoutCustomer>
//     );
//   }
// }

// const mapDispatchToProps = {
//   logout: AuthActions.logout,
// };

// export default compose(
//   withRouter,
//   connect(null, mapDispatchToProps)
// )(HomePage);


import React, { useEffect, useRef } from "react";
import panzoom from "panzoom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "recompose";
////////////////////////////////////////////////////////////////////////////////////////////////////
import TemplateAction from "./../.../../../redux/actions/TemplateAction";
import { SELECTED_MODULE } from "./../../common/constants/SelectedModuleConstant";
////////////////////////////////////////////////////////////////////////////////////////////////////
import Canvas from "./../../components/Canvas";

import LayoutCustomer from "./../../components/Layouts/Customer";
import AdminDeviceThumbnailAction from "./../.../../../redux/actions/AdminDeviceThumbnailAction";
import ThumbnailSelect from "./../../components/CustomerPage/ThumbnailSelect";
////////////////////////////////////////////////////////////////////////////////////////////////////
import { Redirect } from "react-router-dom";

function Home({
  selectedModule,
  selectedText,
  getDeviceThumbnails,
  getCustomerTemplates,
  auth,
}) {
  const panzoomRef = useRef(null);
  useEffect(() => {
    // zoomCanvas.dispose()
    const zoomImage = document.getElementById("image-zoom");
    panzoomRef.current = panzoom(
      zoomImage,
      {
        beforeWheel: e => {
          const shouldIgnore = !e.ctrlKey;
          return shouldIgnore;
        }
        // filterKey:
      },
      {
        maxZoom: 2,
        minZoom: 0.5
      }
    );
    panzoomRef.current.zoomAbs(300, 100, 1);
    getDeviceThumbnails();
    getCustomerTemplates();
  }, []);
  if (auth.is_superuser) {
    return (
      <Redirect
        to={{
          pathname: "/admin"
        }}
      />
    );
  }
  return (
    <LayoutCustomer>
      <div
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        className="p-index"
        style={{ width: "100%", height: "100%", zIndex: 1004, padding: 16 }}
        onMouseDown={e => {
          if (e.button === 0) {
            panzoomRef.current.pause();
          } else {
            panzoomRef.current.resume();
          }
          if (!panzoomRef.current.isPaused() && e.button === 1) {
            e.target.style.cursor = "grab";
          } else {
            e.target.style.cursor = "auto";
          }
        }}
      >
        <div id="image-zoom">
          <Canvas
            isOpenMenu={
              selectedModule === SELECTED_MODULE.SCREENS ||
              selectedModule === SELECTED_MODULE.BACKGROUND ||
              selectedModule === SELECTED_MODULE.IMAGES ||
              selectedModule === SELECTED_MODULE.TEMPLATES ||
              selectedModule === SELECTED_MODULE.TEXT
            }
            isCursorCrossHair={
              !selectedText && selectedModule === SELECTED_MODULE.TEXT
            }
          />
        </div>
      </div>
      <ThumbnailSelect />
    </LayoutCustomer>
  );
}

const mapStateToProps = state => ({
  selectedModule: state.app.selectedModule,
  selectedText: state.texts.selectedText,
  auth: state.auth
});

const mapDispatchToProps = {
  getDeviceThumbnails: AdminDeviceThumbnailAction.getDeviceThumbnails,
  getCustomerTemplates: TemplateAction.getCustomerTemplates
};

Home.defaultProps = {
  selectedModule: 0,
  selectedText: "",
  getDeviceThumbnails: () => {},
  getCustomerTemplates: () => {}
};
Home.propTypes = {
  selectedModule: PropTypes.number,
  selectedText: PropTypes.string,
  getDeviceThumbnails: PropTypes.func,
  getCustomerTemplates: PropTypes.func
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
