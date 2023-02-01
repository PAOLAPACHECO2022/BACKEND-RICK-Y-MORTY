import React, { Component } from "react";
import Moment from "react-moment";

class ProfileDes extends Component {
  render() {
    const { season, character } = this.props;

    const expItems = season.map((exp) => (
      <li key={exp._id} className="list-group-item">
        <p>
          <strong>Seasons name:</strong> {exp.nameseason}
        </p>
        <h4>{exp.version}</h4>
        <p>
          {exp.season === "" ? null : (
            <span>
              <strong>Number of episodes: </strong> {exp.episodes}
            </span>
          )}
        </p>
        <p>
          {exp.species === "" ? null : (
            <span>
              <strong>Number of Characters: </strong> {exp.numbercharacters}
            </span>
          )}
        </p>

        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Character location: </strong> {exp.location}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = character.map((edu) => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.namecharacter}</h4>

        <p>
          {" "}
          Character status:
          <h4>{edu.status}</h4>
        </p>

        <p>
          {" "}
          Character creation date:
          <Moment format="YYYY/MM/DD">{edu.creaciondate}</Moment>
        </p>

        <p>
          {edu.species === "" ? null : (
            <span>
              <strong>Species: </strong> {edu.species}
            </span>
          )}
        </p>
        <p>
          {edu.location === "" ? null : (
            <span>
              <strong>Location: </strong> {edu.location}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Season</h3>
          {/* test to see if there are any season items */}
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Seasons</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Character</h3>
          {/* test to see if there are any character items */}
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Character</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileDes;
