import React from "react";
import { Link } from "react-router-dom";

export class Nav extends React.Component {
  render() {
    return (
      <div>
        <Link to={"/campuses"}>Campuses</Link>
        <Link to={"/students"}>Students</Link>
      </div>
    );
  }
}
