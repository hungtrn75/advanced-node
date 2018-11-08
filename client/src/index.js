import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

import axios from "axios";
window.axios = axios;

let store;
if (process.env.NODE_ENV === "production") {
  store = createStore(reducers, {}, applyMiddleware(reduxThunk));
} else {
  store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(reduxThunk))
  );
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
