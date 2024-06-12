import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import WorkoutsList from '../workout/WorkoutsList'

const Today = () => {
  let today = new Date().toLocaleDateString('en-US')

  const navigate = useNavigate()
  const {pathname} = useLocation()

  let onAddWorkoutClick

  if (pathname == '/log/day') {
    onAddWorkoutClick = () => navigate('/log/day/new_workout')
  } else if (pathname == '/log/today') {
      onAddWorkoutClick = () => navigate('/log/today/new_workout')
  }

  let addWorkoutButton = null
  if (pathname !== '/log/day/new_workout' || '/log/today/new_workout') {
      addWorkoutButton = (
          <button
              className="add-workout_button"
              onClick={onAddWorkoutClick}
          >
              Add Workout
          </button>
      )
  }

  let tableContent = <WorkoutsList/>

  const content = (
    <section className='today-container'>
      <h2>{today.toString()}</h2>

      {tableContent}

      {addWorkoutButton}
    </section>
  )
  
  return content
}

export default Today