import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


let maxLengthC = maxLengthCreator(10);

const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required, maxLengthC]} component={Textarea} name="newPostText"
                       placeholder="Enter your post" id="" cols="100" rows="2"></Field>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );

}

const MyPostsReduxForm = reduxForm({
    //unique name u form
    form: "myPosts"
})(MyPostsForm)


const MyPosts = React.memo((props) => {

        let postsElement = props.profilePage.postsData
            .map(p => <Post message={p.message} likes={p.likesCount}/>);

        let addNewPost = (val) => {
            props.addPost(val.newPostText);
        }


        return (
            <div className={classes.postsBlock}>
                my posts

                <MyPostsReduxForm onSubmit={addNewPost}/>

                <div className={classes.posts}>
                    {postsElement}
                </div>

            </div>


        );

    }
)


export default MyPosts;