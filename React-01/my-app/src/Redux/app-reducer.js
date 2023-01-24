import {authHeaderAPI, unfollowAPI} from "../api/api";
import {toggleFollowingProgress, unfollowSuccess} from "./users-reducer";
import {stopSubmit} from "redux-form";
import {authMe} from "./auth-reducer";


let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET-INITIALIZED-SUCCESS":
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }

}

export let initializedSuccess = () => ({
    type: "SET-INITIALIZED-SUCCESS",
})


export const initializeApp = () => {


    return (dispatch) => {
        let promise = dispatch(authMe())
        Promise.all([promise]).then(() => dispatch(initializedSuccess()))

    }
}

export default appReducer;