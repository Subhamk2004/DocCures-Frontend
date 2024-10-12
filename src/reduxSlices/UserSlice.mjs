import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    email: '',
    phone: '',
    isAuthenticated: false,
    image: null,
    address: '',
    name: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.email = ''
            state.phone = ''
            state.image = null
            state.address = ''
            state.isAuthenticated = false
        },
        authenticate: (state, action) => {
            console.log(action.payload);
            state.email = action.payload.user.email
            state.name = action.payload.user.name
            state.phone = action.payload.user.phone
            state.image = action.payload.user.image
            state.address = action.payload.user.address
            state.isAuthenticated = true
        },
        updateUser: (state, action) => {
            console.log(action.payload);
            state.email = action.payload.user.email
            state.name = action.payload.user.name
            state.phone = action.payload.user.phone
            state.image = action.payload.user.image
            state.address = action.payload.user.address
            state.isAuthenticated = true
        },
        setDisplayAlert: (state, action) => {
            console.log(action.payload);
            state.displayAlert = action.payload
        }
    }
})

export const { logoutUser, authenticate, setDisplayAlert, updateUser } = userSlice.actions;
let userReducer = userSlice.reducer;
export default userReducer;