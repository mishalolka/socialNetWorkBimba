import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";


let store =
    {
        _state: {
            profilePage: {
                postsData: [
                    {id: 1, message: "Hi, HOW are YOU MISHA", likesCount: "100"},
                    {id: 2, message: "I`M FINE", likesCount: "2000"},
                ],
                newPostText: "Hi"

            },
            dialogsPage: {
                dialogsData: [
                    {id: 1, name: "Dimych"},
                    {id: 2, name: "Annya"},
                    {id: 3, name: "Misha"},
                    {id: 4, name: "Glebus"},
                ],
                messagesData: [
                    {id: 1, message: "hi"},
                    {id: 2, message: "How are you"},
                    {id: 3, message: "Yo"},
                ],
                newMessageText: ""
            },
            sidebarPage: {},

        },
        getState() {
            return this._state
        },
        _callSubscriber() {
            console.log("state changed")
        },

        subscribe(observer) {
            this._callSubscriber = observer;
        },

        dispatch(action)
        {
            this._state.profilePage = profileReducer(this._state.profilePage, action);
            this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
            this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action);
            this._callSubscriber(this._state);
        }


    }





export default store;