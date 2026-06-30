const Blacklist = require('../models/Blacklist.model');



const CreateBlackListTokenRepository = async ({tokens}) => {
    const blacklistTokens = await Blacklist.create({
        tokens : tokens
    })

    return !!blacklistTokens
}


const FindBlackListTokenRepository = async ({tokens}) => {
    const blacklistTokens = await Blacklist.findOne({
        tokens : tokens
    })

    return !!blacklistTokens
}

module.exports = {
    CreateBlackListTokenRepository,
     FindBlackListTokenRepository
}