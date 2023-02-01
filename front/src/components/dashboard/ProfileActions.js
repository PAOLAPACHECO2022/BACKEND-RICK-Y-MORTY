import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="add-character" className="btn btn-light">
        <i className="fa fa-transgender-alt text-info mr-1" />
        Add Character
      </Link>
      <Link to="add-season" className="btn btn-light">
        <i className="fas fa-film text-info mr-1" />
        Add Season
      </Link>
   
    </div>
  );
};

export default ProfileActions;
