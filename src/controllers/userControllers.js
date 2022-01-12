const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  response_created,
  response_success,
  response_bad_request,
  response_internal_server_error,
} = require("../middlewares/responseHandlers");

const register = async (req, res) => {
  try {
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

    await User.create({
      name,
      password: bcrypt.hashSync(password, 8),
    });

    return response_created(res, null, "User Created");
  } catch (error) {
    return response_internal_server_error(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user_name = await User.findOne({
      where: {
        name: name,
      },
    });

    if (!user_name) {
      return response_bad_request(res, "Invalid Name!");
    }

    const validate_pass = bcrypt.compareSync(password, user_name.password);
    if (!validate_pass) {
      return response_bad_request(res, "Invalid Password!");
    }

    const payload = { user_id: user_name.user_id };

    // JWT that store user id and only last for 5 minutes
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    return response_success(res, { access_token: token });
  } catch (error) {
    return response_internal_server_error(res, error.message);
  }
};

module.exports = {
  register,
  login,
};
