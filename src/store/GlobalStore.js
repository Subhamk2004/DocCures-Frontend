import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reduxSlices/UserSlice.mjs";

export const Store = configureStore({
    reducer:{
        user: userReducer
    }
})