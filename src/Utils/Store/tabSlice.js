import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tabValue: 0,
}

const tabSlice = createSlice({
    name: "tab",
    initialState: initialState,
    reducers: {
        setTabValue: (state, action) => {
            state.tabValue = action.payload;
        }
        // login: (state, action) => {
        //     state.isLoggedIn = true,
        //         state.user = action.payload
        // },
        // logout: (state, action) => {
        //     state.isLoggedIn = false;
        //     state.user = null;
        // },
    }
})

export const { setTabValue } = tabSlice.actions;

export default tabSlice.reducer;