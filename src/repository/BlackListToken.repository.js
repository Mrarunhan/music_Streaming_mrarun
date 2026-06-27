const Blacklist = require('../models/Blacklist.model');



const CreateBlackListTokenRepository = async ({tokens}) => {
    const blacklistTokens = await Blacklist.create({
        tokens : tokens
    })
}


const FindBlackListTokenRepository = async ({tokens}) => {
    const blacklistTokens = await Blacklist.findOne({
        tokens : tokens
    })
}

module.exports = {
    CreateBlackListTokenRepository,
     FindBlackListTokenRepository
}