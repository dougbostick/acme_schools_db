import React from "react";
import { connect } from "react-redux";
import { getCampus } from "./store";
import { Link } from "react-router-dom";

class CampusList extends React.Component {
  async componentDidMount() {
    this.props.fetchCampus();
  }
  render() {
    console.log("CL redner state", this.props.state);
    const CampusEls = this.props.state.map((campus) => {
      return (
        <div key={campus.id}>
          <Link to={`campuses/${campus.id}`}>{campus.name}</Link>
        </div>
      );
    });
    return (
      <div>
        <h1>Campuses</h1>
        {CampusEls}
      </div>
    );
  }
}

const mapState = (reduxState) => {
  console.log("CL map state", reduxState);
  return {
    state: reduxState.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: () => dispatch(getCampus()),
  };
};

export const ConnectedCampus = connect(mapState, mapDispatch)(CampusList);
