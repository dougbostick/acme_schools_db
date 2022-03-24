import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCampus } from "./store";

class CampusDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      campus: {},
    };
  }
  async componentDidMount() {
    await this.props.fetchCampus();
    console.log("CD props", this.props);
    const campus = this.props.state.find(
      (campus) => campus.id === parseInt(this.props.match.params.id)
    );
    this.setState({ campus });
  }
  render() {
    console.log("CD local state", this.state);
    const { campus } = this.state;
    return (
      <div>
        <h1>Campus Details</h1>
        <div>Campus: {campus.name}</div>
        <div>Address: {campus.address}</div>
        <div>{campus.description}</div>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    state: reduxState.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: () => dispatch(getCampus()),
  };
};

export const ConnectedCD = connect(mapState, mapDispatch)(CampusDetails);
