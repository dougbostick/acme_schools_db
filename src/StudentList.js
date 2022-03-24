import React from "react";
import { connect } from "react-redux";
import { getStudents } from "./store";
import { Link } from "react-router-dom";

class StudentList extends React.Component {
  async componentDidMount() {
    this.props.fetchStudents();
  }
  render() {
    console.log("state", this.props.state);
    const StudentEls = this.props.state.map((student) => {
      return (
        <div key={student.id}>
          <Link to={`/students/${student.id}`}>
            {student.firstName} {student.lastName}
          </Link>
        </div>
      );
    });
    return (
      <div>
        <h1>Students</h1>
        {StudentEls}
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    state: reduxState.students,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudents: () => dispatch(getStudents()),
  };
};

export const ConnectedStudent = connect(mapState, mapDispatch)(StudentList);
