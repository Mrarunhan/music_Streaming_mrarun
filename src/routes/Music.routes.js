const express = require("express");
const AuthMiddleWare = require("../middleware/Auth.middleware");
const upload = require("../middleware/multer.middleware");
const { CreateMusicController } = require("../controllers/Music.controller");
const MusicValidtion = require("../validators/MusicValidater");
const ArtistRoleMiddleware = require("../middleware/ArtistRole.middleware");
const MusicRouter = express.Router();

MusicRouter.post(
  "/create",
  AuthMiddleWare,
  upload.fields([
    { name: "music", maxCount: 1 },
    {name : 'thumbnail', maxCount : 1}
]),ArtistRoleMiddleware, MusicValidtion, CreateMusicController
);

module.exports = MusicRouter;
