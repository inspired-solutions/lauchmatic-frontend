import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/index.scss'
// import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "../src/redux/store";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import AppStateProvider from "./components/AppStateProvider";

const { persistor, store } = configureStore();

function reducer(state, action) {
  switch (action.type) {
    case "SET_TEMPLATE_REF":
      return { state, templateRef: action.payload };

    default:
      return state;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <DndProvider backend={HTML5Backend}>
        <>
          <AppStateProvider
            initialState={{
              templateRef: null
            }}
            reducer={reducer}
          >
            <App />
          </AppStateProvider>
        </>
      </DndProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
