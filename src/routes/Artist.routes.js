const express = require("express");
const { ArtistCreateController, ArtistUpdateController } = require("../controllers/Artist.controller");
const AuthMiddleWare = require("../middleware/Auth.middleware");
const upload = require('../middleware/multer.middleware');
const MusicValidtion = require("../validators/MusicValidater");

const ArtistRouter = express.Router();


// /api/artist/create
ArtistRouter.get('/create',AuthMiddleWare , ArtistCreateController);
// api/artist/update
ArtistRouter.patch('/update', AuthMiddleWare, upload.single('poster')  ,ArtistUpdateController)

module.exports = ArtistRouter;