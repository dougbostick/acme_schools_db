import React from "react";
import { Link } from "react-router-dom";

export class Nav extends React.Component {
  render() {
    return (
      <div className="navbar">
        <Link to={"/campuses"} className="campuslink">
          Campuses
        </Link>
        <Link to={"/students"} className="studentlink">
          Students
        </Link>
      </div>
    );
  }
}
