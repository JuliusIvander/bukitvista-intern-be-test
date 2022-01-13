const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const logger = require("../services/loggerServices");

const {
  response_created,
  response_success,
  response_bad_request,
  response_internal_server_error,
} = require("../middlewares/responseHandlers");

const register = async (req, res) => {
  try {
    // Getting user name and password from request body
    logger.http("POST /auth/register Route is accessed");
    const { name, password } = req.body;

    // Checking if name exists or not
    const user_exists = await User.findOne({
      where: {
        name: name,
      },
    });
    if (user_exists) {
      return response_bad_request(res, "Name is already in use!");
    }

    // Store user name and hashed password to DB
    await User.create({
      name,
      password: bcrypt.hashSync(password, 8),
    });

    logger.info("User Data Successfully Created");
    return response_created(res, null, "User Created");
  } catch (error) {
    logger.error(`Internal Server Error: ${error}`);
    return response_internal_server_error(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    // Getting user name and password from request body
    logger.http("POST /auth/login Route is accessed");
    const { name, password } = req.body;

    // Checking if user name is exists
    const user_name = await User.findOne({
      where: {
        name: name,
      },
    });
    if (!user_name) {
      logger.error("User failed to login due to invalid name");
      return response_bad_request(res, "Invalid Name!");
    }

    // Checking if user password is valid
    const validate_pass = bcrypt.compareSync(password, user_name.password);
    if (!validate_pass) {
      logger.error("User failed to login due to invalid password");
      return response_bad_request(res, "Invalid Password!");
    }

    const payload = { user_id: user_name.user_id };

    // JWT that store user id and only last for 5 minutes
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    logger.info("User Successfully Login");
    return response_success(res, { access_token: token });
  } catch (error) {
    logger.error(`Internal Server Error: ${error}`);
    return response_internal_server_error(res, error.message);
  }
};

module.exports = {
  register,
  login,
};
