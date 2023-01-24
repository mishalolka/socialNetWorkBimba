import {authHeaderAPI, unfollowAPI} from "../api/api";
import {toggleFollowingProgress, unfollowSuccess} from "./users-reducer";
import {stopSubmit} from "redux-form";


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }

}

export let setAuthUserData = (userId, email, login, isAuth) => ({
    type: "SET-USER-DATA",
    payload: {userId, email, login, isAuth}
})


export const authMe = () => {


    return async (dispatch) => {
        let res = await authHeaderAPI.authMe()
                if (res.resultCode === 0) {
                    let id = res.data.id;
                    let email = res.data.email;
                    let login = res.data.login;
                    dispatch(setAuthUserData(id, email, login, true));
                }
    }
}
export const login = (email, password, rememberMe) => {

    return async (dispatch) => {

        let res = await authHeaderAPI.login(email, password, rememberMe)
                if (res.resultCode === 0) {
                    dispatch(authMe())
                }
                else {
                    let message = res.messages.length > 0 ? res.messages[0] : "Some error"
                    dispatch(stopSubmit("login", {_error: message}))
                }
    }
}
export const logout = () => {

    return async (dispatch) => {
        let res = await authHeaderAPI.logout()
                if (res.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
    }
}


export default authReducer;