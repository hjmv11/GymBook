const express = require("express")
const usersController = require('../../controllers/userController.js')

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router()

router.route('/users')
    //get all users
    .get(usersController.getAllUsers)
    //create a single user 
    .post(usersController.createNewUser)
    //update a single user 
    .patch(usersController.updateUser)
    //delete a single user
    .delete(usersController.deleteUser)

router.route('/users/:username')
    //get single user
    .get(usersController.getUser)

module.exports = router