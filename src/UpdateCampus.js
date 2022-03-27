import React from "react";

class UpdateCampus extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      address: "",
    };
  }
  handleChane(ev) {
    this.setState({
      name: ev.target.value,
    });
  }

  redner() {
    return (
      <div>
        <form></form>
      </div>
    );
  }
}
