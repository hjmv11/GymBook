const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    workout_name: { 
        type: String, 
        required: true 
    },
    exercises: [{
        type: String,
        required: true
    }]
}, 
{
    timestamps: true,
    collection: 'Workouts'
});


module.exports = mongoose.model('Workout', workoutSchema);


 

;