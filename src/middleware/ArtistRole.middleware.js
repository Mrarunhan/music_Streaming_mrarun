const ErrorApi = require("../utils/ErrorApi");
const STATUS_CODES = require("../utils/StatusCode");

const ArtistRoleMiddleware = async (req , res , next) => {
    const role = req.user.role;

    console.log(role)
    if(role === 'user'){
        throw new ErrorApi("You are no artist account", STATUS_CODES.FORBIDDEN)
    }
    
    next()
}

module.exports = ArtistRoleMiddleware