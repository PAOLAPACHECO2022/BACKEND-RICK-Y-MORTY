import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//Step 4: Text Field Groups
import TextFieldGroup from '../common/TextFieldGroup';
//Step 5: Import other form groups


//Create profile function
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  //Step 1: create the component state values (the fields)
  constructor(props) {
    super(props);
    this.state = {
      //toggle
      fullname: '',
      city: '',
      telepone: '',
      email: '',
      errors:{}
  
    };

    //53:2 bind onChange and onSubmit
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  //For Create Profile from profileActions
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      //fills the state with the error
      this.setState({ errors: nextProps.errors });
    }
    //We want to see if this profile has come in from the state because we want to fill the component fields with those values
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      //if the user doesn't have option fields filled in, we need to make it an empty string
      //so import isEmpty function
      //we want to make the skills array into a CSV
      //takes array and splits each value by a comma


      //if profile field doens't exist, make empty string

      profile.city = !isEmpty(profile.city)
    
      ? profile.city
      : '';
      profile.telepone = !isEmpty(profile.telepone)
    
        ? profile.telepone
        : '';


        profile.email = !isEmpty(profile.email)
    
        ? profile.email
        : '';

       
        
  
    
        
      //Set component fields state
      this.setState({

        fullname: profile.fullname,
        city: profile.city,
        telepone: profile.telepone,
        email: profile.email,
 
      });
    }
  }

  //53:3 set up functions for the on-commands
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    //we need to get all our form fields
    const profileData = {


      fullname: this.state.fullname,
      city: this.state.city,
      telepone: this.state.telepone,
      email: this.state.email,

    
    
    
    };

    //redux actions are in props
    this.props.createProfile(profileData, this.props.history);
  }

  //Step 5: Create the inside of the form
  render() {
    //so we know what errors are
    const { errors} = this.state;

  

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {/* Added link to go back to dashboard */}
              <Link to="dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile </h1>
              <p className="p lead text-center">
                We need some info to make your profile stand out:
              </p>
              <small className="d-block pb-3  bg-info">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* fullname "
                  name="fullname"
                  value={this.state.fullname}
                  onChange={this.onChange}
                  error={errors.fullname}
                  info="* Full names and surnames"
                />
                <TextFieldGroup
                  placeholder="* City"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                  info="* City"
                />
                 <TextFieldGroup
                  placeholder="* Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="Email"
                />
                 <TextFieldGroup
                  placeholder="* Telepone"
                  name="telepone"
                  value={this.state.telepone}
                  onChange={this.onChange}
                  error={errors.telepone}
                  info="telepone"
                />
           
       

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block my-4 mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//Step 3: PropTypes
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

//Step 2: mapStateToProps
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
