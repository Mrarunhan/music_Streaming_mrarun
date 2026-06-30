const {
  UserRegisterService,
  UserLoginService,
  UserGetMeService,
  UserLogoutService,
  UserUpdateSerice,
} = require("../services/User.service");
const ErrorApi = require("../utils/ErrorApi");
const STATUS_CODES = require("../utils/StatusCode");

const securtiyCheck = process.env.NODE_ENV !== "development";
/**
 *
 * @param {name , email, username , password} req
 * @param {*} res
 * @returns
 * @prifix {api/auth/register}
 */
const UserRegisterController = async (req, res) => {
  try {
    const { token } = await UserRegisterService(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: securtiyCheck,
      sameSite: securtiyCheck ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(STATUS_CODES.CREATED).json({
      message: "Register successfully",
    });
  } catch (error) {
    if (process.env.NODE_ENV == "development") {
      console.log(error.message, error.stack, error.statusCode);
      throw new ErrorApi(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

/**
 *
 * @param {username and email password} req
 * @param {token} res
 * @access public
 * path api/auth/login
 */
const UserLoginController = async (req, res) => {
  try {
    const { token } = await UserLoginService(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: securtiyCheck,
      sameSite: securtiyCheck ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(STATUS_CODES.OK).json({
      message: "login successfully",
    });
  } catch (error) {
    if (!securtiyCheck) {
      console.log(error.message, error.stack);
    }

    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

/**
 * @param {password , tokenId} req
 * @param {}res
 * @access privet
 * @path api/auth/logout
 */
const UserLogoutController = async (req, res) => {
  try {
    await UserLogoutService({
      token: req.cookies.token,
      userId: req.user.id,
      password: req.body.password,
    });

    res.clearCookie("token");
    return res.status(STATUS_CODES.OK).json({
      message: "Logout successfully",
    });
  } catch (error) {
    if (!securtiyCheck) {
      console.log(error.message, error.stack);
      throw new ErrorApi(error.message, STATUS_CODES.FORBIDDEN);
    }

    return res.status(STATUS_CODES.FORBIDDEN).json({
      message: error.message,
    });
  }
};

/**
 * @param {token id} req
 * @path api/auth/get-me
 */
const UserGetMeController = async (req, res) => {
  try {
    const user = await UserGetMeService({ id: req.user.id });

    res.status(STATUS_CODES.OK).json({
      messasge: "ok",
    });
  } catch (error) {
    if (!securtiyCheck) {
      throw new ErrorApi(error.message, STATUS_CODES.FORBIDDEN);
      console.log(error.message);
    }

    return res.status(STATUS_CODES.FORBIDDEN).json({
      message: error.message,
    });
  }
};

/**
 * @param {user(id , update image and name)} req
 * @access privet
 * @path api/auth/update
 */

const UserUpdateController = async (req, res) => {
  try {
    await UserUpdateSerice({
      userId: req.user.id,
      body: req.body,
      profileImage: req.file.buffer,
    });

    

    res.status(STATUS_CODES.OK).json({
      message: "update successfully",
    });
  } catch (error) {
    if (!securtiyCheck) {
      console.log(error.message, error.stack);
      throw new ErrorApi(error.message, STATUS_CODES.FORBIDDEN);
    }
    res.status(STATUS_CODES.FORBIDDEN).json({
      message: error.message,
    });
  }
};

module.exports = {
  UserRegisterController,
  UserLoginController,
  UserLogoutController,
  UserGetMeController,
  UserUpdateController,
};
