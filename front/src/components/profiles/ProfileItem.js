import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {/* With fields that are not required, we have to test them for empty */}
              {profile.city}{' '}
              {isEmpty(profile.telepone) ? null : (
                <span>at {profile.telepone}</span>
              )}
            </p>

            <p>
              {isEmpty(profile.email) ? null : (
                <span>{profile.email}</span>
              )}
            </p>
            {/* link to view profile */}
            <Link to={`/profile/${profile.fullname}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          {/* this is were we want skillsets */}
          {/* d-none is a bootstrap thing for not showing certain features under a certain screen size */}
         
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileItem;
