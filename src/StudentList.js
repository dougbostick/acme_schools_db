import React from "react";
import { connect } from "react-redux";
import { getStudents, deleteStudent } from "./store";
import { Link } from "react-router-dom";
import { ConnectedSF } from "./StudentForm";

class StudentList extends React.Component {
  async componentDidMount() {
    if (!this.props.loaded) {
      this.props.fetchStudents();
    }
  }
  render() {
    console.log("state", this.props.state);
    const StudentEls = this.props.students.map((student) => {
      return (
        <div key={student.id}>
          <Link to={`/students/${student.id}`}>
            {student.firstName} {student.lastName}
          </Link>
          <button onClick={() => this.props.deleteStudent(student.id)}>
            x
          </button>
          <Link to={`/students/${student.id}/update`}>Update</Link>
        </div>
      );
    });
    return (
      <div>
        <h1>Students</h1>
        {StudentEls}
        <ConnectedSF />
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    students: reduxState.students,
    loaded: reduxState.loadedStudents,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudents: () => dispatch(getStudents()),
    deleteStudent: (id) => dispatch(deleteStudent(id)),
  };
};

export const ConnectedStudent = connect(mapState, mapDispatch)(StudentList);
