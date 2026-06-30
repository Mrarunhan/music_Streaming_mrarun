const cloudinary = require('cloudinary').v2


cloudinary.config({
    api_key : process.env.cloudinary_api_key,
    api_secret : process.env.cloudinary_api_secret,
    cloud_name : process.env.cloudinary_api_name
})

const cloudinaryService = async ({data, folders, typess}) => {
    return await  new Promise((resolve , reject) => {
        const sream = cloudinary.uploader.upload_stream(
            {folder : folders, resource_type : typess},
            (error , result) => {
                if(error) reject(error);

                resolve(result)
            }
        )
        sream.end(data)
    })
}

module.exports = cloudinaryService