import axios from "axios"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

/* A constant that is used in the `createAsyncThunk` function. */
export const URL = "https://randomuser.me/api/"

/* Initializing the state of the slice. */
const initialState = {
    data: [],
    isLoading: false,
    isError: null
}

/* This is the first line of the `createAsyncThunk` function. */
export const getData = createAsyncThunk("user/getData", async (_, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(URL)
        return data.results[0]
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return rejectWithValue(message)
    }
})

/* It creates a new slice. */
export const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [getData.pending]: (state) => {
            state.isLoading = true
        },
        [getData.fulfilled]: (state, {payload}) => {
            state.data = payload
            state.isLoading = false
            state.isError = null
        },
        [getData.rejected]: (state, {payload}) => {
            state.isError =  payload
        },
    }
})

/* Exporting the reducer. */
export default userSlice.reducer