const express = require('express');
const router = express.Router();
//Bringing these in to route the Profile models
const mongoose = require('mongoose');
const passport = require('passport');
//Load profile Models
const Profile = require('../../models/Profile');
//Load User Models
const User = require('../../models/User');

// Mongoose useFindAndModify is deprecated
mongoose.set('useFindAndModify', false);

//Load Validation
const validateProfileInput = require('../../validation/profile');
//Validate Season Input
const validateSeasonInput = require('../../validation/season');
//Validate Character Input
const validateCharacterInput = require('../../validation/character');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works Fine' }));

// @route   GET api/profile/all
// @desc    Get all profiles in array
// @access  Public
router.get('/all', (req, res) => {
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/profiles/:profiles
// @desc    Get profile by profiles
// @access  Public
router.get('/fullname/:fullname', (req, res) => {
  const errors = {};

  //grabs profiles from the URL
  Profile.findOne({ fullname: req.params.fullname })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      //check to see if there is no profile
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      //if there is profile found
      res.json(profile);
    })
    .catch(err => res.status(404).json(errors));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  //grabs profiles from the URL
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      //check to see if there is no profile
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      //if there is profile found
      res.json(profile);
    })
    .catch(err => res.status(404).json(errors));
});

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //We want errors to be stored into objects, before we pass the into .json
    const errors = {};

    Profile.findOne({ user: req.user.id })
      //Used to bring avatar to profile
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          //Create the error
          errors.noprofile = 'There is no profile for this user';
          //Pass it into Json
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create / Edit user profile
// @access  Private
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any error with 400 city
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    //check to see if the field we are looking for has been sent it, and then set it as profileFields
    if (req.body.fullname) profileFields.fullname = req.body.fullname;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.email) profileFields.email = req.body.email;
    if (req.body.telepone) profileFields.telepone = req.body.telepone;
  
   
    
    //Look for the user before updating stuff
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update the profile, since one exists
        Profile.findOneAndUpdate(
          //who to update
          { user: req.user.id },
          //the other fields we have req.body'ed for before
          { $set: profileFields },
          { new: true }
        )
          //respond WITH that profile
          .then(profile => res.json(profile));
      } else {
        //Create a user since one does not exist

        //Check to see if profiles exists
        Profile.findOne({ fullname: profileFields.fullname }).then(profile => {
          if (profile) {
            errors.fullname = 'That fullname already exists';
            //error
            res.status(400).json(errors);
          }
          //other wise
          //Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   GET api/profile/season
// @desc    Add season to profile
// @access  Private
router.post(
  '/season',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //create the valid check variable
    const { errors, isValid } = validateSeasonInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any error with 400 city
      return res.status(400).json(errors);
    }
    //let's find a user by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      //new Season object
      const newLoc = {
        nameseason: req.body.nameseason,
        version: req.body.version,
        episodes: req.body.episodes,
        numbercharacters: req.body.numbercharacters,
      };

      //Add to season array
      profile.season.unshift(newLoc);
      //now save existing profile, which returns a promise
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   GET api/profile/character
// @desc    Add character to profile
// @access  Private
router.post(
  '/character',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //create the valid check variable
    const { errors, isValid } = validateCharacterInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any error with 400 city
      return res.status(400).json(errors);
    }
    //let's find a user by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      //new Character object
      const newEdu = {
       namecharacter: req.body.namecharacter,
       status: req.body.status,
        creaciondate: req.body.creaciondate,
        species: req.body.species,
        location: req.body.location,
      };

      //Add to Character array
      profile.character.unshift(newEdu);
      //now save existing profile, which returns a promise
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/season//:exp_id
// @desc    Delete season from profile
// @access  Private
router.delete(
  '/season/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //let's find a user by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      //Find the season that we want to delete
      //Get remove index
      //Use indexofmap
      const removeIndex = profile.season
        //turn array of seasons into id's
        .map(item => item.id)
        //gets us the season to delete
        .indexOf(req.params.exp_id);

      //Splice out of the array
      profile.season.splice(removeIndex, 1);

      //Save
      profile
        .save()
        .then(profile => res.json(profile))

        //Catch
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route   DELETE api/profile/character//:edu_id
// @desc    Delete character from profile
// @access  Private
router.delete(
  '/character/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //let's find a user by id
    Profile.findOne({ user: req.user.id }).then(profile => {
      //Find the character that we want to delete
      //Get remove index
      //Use indexofmap
      const removeIndex = profile.character
        //turn array ofnamecharacter into id's
        .map(item => item.id)
        //gets us the character to delete
        .indexOf(req.params.edu_id);

      //Splice out of the array
      profile.character.splice(removeIndex, 1);

      //Save
      profile
        .save()
        .then(profile => res.json(profile))

        //Catch
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Delete the profile
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      //Delete the user (needs user Model)
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
