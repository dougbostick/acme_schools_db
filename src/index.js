import React from "react";
import { render } from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import { ConnectedApp } from "./App";

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.querySelector("#root")
);
