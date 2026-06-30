const {Artist} = require("../models/User.model")

const ArtistCreateRepository = async ({userId  }) => {
        const CreateArtist = await Artist.create({
            userId : userId,
            verified : true
        }) 
        
        return !!CreateArtist;
}


const ArtistUpdateRepository = async ({userId, body}) => {
    console.log(userId)
    const ArtistUpdate = await Artist.updateOne(
        {userId : userId},
        
        body,
        {new : true}
        
    )

    return ArtistUpdate;
}

module.exports = {
    ArtistCreateRepository,
    ArtistUpdateRepository
}