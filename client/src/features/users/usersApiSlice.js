import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/api/gymbook/users',
            /*validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },*/
            keepUnusedDataFor: 5, 
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'User', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'User', id}))
                    ]
                } else return [{type: 'User', id: 'LIST'}]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: [
                {type: 'User', id: 'LIST'}
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        }),
        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: '/users',
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        })        
    }),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation
} = usersApiSlice

//returns query result
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

//creates selector with the query result and the result data 
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)

//getSelectors creates the selectors below and we give them aliases
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    //pass in a selector that returns the users slice of state, if null return the initial state 
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)