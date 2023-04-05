import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuth: false,
        user: null,
        token: null
    },
    
    reducers: {

        logedIn: (state, action) => {   
            state.isAuth = true   
            state.user = action.payload.user      
            state.token = action.payload.token
        },

        logOut: (state, action) => {   
            state.isAuth = false
            state.user = null   
            state.token = null
        }

    }
})
