import {authHeaderAPI, setProfileAPI} from "../api/api";
import {setAuthUserData} from "./auth-reducer";


let initialState =  {
    postsData: [
        {id: 1, message: "Hi, HOW are YOU MISHA", likesCount: "100"},
        {id: 2, message: "I`M FINE", likesCount: "2000"},
    ],
    newPostText: "Hi",
    profile:  null,
    status: ""

};

const profileReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case "ADD-POST": {
            let newPost =
                {
                    id: 5,
                    message: action.newPostText,
                    likesCount: 0
                };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };

        }
        case "UPDATE-NEW-POST-TEXT": {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        case "SET-USER-PROFILE": {
            return {
                ...state,
                profile:  action.profile
            };
        }
        case "SET-STATUS": {
            return {
                ...state,
                status:  action.status
            };
        }
        default:
            return state;
    }
}

export let addPostActionCreator = (newPostText) => ({type: "ADD-POST", newPostText})
export let setUserProfile = (profile) => ({type: "SET-USER-PROFILE", profile})
export let setStatus = (status) => ({type: "SET-STATUS", status})




export const setProfile = (id) =>
{

    return async (dispatch) =>
    {
        let res = await setProfileAPI.setProfile(id)
            dispatch(setUserProfile(res))
    }
}
export const getStatus = (id) =>
{

    return async (dispatch) =>
    {
        let res = await setProfileAPI.getStatus(id)
        dispatch(setStatus(res))
    }
}
export const updateStatus = (status) => {

    return async (dispatch) => {
        let res = await setProfileAPI.updateStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(setStatus(res.data))
        }
    }

}
// axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
//     .then(res => {
//     this.props.setUserProfile(res.data);
//     });

export default profileReducer;