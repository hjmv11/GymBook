import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectWorkoutById } from "./workoutsApiSlice";

import React from 'react'

const Workout = ({workoutId}) => {
    const workout = useSelector(state => selectWorkoutById(state, workoutId))

    const navigate = useNavigate()

    if (workout) {
        const handleEdit = () => navigate(`/log/workouts/${workoutId}`)

        const workoutExercisesString = workout.exercises.toString().replaceAll(',', ', ')

        //const cellStatus = workout.active ? '' : 'table-cell-inactive'

        return (
            <tr className="table-row workout">
                <td className="table-cell">
                  <div className="table-workout-name-row">
                    <span>Workout Name</span>
                    <button
                        className="icon-button table-button"
                        onClick={handleEdit}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </div>
                  
                  <div>
                    <span>{workout.workout_name}</span>
                  </div>
                </td>

                <td className="table-cell">
                  <div className="table-exercises-row">
                    <span>Exercises</span>
                  </div>

                  <span>{workoutExercisesString}</span>                  
                </td>
            </tr>
        )

    } else return null
}


export default Workout