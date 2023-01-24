import {followAPI, unfollowAPI, usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const ActionTypes = {
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    SET_USERS: 'SET-USERS',
    SET_CURRENT_PAGE: 'SET-CURRENT-PAGE',
    SET_TOTAL_COUNT: 'SET-TOTAL-COUNT',
    TOGGLE_IS_FETCHING: 'TOGGLE-IS-FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS: 'TOGGLE-IS-FOLLOWING-PROGRESS',
    SET_PORTION_SIZE: "SET-PORTION-SIZE"
};

let initialState = {
    usersData: [],
    pageSize: 70,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    portionSize: 10
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, "id" ,{followed: true})

                // usersData: state.usersData.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: true}
                //     }
                //     return u;
                // })
            };
        case ActionTypes.UNFOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, "id" ,{followed: false})
                // state.usersData.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                //})
            };
        case ActionTypes.SET_USERS:
            return {...state, usersData: [...action.usersData]}
        case ActionTypes.SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case ActionTypes.SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case ActionTypes.SET_PORTION_SIZE:
            return {...state, portionSize: action.portionSize}
        case ActionTypes.TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case ActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

export let followSuccess = (userId) => ({type: ActionTypes.FOLLOW, userId})
export let unfollowSuccess = (userId) => ({type: ActionTypes.UNFOLLOW, userId})
export let setUsers = (usersData) => ({type: ActionTypes.SET_USERS, usersData})
export let setCurrentPage = (currentPage) => ({type: ActionTypes.SET_CURRENT_PAGE, currentPage})
export let setTotalUsersCount = (totalCount) => ({type: ActionTypes.SET_TOTAL_COUNT, totalCount})

export let setPortionSize = (portionSize) => ({type: ActionTypes.SET_PORTION_SIZE, portionSize})

export let toggleIsFetching = (isFetching) => ({type: ActionTypes.TOGGLE_IS_FETCHING, isFetching})
export let toggleFollowingProgress = (isFetching, userId) => ({
    type: ActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})


const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, id));
    let res = await apiMethod(id)
    if (res.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleFollowingProgress(false, id));
}





export const requestUsers = (currentPage, pageSize) => {

    return async (dispatch) => {
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleIsFetching(true));
        let res = await usersAPI.getUsers(currentPage, pageSize)

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(res.items));
        dispatch(setTotalUsersCount(res.totalCount));
    }
}

export const follow = (id) => {

    return (dispatch) =>
    {
         followUnfollowFlow(dispatch, id, followAPI.follow.bind(followAPI), followSuccess)
    }
}
export const unfollow = (id) => {

    return (dispatch) =>
    {
         followUnfollowFlow(dispatch, id, unfollowAPI.unfollow.bind(unfollowAPI), unfollowSuccess)
    }
}


export default usersReducer;