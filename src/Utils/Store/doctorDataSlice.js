import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    doctor: null,
};

const doctorsDataSlice = createSlice({
    name: "doctor",
    initialState: intialState,
    reducers: {
        selectedDoctorsData: (state, action) => {
            state.doctor = action.payload;
        },
        updateDoctorsData: (state, action) => {
            state.doctor = action.payload;
        },
        logOutDoctor: (state, action) => {
            state.doctor = null;
        },
    },
});

export const { selectedDoctorsData, updateDoctorsData, logOutDoctor } =
    doctorsDataSlice.actions;

export default doctorsDataSlice.reducer;
