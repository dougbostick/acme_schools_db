import React from "react";
import { addCampus } from "./store";
import { connect } from "react-redux";

class CampusForm extends React.Component {
  constructor() {
    super();
    this.state = {
      campus: "",
      address: "",
    };
    this.create = this.create.bind(this);
  }

  async create(ev) {
    ev.preventDefault();
    this.props.addCampus(this.state.campus, this.state.address);
    this.setState({ campus: "", address: "" });
  }

  render() {
    const { campus } = this.state;
    const { address } = this.state;
    return (
      <form onSubmit={this.create}>
        <input
          placeholder="input campus name"
          value={campus}
          onChange={(ev) => this.setState({ campus: ev.target.value })}
        />
        <input
          placeholder="input campus address"
          value={address}
          onChange={(ev) => this.setState({ address: ev.target.value })}
        />
        <button>Submit</button>
      </form>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addCampus: (name, address) => dispatch(addCampus(name, address)),
  };
};

export const ConnectedCF = connect(null, mapDispatch)(CampusForm);
