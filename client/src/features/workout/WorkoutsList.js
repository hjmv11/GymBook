import React from 'react'
import { useGetWorkoutsQuery } from './workoutsApiSlice'
import Workout from './Workout'

const WorkoutsList = () => {
  const {
    data: workouts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetWorkoutsQuery()

  let content 

  if (isLoading) content = <p>Loading...</p>

  if (isError) content = <p className="errmsg">{error?.data?.message}</p>

  if (isSuccess) {
    const { ids } = workouts

    const tableContent = ids?.length
    ? ids.map(workoutId => <Workout key={workoutId} workoutId={workoutId}/>)
    : null

    content = (
      <table className='table table_workouts'>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content
}

export default WorkoutsList