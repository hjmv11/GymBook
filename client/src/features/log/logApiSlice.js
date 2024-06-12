import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const logAdapter = createEntityAdapter({})

const initialState = logAdapter.getInitialState()

export const logApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getlog: builder.query({
            query: () => './log',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5, 
            transformResponse: responseData => {
                const loadedlog = responseData.map(log => {
                    log.id = log._id
                    return log
                })
                return logAdapter.setAll(initialState, loadedlog)
            },
            providesTags: (result, error, arg) => {
                if (result ?.ids) {
                    return [
                        {type: 'log', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'log', id}))
                    ]
                } else return [{type: 'log', id: 'LIST'}]
            }
        }),
    }),
})

export const {
    useGetlogQuery
} = logApiSlice

//returns query result
export const selectLogResult = logApiSlice.endpoints.getlog.select()

//creates selector with the query result and the result data 
const selectLogData = createSelector(
    selectLogResult,
    logResult => logResult.data
)

//getSelectors creates the selectors below and we give them aliases
export const {
    selectAll: selectAllLog,
    selectById: selectLogById,
    selectIds: selectLogIds
    //pass in a selector that returns the log slice of state, if null return the initial state 
} = logAdapter.getSelectors(state => selectLogData(state) ?? initialState)