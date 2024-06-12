const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//get all users
//route /users
const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select('-password').lean()

    if(!users.length) {
        return res.status(400).json({message: 'No users found'})
    }

    res.json(users)
})

//get single user
//route /users
const getUser = asyncHandler(async (req,res) => {
    const username = req.path.substring(req.path.lastIndexOf('/',)+1)
    const user = await User.findOne({username}).select('-password').lean().exec()

    if (!user) {
        return res.status(400).json({error: 'User not found'})
    }

    res.json(user)
})

//create new user
//route /users
const createNewUser = asyncHandler(async (req,res) => {
    
        const {username, password, roles} = req.body
    
        //check data passed for null or undefined
        if (!username || !password || !roles.length) {
            return res.status(400).json({message: 'All fields are required'})
        }
    
        //check for duplicate
        const duplicate = await User.findOne({username}).lean().exec()

        if (duplicate) {
            res.status(409).json({error: 'Duplicate username'})
        }

        //hash pwd
        const hashedPwd = await bcrypt.hash(password, 10)

        const userObject = {username, "password": hashedPwd, roles}

        //Create and store new user
        const user = await User.create(userObject)
        
        if (user) {
            res.status(200).json({message: `New user ${username} created with roles [${roles}]`})
        } else {
            res.status(400).json({error: 'Invalid user data received'})
        }


})

//update a user
//route /users
const updateUser = asyncHandler(async (req,res) => {

    const {id, username, roles, password} = req.body
    
    //check data passed for null or undefined
    if (!id || !username || !roles.length) {
        return res.status(400).json({message: 'All fields are required'})
    }

    //find user
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({error: 'User not found'})
    }

    //check for duplicate
    const duplicate = await User.findOne({username}).lean().exec()

    if (duplicate) {
        return res.status(400).json({error: 'Duplicate username'})
    }

    //all checks done now update to the request
    user.username = username
    user.roles = roles

    if (password) {
        user.password = bcrypt.hash(password, 10)
    }
    
    //save updated user
    const updatedUser = await user.save()

    res.json({message: `${user.id} / ${updatedUser.username} updated`})

})

//delete a user
//route /users
const deleteUser = asyncHandler(async (req,res) => {
    
    const {id} = req.body
    
    //check data passed for null or undefined
    if (!id) {
        return res.status(400).json({message: 'ID required'})
    }

    //find user
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({error: 'User not found'})
    }

    let deletedUsername = user.username

    //delete user
    const result = await user.deleteOne()

    res.json({message: `User ${deletedUsername} deleted`})
})

module.exports = {
    getAllUsers,
    getUser,
    createNewUser,
    updateUser,
    deleteUser
}