import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Importing redux tools
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  //Lifecycle method to just see if we are logged in
  //if so, we redirect to the dashboard
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      // Landing
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Rick & Morty</h1>
                <p className="lead">
                  {' '}
                  Live an adventure with Rick & Morty and create his album with his favorite profiles,namecharacter and seasons.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
