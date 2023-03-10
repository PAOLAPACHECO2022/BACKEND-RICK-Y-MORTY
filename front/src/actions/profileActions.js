import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';

// Get profile by profiles
export const getProfileByCharacterName = fullname => dispatch => {
  //setprofileloading to set the profile to be loading before the actual request
  dispatch(setProfileLoading());
  //get current user profile
  axios
    .get(`/api/profile/fullname/${fullname}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    //If there isn't a profile, just return an empty profile and a button to create one, instead of errors
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Get All Profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  //setprofileloading to set the profile to be loading before the actual request
  dispatch(setProfileLoading());
  //get current user profile
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    //If there isn't a profile, just return an empty profile and a button to create one, instead of errors
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//Create a new Profile, history used for redirecting with router
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        //make sure to bring in GET_ERRORS type
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete character
export const deleteCharacter = id => dispatch => {
  axios
    .delete(`/api/profile/character/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete season
export const deleteSeason = id => dispatch => {
  axios
    .delete(`/api/profile/season/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Character
export const addCharacter = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/character', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Season
export const addSeason = (expData, history) => dispatch => {
  axios
    .post('/api/profile/season', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete account & profile
//NOTE: dispatch is used for AXIOS requests
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This action CANNOT be undone.')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

//Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

//Profile loading - just lets reducer know this is loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
