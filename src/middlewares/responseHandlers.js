const response = (res, status, content = null, message = "", errors = []) => {
  return res.status(status).json({ content, message, errors });
};

const response_bad_request = (res, message = "Bad Request", errors = []) => {
  return response(res, 400, undefined, message, errors);
};

const response_forbidden = (res, message = "Forbidden", errors = []) => {
  return response(res, 403, undefined, message, errors);
};

const response_internal_server_error = (
  res,
  message = "Internal Server Error",
  errors = []
) => {
  return response(res, 500, undefined, message, errors);
};

const response_not_found = (res, message = "Not Found", errors = []) => {
  return response(res, 404, undefined, message, errors);
};

const response_success = (res, content = null, message = "Success") => {
  return response(res, 200, content, message, undefined);
};

const response_created = (res, content = null, message = "Created") => {
  return response(res, 201, content, message, undefined);
};

module.exports = {
  response,
  response_bad_request,
  response_forbidden,
  response_internal_server_error,
  response_not_found,
  response_success,
  response_created,
};
