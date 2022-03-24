import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getStudents } from "./store";

export class StudentDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      student: {},
    };
  }
  async componentDidMount() {
    await this.props.fetchStudents();
    console.log("SD state", this.props.students);
    const student = this.props.students.find(
      (student) => student.id === parseInt(this.props.match.params.id)
    );
    this.setState({ student });
  }

  render() {
    //console.log("route props", this.props.match.params.id);
    const { student } = this.state;
    console.log("SD local state", this.state);
    return (
      <div>
        <h1>Student Details</h1>
        <div>First Name: {student.firstName}</div>
        <div>Last Name: {student.lastName}</div>
        <div>email: {student.email}</div>
        <div>GPA: {student.gpa}</div>

        <Link to="/"> Back to Home </Link>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  console.log("MS SD state", reduxState);
  return {
    students: reduxState.students,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudents: () => dispatch(getStudents()),
  };
};

export const ConnectedSD = connect(mapState, mapDispatch)(StudentDetails);
