const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSeasonInput(data) {
  let errors = {};

  // gets tested as undef or null and gets turned into an expty string
  data.namecharacter = !isEmpty(data.namecharacter) ? data.namecharacter: '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.creaciondate = !isEmpty(data.creaciondate) ? data.creaciondate : '';
  data.species = !isEmpty(data.species) ? data.species : '';
  data.location= !isEmpty(data.location) ? data.location : '';
  


  if (Validator.isEmpty(data.namecharacter)) {
    errors.namecharacter = 'Characternumber field is required';
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Characternumber field is required';
  }

  if (Validator.isEmpty(data.creaciondate)) {
    errors.creaciondate = 'Field of Character field is required';
  }
  if (Validator.isEmpty(data.species)) {
    errors.species = 'Character field is required';
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = 'Character field is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
