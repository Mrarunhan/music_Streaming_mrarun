
const { rawListeners } = require("../models/Blacklist.model")
const { ArtistUpdateService, ArtistCreateService } = require("../services/Artist.service")
const ErrorApi = require("../utils/ErrorApi")
const STATUS_CODES = require("../utils/StatusCode")

const production = process.env.NODE_ENV === 'production'

const ArtistCreateController = async (req ,res) => {
    try {
       
        const token = await ArtistCreateService({userId : req.user.id});

        res.cookie("token", token , {
            httpOnly : true,
            secure : production ? true : false,
            sameSite : "lax",
            maxAge : 7 * 24 * 60 * 60 * 1000
        })
        res.status(STATUS_CODES.CREATED).json({
            message : "Artist create successfully"
        })
    } catch (error) {
         if(!production){
            throw new ErrorApi(error.message , STATUS_CODES.FORBIDDEN)
        }
        res.status(STATUS_CODES.FORBIDDEN).json({
            message : "Someing went wrong"
        })
    }
}

const ArtistUpdateController = async (req, res) => {
    try {
        console.log(req.user.id)
        const artistCreate =   await ArtistUpdateService({userId : req.user.id , image : req.file.buffer, body : req.body});

        
        res.status(STATUS_CODES.OK).json({
            message : "update successfully"
        })
    } catch (error) {
        if(!production){
            throw new ErrorApi(error.message , STATUS_CODES.FORBIDDEN)
        }
        res.status(STATUS_CODES.FORBIDDEN).json({
            message : "Someing went wrong"
        })
    }
}

module.exports = {
    ArtistCreateController,
    ArtistUpdateController
}