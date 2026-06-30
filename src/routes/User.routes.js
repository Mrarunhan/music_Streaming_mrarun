const express = require('express');

const UserRoutes = express.Router();


const {AuthValidater }= require("../validators/AuthValidater")
const {UserRegisterController , UserLoginController, UserGetMeController, UserLogoutController, UserUpdateController}= require('../controllers/User.controller');
const AuthMiddleWare = require('../middleware/Auth.middleware');
const upload = require("../middleware/multer.middleware")

/**
 * User register apis
 */


//api/auth/register
UserRoutes.post("/register", AuthValidater, UserRegisterController)
//api/auth/login
UserRoutes.post("/login", UserLoginController)
//api/auth/get-me
UserRoutes.get("/get-me", AuthMiddleWare, UserGetMeController)
//api/auth/logout
UserRoutes.get("/logout", AuthMiddleWare, UserLogoutController);
// api/auth/update
UserRoutes.patch("/update", AuthMiddleWare,upload.single('profileImage'), UserUpdateController)


module.exports = UserRoutes;