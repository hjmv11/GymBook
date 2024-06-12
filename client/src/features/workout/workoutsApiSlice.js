import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const workoutsAdapter = createEntityAdapter({})

const initialState = workoutsAdapter.getInitialState()

export const workoutsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getWorkouts: builder.query({
            query: () => '/api/gymbook/workouts',
            /*validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },*/
            keepUnusedDataFor: 5, 
            transformResponse: responseData => {
                const loadedWorkouts = responseData.map(workout => {
                    workout.id = workout._id
                    return workout
                });
                return workoutsAdapter.setAll(initialState, loadedWorkouts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Workout', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Workout', id}))
                    ]
                } else return [{type: 'Workout', id: 'LIST'}]
            }
        }),
        addNewWorkout: builder.mutation({
            query: initialWorkoutData => ({
                url: '/workouts',
                method: 'POST',
                body: {
                    ...initialWorkoutData
                }
            }),
            invalidatesTags: [
                {type: 'Workout', id: 'LIST'}
            ]
        }),
        updateWorkout: builder.mutation({
            query: initialWorkoutData => ({
                url: '/workouts',
                method: 'PATCH',
                body: {
                    ...initialWorkoutData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Workout', id: arg.id}
            ]
        }),
        deleteWorkout: builder.mutation({
            query: ({id}) => ({
                url: '/workouts',
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Workout', id: arg.id}
            ]
        })        
    }),
})

export const {
    useGetWorkoutsQuery,
    useAddNewWorkoutMutation,
    useDeleteWorkoutMutation,
    useUpdateWorkoutMutation
} = workoutsApiSlice

//returns query result
export const selectWorkoutsResult = workoutsApiSlice.endpoints.getWorkouts.select()

//creates selector with the query result and the result data 
const selectWorkoutsData = createSelector(
    selectWorkoutsResult,
    workoutsResult => workoutsResult.data
)

//getSelectors creates the selectors below and we give them aliases
export const {
    selectAll: selectAllWorkouts,
    selectById: selectWorkoutById,
    selectIds: selectWorkoutIds
    //pass in a selector that returns the workouts slice of state, if null return the initial state 
} = workoutsAdapter.getSelectors(state => selectWorkoutsData(state) ?? initialState)