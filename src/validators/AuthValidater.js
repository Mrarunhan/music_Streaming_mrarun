const ErrorApi = require("../utils/ErrorApi");
const STATUS_CODES = require("../utils/StatusCode");
const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const usernameCheck = /^[a-zA-Z0-9_]{3,16}$/;
const usernameRules =
  "[a-zA-Z0-9_]: Sirf letters (a-z, A-Z), numbers (0-9), aur underscore (_) allow hain. (Special characters like @, #, $, space allow nahi hain).";

const passwordCheck =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordRules =
  "At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character";
/**
 *
 * @param {username , email , password } req
 * @param {*} res
 * @param {*} next
 */
const AuthValidater = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    throw new ErrorApi(
      "All field is required - Eamil , username , password",
      STATUS_CODES.BAD_REQUEST,
    );

  if (!emailCheck.test(email))
    throw new ErrorApi("give me write emails", STATUS_CODES.BAD_REQUEST);

  if (!usernameCheck.test(username))
    throw new ErrorApi(usernameRules, STATUS_CODES.BAD_REQUEST);

  if (!passwordCheck.test(password))
    throw new ErrorApi(passwordRules, STATUS_CODES.BAD_REQUEST);

  next();
};

module.exports = {
  AuthValidater,
};
