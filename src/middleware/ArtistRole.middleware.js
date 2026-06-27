const ErrorApi = require("../utils/ErrorApi");
const STATUS_CODES = require("../utils/StatusCode");

const ArtistRoleMiddleware = async (req , res , next) => {
    const role = req.user.role;

    if(role === 'user'){
        throw new ErrorApi("You have no artist account", STATUS_CODES.FORBIDDEN)
    }
    
    next()
}