import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    email: '',
    phone:'',
    isAuthenticated: false,
    image: null,
    address:''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.email = ''
            state.phone = ''
            state.image = null
            state.address = ''
            state.isAuthenticated = false
        },
        authenticate: (state, action) => {
            console.log(action.payload);
            state.email = action.payload.email
            state.name = action.payload.name
            state.phone = action.payload.phone
            state.image = action.payload.image
            state.isAuthenticated = true
        },
        setDisplayAlert: (state, action) => {
            console.log(action.payload);
            state.displayAlert = action.payload
        }
    }
})

export const { logout, authenticate, setDisplayAlert } = userSlice.actions;
let userReducer = userSlice.reducer;
export default userReducer;