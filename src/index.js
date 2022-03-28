import React from "react";
import { render } from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import { ConnectedStudent } from "./StudentList";
import { ConnectedCampus } from "./CampusList";
import { HashRouter as Router, Route } from "react-router-dom";
import { Nav } from "./Nav";
import { ConnectedSD } from "./StudentDetails";
import { ConnectedCD } from "./CampusDetails";
import { ConnectedCU } from "./UpdateCampus";

render(
  <Provider store={store}>
    <Router>
      <Nav />
      <Route exact path="/students/:id" component={ConnectedSD} />
      <Route exact path="/campuses/:id" component={ConnectedCD} />
      <Route exact path="/campuses" component={ConnectedCampus} />
      <Route exact path="/students" component={ConnectedStudent} />
      <Route exact path="/campuses/:id/update" component={ConnectedCU} />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
