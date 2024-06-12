const express = require("express")
const workoutController = require('../../controllers/workoutController.js')

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router()

router.route('/workouts')
    //get all workout
    .get(workoutController.getAllWorkouts)
    //create a single workout 
    .post(workoutController.createNewWorkout)
    //update a single workout 
    .patch(workoutController.updateWorkout)
    //delete a single workout
    .delete(workoutController.deleteWorkout)

router.route('/workouts/:workoutId')
    //get single workout
    .get(workoutController.getWorkout)

module.exports = router