import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { getStudents, getCampus } from "./store";
import { ConnectedSD } from "./StudentDetails";
import { ConnectedCD } from "./CampusDetails";
import { ConnectedCU } from "./UpdateCampus";
import { ConnectedSU } from "./UpdateStudent";
import { ConnectedStudent } from "./StudentList";
import { ConnectedCampus } from "./CampusList";
import { Nav } from "./Nav";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampus();
  }
  render() {
    return (
      <Router>
        <Nav />
        <Route exact path="/students/:id" component={ConnectedSD} />
        <Route exact path="/campuses/:id" component={ConnectedCD} />
        <Route exact path="/campuses" component={ConnectedCampus} />
        <Route exact path="/students" component={ConnectedStudent} />
        <Route exact path="/campuses/:id/update" component={ConnectedCU} />
        <Route exact path="/students/:id/update" component={ConnectedSU} />
      </Router>
    );
  }
}

const mapState = (reduxState) => {
  return reduxState;
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: () => dispatch(getCampus()),
    fetchStudents: () => dispatch(getStudents()),
  };
};

export const ConnectedApp = connect(mapState, mapDispatch)(App);
