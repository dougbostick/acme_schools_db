import React from "react";
import { addStudent } from "./store";
import { connect } from "react-redux";

class StudentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
    };
    this.create = this.create.bind(this);
  }

  async create(ev) {
    ev.preventDefault();
    this.props.addStudent(
      this.state.firstName,
      this.state.lastName,
      this.state.email
    );
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
    });
  }

  render() {
    const { firstName } = this.state;
    const { lastName } = this.state;
    const { email } = this.state;
    return (
      <div>
        <form onSubmit={this.create}>
          <input
            placeholder="input first name"
            value={firstName}
            onChange={(ev) => this.setState({ firstName: ev.target.value })}
          ></input>
          <input
            placeholder="input last name"
            value={lastName}
            onChange={(ev) => this.setState({ lastName: ev.target.value })}
          ></input>
          <input
            placeholder="input email"
            value={email}
            onChange={(ev) => this.setState({ email: ev.target.value })}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addStudent: (firstName, lastName, email) =>
      dispatch(addStudent(firstName, lastName, email)),
  };
};

export const ConnectedSF = connect(null, mapDispatch)(StudentForm);
