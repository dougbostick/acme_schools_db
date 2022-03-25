import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getStudents, getCampus } from "./store";

export class StudentDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      student: [],
      campus: [],
    };
  }
  async componentDidMount() {
    if (!this.props.loadedStudents) {
      await this.props.fetchStudents();
    }
    if (!this.props.loadedCampus) {
      await this.props.fetchCampus();
    }
    console.log("SD state", this.props.students);
    const student = this.props.students.find(
      (student) => student.id === parseInt(this.props.match.params.id)
    );
    const campus = this.props.campus.find(
      (campus) => campus.id === parseInt(this.props.match.params.id)
    );
    this.setState({ student, campus });
  }

  render() {
    //console.log("route props", this.props.match.params.id);
    const { student } = this.state;
    const { campus } = this.state;
    console.log("SD local state", this.state);
    return (
      <div>
        <h1>Student Details</h1>
        <div>First Name: {student.firstName}</div>
        <div>Last Name: {student.lastName}</div>
        <div>email: {student.email}</div>
        <div>GPA: {student.gpa}</div>
        <div>Campus: {campus.name}</div>

        <Link to="/"> Back to Home </Link>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  console.log("MS SD state", reduxState);
  return {
    students: reduxState.students,
    campus: reduxState.campus,
    loadedStudents: reduxState.loadedStudents,
    loadedCampus: reduxState.loadedCampus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: () => dispatch(getCampus()),
    fetchStudents: () => dispatch(getStudents()),
  };
};

export const ConnectedSD = connect(mapState, mapDispatch)(StudentDetails);
