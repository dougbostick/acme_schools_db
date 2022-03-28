import React from "react";
import { connect } from "react-redux";
import { getCampus, deleteCampus } from "./store";
import { Link } from "react-router-dom";
import { ConnectedCF } from "./CampusForm";
// import axios from "axios";

class CampusList extends React.Component {
  async componentDidMount() {
    if (!this.props.loaded) {
      this.props.fetchCampus();
    }
  }

  render() {
    console.log("CL redner state", this.props.state);
    const CampusEls = this.props.campus.map((campus) => {
      return (
        <div key={campus.id}>
          <Link to={`campuses/${campus.id}`}>{campus.name}</Link>
          <button onClick={() => this.props.deleteCampus(campus.id)}>x</button>
          <Link to={`campuses/${campus.id}/update`}>Update</Link>
        </div>
      );
    });
    return (
      <div>
        <h1>Campuses</h1>
        {CampusEls}
        <ConnectedCF />
      </div>
    );
  }
}

const mapState = (reduxState) => {
  console.log("CL map state", reduxState);
  return {
    campus: reduxState.campus,
    loaded: reduxState.loadedCampus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: () => dispatch(getCampus()),
    deleteCampus: (id) => dispatch(deleteCampus(id)),
  };
};

export const ConnectedCampus = connect(mapState, mapDispatch)(CampusList);
