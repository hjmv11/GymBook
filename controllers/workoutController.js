const Workout = require('../models/Workout')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

//get all workouts
//route /workouts
const getAllWorkouts = asyncHandler(async (req,res) => {
    const workouts = await Workout.find().lean().exec()

    if(!workouts.length) {
        return res.status(400).json({error: 'No workouts found'})
    }

    res.json(workouts)
})

//get single workout
//route /workouts
const getWorkout = asyncHandler(async (req,res) => {
    const input = req.path.substring(req.path.lastIndexOf('/')+1).split(':')
    let username = input[0]
    let workout_name = input[1]
    const workout = await Workout.findOne({username, workout_name}).lean().exec()

    if (!workout) {
        return res.status(400).json({error: 'Workout not found'})
    }

    res.json(workout)
})

//create new workout
//route /workouts
const createNewWorkout = asyncHandler(async (req,res) => {
    
        const {username, workout_name, exercises} = req.body
    
        //check data passed for null or undefined
        if (!username || !workout_name || !exercises.length) {
            return res.status(400).json({error: 'All fields are required'})
        }
    
        //check for existing user and duplicate workout
        const existingUser = await User.findOne({username}).lean().exec()

        if (existingUser) {
            const duplicateWorkout = await Workout.findOne({username, workout_name}).lean().exec()

            if (duplicateWorkout) {
                return res.status(400).json({error: 'Duplicate workout_name'})
            }
        } else return res.status(400).json({error: 'User not found'})

        //construct object
        const workoutObject = {username, workout_name, exercises}

        //Create and store new workout
        const workout = await Workout.create(workoutObject)
        
        if (workout) {
            res.status(200).json({message: `New workout ${workout_name} created with exercises [${exercises}]`})
        } else {
            return res.status(400).json({error: 'Invalid workout data received'})
        }


})

//update a workout
//route /workouts
const updateWorkout = asyncHandler(async (req,res) => {

    const {id, username, workout_name, exercises} = req.body
    
    //check data passed for null or undefined
    if (!id || !username || !workout_name || !exercises.length) {
        return res.status(400).json({error: 'All fields are required'})
    }

    //find workout
    const workout = await Workout.findById(id).exec()

    if (!workout) {
        return res.status(400).json({error: 'Workout not found'})
    }

    //check for existing user and duplicate workout
    const existingUser = await User.findOne({username}).lean().exec()

    if (existingUser) {
        const duplicateWorkout = await Workout.findOne({username, workout_name}).lean().exec()

        if (duplicateWorkout) {
            return res.status(400).json({error: 'Duplicate workout_name'})
        }
    } else return res.status(400).json({error: 'User not found'})

    //all checks done now update to the request
    workout.username = username
    workout.workout_name = workout_name
    workout.exercises = exercises
    
    //save updated workout
    const updatedWorkout = await workout.save()

    res.json({message: `${workout.id} / ${updatedWorkout.workout_name} updated`})

})

//delete a workout
//route /workouts
const deleteWorkout = asyncHandler(async (req,res) => {
    
    const {id} = req.body
    
    //check data passed for null or undefined
    if (!id) {
        return res.status(400).json({error: 'ID required'})
    }

    //find workout
    const workout = await Workout.findById(id).exec()

    if (!workout) {
        return res.status(400).json({error: 'Workout not found'})
    }

    let deletedWorkout_name = workout.workout_name

    //delete workout
    const result = await workout.deleteOne()

    res.json({message: `Workout ${deletedWorkout_name} deleted`})
})

module.exports = {
    getAllWorkouts,
    getWorkout,
    createNewWorkout,
    updateWorkout,
    deleteWorkout
}