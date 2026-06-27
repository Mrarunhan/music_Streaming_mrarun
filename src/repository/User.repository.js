const User = require('../models/User.model');


const FindUserRepository = async ({username, email , id}) => {
    const exitUser = await User.findOne(
        {$or : [
            {username : username},
            {email : email},
            {_id : id}
        ]}
    )

    return exitUser;
}

const CreateUserRepository = async ({name , username , email, password}) => {


    const user = await User.create({
        name : name,
        username : username,
        email : email,
        password : password,
    })

    return user
}





const UpdateUserRepository = async (update , username , email) => {

    const updatesUser =  await User.findOneAndUpdate(
        {$or : [
            {username : username},
            {email : email}
        ]},
        {update}
    )

    return !!updatesUser
}



const DeleteUserRepository = async ({username , email}) => {
    const user = await User.deleteOne({
        $or :  [
            {username :  username},
            {email : email}
        ]
    })
}

module.exports = {
    FindUserRepository,
    CreateUserRepository,
    UpdateUserRepository,
    DeleteUserRepository
}