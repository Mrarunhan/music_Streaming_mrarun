const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ErrorApi = require("../utils/ErrorApi");
const STATUS_CODES = require("../utils/StatusCode")
const {FindUserRepository , CreateUserRepository, UpdateUserRepository} = require('../repository/User.repository');
const { CreateBlackListTokenRepository } = require("../repository/BlackListToken.repository");
const cloudinaryService = require("../config/Cloudniry");


const UserRegisterService = async(body) => {
    const {name ,email , username , password} = body;

    const exitUser = await FindUserRepository({username : username , email : email});

    if(exitUser) throw new ErrorApi('User Already registered  ', STATUS_CODES.FORBIDDEN);

    const hashPassword = await bcrypt.hash(password , 10);

    const isUser = await CreateUserRepository({
        name : name,
        email ,
        username,
        password : hashPassword
    })

    const token = jwt.sign({id : isUser._id, role : isUser.role}
        , process.env.SECRET_KEY,
        {expiresIn : '7d'}
    );

    return {
        token,
       
    }
}


const UserLoginService = async (body) => {
    
    const {username = "gust" , email = "gust@gust.com", password} = body;

    
    const isUser = await FindUserRepository({username : username, email : email});
    
    console.log(isUser)
    if(!isUser) throw new ErrorApi("Unauthrized", STATUS_CODES.UNAUTHORIZED);

    const passwordVerify = await bcrypt.compare(password, isUser.password)


    if(!passwordVerify) throw new ErrorApi("Wrong password", STATUS_CODES.NOT_FOUND);

    const token = jwt.sign({id : isUser._id, role : isUser.role},
        process.env.SECRET_KEY,
        {expiresIn : '7d'}
    )

    return {
        token
    }

}

const UserLogoutService = async ({userId , password , token}) => {

    const exitUser = await FindUserRepository({id : userId})
    const passwordVerify = await bcrypt.compare(password ,exitUser.password )
    
    if(!passwordVerify) throw new ErrorApi("Wrong password", STATUS_CODES.FORBIDDEN);

    const blackListToken  = await CreateBlackListTokenRepository({tokens :token})


    return !!blackListToken;
}

const UserGetMeService = async ({id}) => {
    console.log(id)
    const exitUser = await FindUserRepository({id : id});

    console.log(exitUser)
    if(!exitUser){
        throw new ErrorApi("Unauthrized", STATUS_CODES.UNAUTHORIZED)
    }

    return !!exitUser
}

const UserUpdateSerice = async ({userId , body, profileImage}) => {
    const {name} = body;
    
    const data = {}
    let img ;

    if(profileImage){
        img = await cloudinaryService({data : profileImage, folders : "profilepic"})
    }

    if(name) data.name = name;
    if(profileImage) data.profileImage = img.url;

    const update = await UpdateUserRepository({id : userId, update : data});

    if(!update) throw new ErrorApi("update failed");

    return true
}

module.exports = {
    UserRegisterService,
    UserLoginService,
    UserLogoutService,
    UserGetMeService,
    UserUpdateSerice
}