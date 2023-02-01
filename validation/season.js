const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSeasonInput(data) {
  let errors = {};

  // gets tested as undef or null and gets turned into an expty string
  data.nameseason = !isEmpty(data.nameseason) ? data.nameseason : '';
  data.version = !isEmpty(data.version) ? data.version : '';
  data.episodes = !isEmpty(data.episodes) ? data.episodes : '';
  data.numbercharacters = !isEmpty(data.numbercharacters) ? data.numbercharacters : '';

  if (Validator.isEmpty(data.nameseason)) {
    errors.nameseason = 'The field is required';
  }

  if (Validator.isEmpty(data.version)) {
    errors.version = 'version field is required';
  }

  if (Validator.isEmpty(data.episodes)) {
    errors.episodes = 'The field is required';
  }
  if (Validator.isEmpty(data.numbercharacters)) {
    errors.numbercharacters= 'The field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
