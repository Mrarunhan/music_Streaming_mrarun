const { ArtistCreateRepository , ArtistUpdateRepository } = require("../repository/Artist.repository");
const { CreateUserRepository, UpdateUserRepository, FindUserRepository } = require("../repository/User.repository")
const cloudinaryService = require('../config/Cloudniry');
const STATUS_CODE = require("../utils/StatusCode")
const ErrorApi = require("../utils/ErrorApi")
const jwt = require("jsonwebtoken")

const ArtistCreateService = async ({userId }) => {
    
   

    const role= {};
    role.role = 'artist'

    const CreateArtist = await UpdateUserRepository({update : role, id : userId});

    const verifiedArtist = await ArtistCreateRepository({userId : userId});

    if(!CreateArtist || !verifiedArtist) throw new ErrorApi("Artist create worng");

    const token  = jwt.sign({id : userId, role : CreateArtist.role}, process.env.SECRET_KEY)

    return token
}


const ArtistUpdateService = async ({userId , image, body}) => {
    const {bio} = body;
    const data = {};
    let imgUrl;


    if(image){
        imgUrl = await cloudinaryService({data : image , folders : 'posters'})
    }
   
    if(bio) data.bio = bio;
    if(image) data.poster = imgUrl.url;
    
    
    const update = await ArtistUpdateRepository({userId : userId, body : data});

    if(!update) throw new ErrorApi("Artist update failed", STATUS_CODE.NOT_FOUND);

    return !!update
    
}


module.exports = {
    ArtistCreateService,
    ArtistUpdateService
}