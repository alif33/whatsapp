import { authSlice } from "./slice";
const { actions: slice } = authSlice;

export const logedIn = user => (dispatch) => {
    dispatch(slice.logedIn(user));
}

export const logOut = user => (dispatch) => {
    dispatch(slice.logOut(user));
}

