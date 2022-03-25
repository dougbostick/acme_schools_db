import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCampus, getStudents } from "./store";

class CampusDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      campus: [],
      students: [],
    };
  }
  async componentDidMount() {
    if (!this.props.loadedCampus) {
      await this.props.fetchCampus();
    }
    if (!this.props.loadedStudents) {
      await this.props.fetchStudents();
    }
    console.log("CD props", this.props);
    const campus = this.props.campus.find(
      (campus) => campus.id === parseInt(this.props.match.params.id)
    );
    const students = this.props.students.filter(
      (student) => student.campusId === parseInt(this.props.match.params.id)
    );
    console.log("students after map", students);
    this.setState({ campus, students });
  }
  render() {
    console.log("CD local state", this.state);

    const { campus } = this.state;
    const { students } = this.state;
    console.log("students", students);

    return (
      <div>
        <h1>Campus Details</h1>
        <div>Campus: {campus.name}</div>
        <div>Address: {campus.address}</div>
        <div>{campus.description}</div>
        <div>
          Students who attend {campus.name}:
          {students ? (
            <div>
              {students.map((student) => {
                return (
                  <div key={student.id}>
                    {student.firstName} {student.lastName}
                  </div>
                );
              })}
            </div>
          ) : (
            <div> No Students </div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    campus: reduxState.campus,
    students: reduxState.students,
    loadedCampus: reduxState.loadedCampus,
    loadedStudents: reduxState.loadedStudents,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: () => dispatch(getCampus()),
    fetchStudents: () => dispatch(getStudents()),
  };
};

export const ConnectedCD = connect(mapState, mapDispatch)(CampusDetails);
