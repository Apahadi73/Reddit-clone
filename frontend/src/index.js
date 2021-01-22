import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./bootstrap.min.css";
import "./index.css";

import App from "./App";
import store from "./state/store";
import axios from "axios";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
} else {
  axios.defaults.baseURL = "http://localhost:5001/";
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
