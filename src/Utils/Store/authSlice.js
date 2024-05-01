import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    needToAuthenticate: false,
    user: null,
    getAuthenticate: {
        role: null,
        authType: null,

    }
}

const authSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true,
                state.needToAuthenticate = true
            state.user = action.payload
        },
        updateUserData: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.needToAuthenticate = true;
            state.user = null;
        },
        patientAuth: (state, action) => {
            state.getAuthenticate = {
                role: "PATIENT",
                authType: action.payload
            }
            // state.getAuthenticate.role = 'PATIENT';
            // state.getAuthenticate.authType = action.payload;
        },
        doctorAuth: (state, action) => {
            state.getAuthenticate = {
                role: "DOCTOR",
                authType: action.payload
            }
        },
        hospitalAuth: (state, action) => {
            state.getAuthenticate = {
                role: "MASTER",
                authType: action.payload
            }
        },
        resetState: (state, action) => {
            state.getAuthenticate = {
                role: null,
                authType: null
            }
        },
    }
})

export const { login, updateUserData, logout, patientAuth, doctorAuth, hospitalAuth, resetState } = authSlice.actions;

export default authSlice.reducer;