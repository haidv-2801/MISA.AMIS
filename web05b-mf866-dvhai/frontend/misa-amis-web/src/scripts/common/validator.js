import Enumeration from "./enumeration";

var validate = validate || {};

validate.required = (value) => {
  value = value || "";

  let isValid = false,
    msg = "",
    errCode = Enumeration.ErrorCode.Valid;

  isValid = value.toString().trim().length > 0;
  if (!isValid) {
    msg = "không được để trống.";
    errCode = Enumeration.ErrorCode.Empty;
  }

  return {
    isValid,
    msg,
    errCode,
  };
};

validate.minLength = (value) => {
  return (min) => {
    let isValid = true,
      msg = "",
      errCode = Enumeration.ErrorCode.Valid;

    if (!value)
      return {
        isValid,
        msg,
        errCode,
      };

    isValid = value.toString().trim().length >= min;

    if (!isValid) {
      msg = `độ dài tối thiểu ${min} kí tự.`;
      errCode = Enumeration.ErrorCode.InValid;
    }

    return {
      isValid,
      msg,
      errCode,
    };
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
    msg = `chưa đúng định dạng.`;
    errCode = Enumeration.ErrorCode.IncorrectFormat;
  }

  return {
    isValid,
    msg,
    errCode,
  };
};

validate.number = (value) => {
  let isValid = true,
    msg = "",
    errCode = Enumeration.ErrorCode.Valid;

  if (!value)
    return {
      isValid,
      msg,
      errCode,
    };

  isValid = /^[0-9]+$/.test(value);

  if (!isValid) {
    msg = `chưa đúng định dạng.`;
    errCode = Enumeration.ErrorCode.IncorrectFormat;
  }

  return {
    isValid,
    msg,
    errCode,
  };
};

export default validate;
