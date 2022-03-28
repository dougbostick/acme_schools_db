import React from "react";
import { updateStudent } from "./store";
import { connect } from "react-redux";

class UpdateStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.student ? this.props.student.firstName : "",
      lastName: this.props.student ? this.props.student.lastName : "",
      email: this.props.student ? this.props.student.email : "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("props", this.props);
  }
  componentDidUpdate(prevProps) {
    console.log("props", this.props);
    if (!prevProps.campus && this.props.campus) {
      this.setState({
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        email: this.props.student.email,
      });
    }
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    console.log("props/ state", this.props.student, this.state);
    this.props.updateStudent({ ...this.props.student, ...this.state });
  }

  render() {
    console.log("state", this.state);
    const { firstName } = this.state;
    const { lastName } = this.state;
    const { email } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={(ev) => this.setState({ firstName: ev.target.value })}
          value={firstName}
        />
        <input
          onChange={(ev) => this.setState({ lastName: ev.target.value })}
          value={lastName}
        />
        <input
          onChange={(ev) => this.setState({ email: ev.target.value })}
          value={email}
        />
        <button>Submit</button>
      </form>
    );
  }
}
const mapState = (reduxState, { match }) => {
  console.log("reduxstate", reduxState);
  const student = reduxState.students.find(
    (student) => student.id === parseInt(match.params.id)
  );
  console.log("MS", student);
  return {
    student,
  };
};
const mapDispatch = (dispatch, { history }) => {
  return {
    updateStudent: (student) => dispatch(updateStudent(student, history)),
  };
};

export const ConnectedSU = connect(mapState, mapDispatch)(UpdateStudent);
