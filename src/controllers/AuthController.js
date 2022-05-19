const jwt = require("jsonwebtoken");
const User = require("../models/user");
const returnResponse = require("../utils/response/ResponseHandler");
const { hashPassword, comparePassword } = require("../utils/utils");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return returnResponse({ code: 400, msg: "Please enter all data" }, res);
  }
  try {
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return returnResponse({ code: 400, msg: "User already exists" }, res);
    }

    const hashedPassword = hashPassword(password);

    const user = new User({ name, email, password: hashedPassword });
    const data = await user.save();

    if (data) {
      return returnResponse(
        { code: 200, msg: "User registered successfully." },
        res
      );
    } else {
      return returnResponse({ code: 400, msg: "User not registered." }, res);
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return returnResponse({ code: 400, msg: "Please enter all data" }, res);
  }
  try {
    const isUserExists = await User.findOne({ email });

    if (!isUserExists) {
      return returnResponse({ code: 400, msg: "User not found." }, res);
    }

    if (!comparePassword(password, isUserExists.password)) {
      return returnResponse({ code: 400, msg: "Invalid credentials" }, res);
    }

    const data = {
      id: isUserExists._id,
      name: isUserExists.name,
      email: isUserExists.email,
    };

    const token = jwt.sign(data, process.env.SIGNATURE);

    data["token"] = token;

    returnResponse({ code: 200, msg: "Login successful", data: data }, res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
