import React, { Component } from "react";
//bring in the redux state we need withROuter to redirect from an action
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
//we need the connect import for containers
import { connect } from "react-redux";
import PropTypes from "prop-types";
//the addCharacter action
import { addCharacter } from "../../actions/profileActions";
import Image from "react-bootstrap/Image";

class AddCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namecharacter: "",
      status: "",
      creaciondate: "",
      species: "",
      location: "",
      errors: {},
      disabled: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const eduData = {
      namecharacter: this.state.namecharacter,
      status: this.state.status,
      creaciondate: this.state.creaciondate,
      species: this.state.species,
      location: this.state.location,
    };

    //we can use history because we brought in withRouter
    this.props.addCharacter(eduData, this.props.history);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    //FUnFACT: Destructuring is an ES6 standard
    const { errors } = this.state;

    return (
      <div className="add-character">
        <div className="container">
          <div className="row img-thumbnail d-flex flex-column mx-3 gap-3 bg-light  rounded-4 border-4">
            <Image
              style={{
                minWidth: 200,
                maxWidth: 200,
                maxHeight: 300,
              }}
              src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-moon-mod-download-35.png"
              className="img-thumbnail d-flex flex-column mx-3 gap-3 bg-light  rounded-4 border-4"
              alt=""
            />

            <div className="div col-md-8 m-auto">
              <Link to="dashboard" className="btn btn-info  my-4">
                Go Back
              </Link>

              <h1 className="hisplay-4 text-center">Add Character</h1>
              <p className="lead text-center">Add any character</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <div />

                <TextFieldGroup
                  placeholder="*Name Character"
                  name="namecharacter"
                  value={this.state.namecharacter}
                  onChange={this.onChange}
                  error={errors.namecharacter}
                  info="Name Character"
                />
                <TextFieldGroup
                  placeholder="*Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Status"
                />

                <TextFieldGroup
                  name="creaciondate"
                  type="date"
                  value={this.state.creaciondate}
                  onChange={this.onChange}
                  error={errors.creaciondate}
                  info="Character creation date"
                />

                <TextFieldGroup
                  placeholder="Species"
                  name="species"
                  value={this.state.species}
                  onChange={this.onChange}
                  error={errors.species}
                  info="Species"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Location"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block my-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddCharacter.propTypes = {
  addCharacter: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { addCharacter }
)(withRouter(AddCharacter));
