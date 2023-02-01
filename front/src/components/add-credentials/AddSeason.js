import React, { Component } from "react";
//bring in the redux state we need withROuter to redirect from an action
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
//we need the connect import for containers
import { connect } from "react-redux";
import PropTypes from "prop-types";
//the addSeason action
import { addSeason } from "../../actions/profileActions";
import Image from "react-bootstrap/Image";

class AddSeason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameseason: "",
      version: "",
      episodes: "",
      numbercharacters: "",
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

    const expData = {
      nameseason: this.state.nameseason,
      version: this.state.version,
      episodes: this.state.episodes,
      numbercharacters: this.state.numbercharacters,
    };

    //we can use history because we brought in withRouter
    this.props.addSeason(expData, this.props.history);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    //FUnFACT: Destructuring is an ES6 standard
    const { errors } = this.state;

    return (
      <div className="add-season">
        <div className="container">
          <div className="row">
            <Image
              style={{
                minWidth: 200,
                maxWidth: 200,
                maxHeight: 300,
              }}
              src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-moon-mod-download-35.png"
              class="img-fluid img-thumbnail rounded-4 my-4 "
              alt=""
            />
            <div className="div col-md-8 m-auto">
              <Link to="dashboard" className="btn btn-info ">
                Go Back
              </Link>
              <h1 className="hisplay-4 text-center">Add Season</h1>
              <p className="lead text-center">Add Season</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Season"
                  name="nameseason"
                  value={this.state.nameseason}
                  onChange={this.onChange}
                  error={errors.nameseason}
                />

                <TextFieldGroup
                  placeholder="* Version"
                  name="version"
                  value={this.state.version}
                  onChange={this.onChange}
                  error={errors.version}
                />

                <TextFieldGroup
                  placeholder="* Number of Episodes"
                  name="episodes"
                  value={this.state.episodes}
                  onChange={this.onChange}
                  error={errors.episodes}
                  info="Number of Episodes"
                />

                <TextFieldGroup
                  placeholder="Number of Characters"
                  name="numbercharacters"
                  value={this.state.numbercharacters}
                  onChange={this.onChange}
                  error={errors.numbercharacters}
                  info="Number of characters"
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
AddSeason.propTypes = {
  addSeason: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { addSeason }
)(withRouter(AddSeason));
