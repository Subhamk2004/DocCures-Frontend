import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reduxSlices/UserSlice.mjs";
import appointmentsReducer from "../reduxSlices/AppointmentSlice.mjs";

export const Store = configureStore({
  reducer: {
    user: userReducer,
    appointments: appointmentsReducer
  }
});