import classes from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import React from "react";
import { Navigate } from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

let maxLength50 = maxLengthCreator(50);

const AddMessageFrom = (props) =>
{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxLength50]} name="newMessageText" placeholder="Enter your message" id="" cols="100" rows="2"></Field>
            </div>

            <div>
                <button>Send</button>
            </div>
        </form>
    );
}

const AddMessageFormRedux = reduxForm({
    //unique name u form
    form: "dialogAddMessageFrom"
})(AddMessageFrom)

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElement = state.dialogsData
        .map(d => <DialogItem id={d.id} key={d.id} name={d.name}/>);


    let messagesElement = state.messagesData
        .map(m => <Message message={m.message} key={m.id}/>);


    let addNewMessage = (val) =>
    {
        props.sendMessageCreator(val.newMessageText);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                <div>{messagesElement}</div>

                <AddMessageFormRedux onSubmit={addNewMessage}/>

            </div>
        </div>
        /* {} портібні бля того шоб jsx поняв шо ми в середині {} пишем js код */
    );

}

export default Dialogs;