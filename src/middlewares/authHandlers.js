const jwt = require("jsonwebtoken");

const {
  response_forbidden,
  response_internal_server_error,
} = require("./responseHandlers");

const auth = (req, res, next) => {
  try {
    const tokens = req.headers.authorization;

    if (!tokens) throw new Error("Invalid Tokens!");

    const split_tokens = tokens.split(" ");
    if (split_tokens[0] !== "Bearer") throw new Error("Invalid Tokens!");

    jwt.verify(split_tokens[1], process.env.JWT_SECRET, (err, encoded) => {
      if (err) {
        throw new Error("Invalid Token");
      }
      req.body.user_id = encoded.user_id;
      next();
    });
  } catch (error) {
    if (error instanceof Error) {
      return response_forbidden(res, error.message);
    }
    return response_internal_server_error(res, error.message);
  }
};

module.exports = auth;
