import CommonFn from './common.js';
import Enumeration from './enumeration.js';
import Resource from './resource';

var validate = validate || {};

validate.defaultResponse = {
  isValid: true,
  message: '',
  code: Enumeration.ErrorCode.Valid
}

validate.required = (value) => {
  let result = {...validate.defaultResponse},
      notEmpty = value.toString().trim().length > 0;
      debugger; // eslint-disable-line no-debugger
  if(!notEmpty) {
    result.isValid = notEmpty;
    result.message = Resource.MsgReponse.EmptyMsgError;
    result.code = Enumeration.ErrorCode.Empty;
  }

  return result;
};

validate.email = (value) => {
  let result = {...validate.defaultResponse},
      notEmpty = value.toString().trim().length > 0,
      isEmail = CommonFn.validateEmail(value);

  if(!notEmpty) return result;
  if (!isEmail) {
    result.isValid = isEmail;
    result.message = Resource.MsgReponse.FormatInValidError;
    result.code = Enumeration.ErrorCode.IncorrectFormat;
  }

  return result;
};

validate.maxLength = (value) => {
  return (max) => {
    let result = {...validate.defaultResponse},
        notEmpty = value.toString().length > 0,
        isValid = value.toString().length <= max;
      
    if(!notEmpty) return result;
    if(!isValid) {
      result.isValid = isValid;
      result.message = Resource.MsgReponse.MaxLengthMsgError.format(`${max}`);
    }

    return result;
  };
};

validate.minLength = (value) => {
  return (min) => {
    let result = {...validate.defaultResponse},
        notEmpty = value.toString().length > 0,
        isValid = value.toString().length >= min;
      
    if(!notEmpty) return result;
    if(!isValid) {
      result.isValid = isValid;
      result.message = Resource.MsgReponse.MinLengthMsgError.format(`${min}`);
    }

    return result;
  };
};

validate.execute = (value, options) => {
  debugger; // eslint-disable-line no-debugger
  if(!Array.isArray(options)) return;

  value = value || '';
  let result = {...validate.defaultResponse};

  for(const mode of options) {
    let modeSlit = mode.split(':'),
        type = modeSlit[0],
        data = modeSlit[1];

    if(result.isValid && type && validate[type]) {
      if(data) result = validate[type](value)(data);
      else result = validate[type](value);
    }
  }

  return result;
};

export default validate;