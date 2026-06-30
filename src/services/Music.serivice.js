const ErrorApi = require("../utils/ErrorApi");
const STATUS_CODEs  = require("../utils/StatusCode")
const cloudinaryService = require("../config/Cloudniry");
const { CreateSongRepository } = require("../repository/Music.Repository");


const CreateMusicService = async ({userId , music , thumbnail , body}) => {
    const { title, description, genre} = body
    
    console.log(userId)
    let audio = await cloudinaryService({data : music, folders : "music-systum", typess : 'video'})
    let  poster = await cloudinaryService({data : thumbnail,folders : "music-thumbnail" })
    const duration = audio.duration;
    audio = audio.url;
   
   const create = await CreateSongRepository({title, description, genre, userId, thumbnail : poster.url , audio, duration});

   
   if(!create) throw new ErrorApi("music is not created")

    return true
}



module.exports = {
    CreateMusicService
}