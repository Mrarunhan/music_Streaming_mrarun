const Joi = require("joi");
const ErrorApi = require("../utils/ErrorApi");
const STATUS_CODES = require("../utils/StatusCode");


const musicSchema = Joi.object({
    title : Joi.string().required(),
    description : Joi.string().required(),
    gener : Joi.string().required(),
})

//  title,
//   description,
//   genre,
//   UserId,
//   thumbnail,
//   audio,
//   duration,


const MusicValidtion = async (req ,res ,next) =>{
    
    const thumbnail = req.files?.thumbnail?.[0].buffer;
    const music = req.files?.music?.[0].buffer;

    if(!music){
        throw new ErrorApi("audio is required", STATUS_CODES.NOT_FOUND)
    }
    
    if(!thumbnail) throw new ErrorApi("thumbnail is required", STATUS_CODES.NOT_FOUND)
     await musicSchema.validateAsync(req.body);

    
    req.file = {
        thumbnail,
        music
    }
    next()
}

module.exports = MusicValidtion;