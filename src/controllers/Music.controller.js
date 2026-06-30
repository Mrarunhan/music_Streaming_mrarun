const { CreateMusicService } = require("../services/Music.serivice");
const STATUS_CODES = require("../utils/StatusCode");


const CreateMusicController = async (req, res) => {
  try {
  
    await CreateMusicService({
      userId: req.user.id,
      music: req.file.music,
      thumbnail: req.file.thumbnail,
      body: req.body,
    });

    res.status(STATUS_CODES.CREATED).json({
      message: "music create successfully",
    });
  } catch (error) {
    res.status(STATUS_CODES.FORBIDDEN).json({
      message: error.message,
    });
  }
};

module.exports = {
  CreateMusicController,
};
