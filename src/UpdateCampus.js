import React from "react";
import { updateCampus } from "./store";
import { connect } from "react-redux";

class UpdateCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.campus ? this.props.campus.name : "",
      address: this.props.campus ? this.props.campus.address : "",
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("props", this.props);
  }
  componentDidUpdate(prevProps) {
    console.log("CDU props/ prevProps", this.props, prevProps);
    if (!prevProps.campus && this.props.campus) {
      this.setState({
        name: this.props.campus.name,
        address: this.props.campus.address,
      });
    }
  }

  // handleChange(ev) {
  //   this.setState({
  //     [ev.target.name]: ev.target.value,
  //   });
  // }

  handleSubmit(ev) {
    ev.preventDefault();
    console.log("props/ state", this.props.campus, this.state);
    this.props.updateCampus({ ...this.props.campus, ...this.state });
  }

  render() {
    console.log("state", this.state);
    const { name } = this.state;
    const { address } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          // placeholder="input campus name"

          onChange={(ev) => this.setState({ name: ev.target.value })}
          value={name}
        />
        <input
          // placeholder="input campus address"

          onChange={(ev) => this.setState({ address: ev.target.value })}
          value={address}
        />
        <button>Submit</button>
      </form>
    );
  }
}
const mapState = (reduxState, { match }) => {
  const campus = reduxState.campus.find(
    (campus) => campus.id === parseInt(match.params.id)
  );
  console.log("MS", campus);
  return {
    campus,
  };
};
const mapDispatch = (dispatch, { history }) => {
  return {
    updateCampus: (campus) => dispatch(updateCampus(campus, history)),
  };
};

export const ConnectedCU = connect(mapState, mapDispatch)(UpdateCampus);
