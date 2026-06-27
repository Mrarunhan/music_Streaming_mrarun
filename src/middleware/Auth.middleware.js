
const { FindBlackListTokenRepository } = require("../repository/BlackListToken.repository");
const ErrorApi = require("../utils/ErrorApi");
const STATUS_CODES = require("../utils/StatusCode");
const jwt = require("jsonwebtoken");

const AuthMiddleWare = async (req ,res , next) => {

        
        const token = req.cookies.token;

        if(!token){
            throw new ErrorApi("Unauthrized", STATUS_CODES.UNAUTHORIZED);
        }

        const exitBlacklistToken = await FindBlackListTokenRepository({tokens : token});


        if(exitBlacklistToken) throw new ErrorApi("Unauthrized", STATUS_CODES.UNAUTHORIZED);

        
        const decode = jwt.verify(token , process.env.SECRET_KEY);

        if(!decode) throw new ErrorApi("Unauthrized", STATUS_CODES.UNAUTHORIZED );

        
        req.user = decode;

        next()
   
}

module.exports = AuthMiddleWare;