
let initialState =  {
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
};



const dialogsReducer = (state = initialState, action) =>
{

    switch (action.type)
    {
        case "SEND-MESSAGE":
        {
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 4, message: action.newMessageText}],
            };
        }

        default:
            return state;
    }
}

export let sendMessageCreator = (newMessageText) => ({type: "SEND-MESSAGE", newMessageText})


export default dialogsReducer;