import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//importing react-moment to format season date
import Moment from "react-moment";
import Image from "react-bootstrap/Image";
//to delete season
import { deleteCharacter } from "../../actions/profileActions";

class Character extends Component {
  onDeleteClick(id) {
    this.props.deleteCharacter(id);
  }

  render() {
    const character = this.props.character.map((edu) => (
      <tr key={edu._id}>
        <td>
          <Image
            style={{
              minWidth: 100,
              maxWidth: 100,
              maxHeight: 100,
            }}
            src="https://i.ytimg.com/vi/CkeZVqUBSz4/maxresdefault.jpg"
            class=" img-thumbnail aline-center  rounded-circle W-50"
            alt=""
          />{" "}
        </td>

        <td>{edu.namecharacter}</td>
        <td>{edu.status}</td>
        <td>
          <Moment format="DD/MM/YYYY/">{edu.creaciondate}</Moment>
        </td>
        <td>{edu.species}</td>
        <td>{edu.location}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Character Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Img.</th>
              <th>Name Character</th>
              <th>Status</th>
              <th>Date</th>
              <th>Species</th>
              <th>Location</th>

              <th />
            </tr>
            {character}
          </thead>
        </table>
      </div>
    );
  }
}

Character.propTypes = {
  deleteCharacter: PropTypes.func.isRequired,
};

export default connect(
  null,
  { deleteCharacter }
)(withRouter(Character));
