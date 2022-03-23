import React from "react";
import { render } from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import { ConnectedStudent } from "./StudentList";

render(
  <Provider store={store}>
    <ConnectedStudent />
  </Provider>,
  document.querySelector("#root")
);
