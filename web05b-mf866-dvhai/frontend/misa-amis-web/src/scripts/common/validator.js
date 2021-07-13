import Enumeration from "./enumeration.js";
import Resource from "./resource";

var validate = validate || {};

validate.required = (value) => {
  value = value || "";

  let isValid = false,
    msg = "",
    errCode = Enumeration.ErrorCode.Valid;
    debugger; // eslint-disable-line no-debugger
  isValid = value.toString().trim().length > 0;
  if (!isValid) {
    msg = Resource.MsgReponse.EmptyMsgError;
    errCode = Enumeration.ErrorCode.Empty;
  }

  return {
    isValid,
    msg,
    errCode,
  };
};

validate.email = (value) => {
  let isValid = true,
    msg = "",
    errCode = Enumeration.ErrorCode.Valid;

  if (!value)
    return {
      isValid,
      msg,
      errCode,
    };

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isValid = re.test(String(value).toLowerCase());
 
  if (!isValid) {
    msg = Resource.MsgReponse.FormatInValidError;
    errCode = Enumeration.ErrorCode.IncorrectFormat;
  }

  return {
    isValid,
    msg,
    errCode,
  };
};


validate.maxLength = (value) => {
  return (max) => {
    let isValid = true,
      msg = "",
      errCode = Enumeration.ErrorCode.Valid;

    if (!value)
      return {
        isValid,
        msg,
        errCode,
      };

    isValid = value.toString().trim().length <= max;
    if (!isValid) {
      msg = `độ dài tối đa ${max} kí tự.`;
      errCode = Enumeration.ErrorCode.InValid;
    }

    return {
      isValid,
      msg,
      errCode,
    };
  };
};


export default validate;
