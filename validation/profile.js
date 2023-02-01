const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // gets tested as an empty string
  data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
  data.telepone = !isEmpty(data.telepone) ? data.telepone : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isLength(data.fullname, { min: 2, max: 40 })) {
    errors.fullname = 'profiles needs to be at least 2 profiles';
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = 'Telepone';
  } 

  if (Validator.isEmpty(data.telepone)) {
    errors.telepone = 'Telepone';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = ' Email';
  }

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
