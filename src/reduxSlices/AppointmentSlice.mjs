import { createSlice } from "@reduxjs/toolkit";

let initialState = []

export const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        clearAppointments: (state, action) => {
            return [];
        },
        addAppointments: (state, action) => {
            console.log(action.payload);
            return action.payload;
        }
    }
})

export const { clearAppointments, addAppointments } = appointmentSlice.actions;
let appointmentReducer = appointmentSlice.reducer;
export default appointmentReducer;