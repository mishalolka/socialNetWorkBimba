import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../img/ava.jpg";
import ProfileStatus from "./ProfileStatus"


import Profile from "../Profile";
import ProfileStatusWithHook from "./ProfileStatusWithHook";
//<img src={props.profile.photos.small} alt=""/>

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img
                    src="https://www.shutterstock.com/image-illustration/cute-very-tired-girl-drawn-260nw-2085823726.jpg"
                    alt=""/>
            </div>








            <div className={classes.descriptionBlock}>
                <img className={classes.ava} src={props.profile.photos.large === null ? userPhoto : props.profile.photos.large} alt=""/>


                <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus}/>







                <div>
                    <div>{props.profile.aboutMe}</div>
                    <div>
                        <div>
                            <NavLink>{props.profile.contacts.facebook}</NavLink>
                        </div>
                        <div>
                            <NavLink>{props.profile.contacts.twitter}</NavLink>
                        </div>
                        <div>
                            <NavLink>{props.profile.contacts.instagram}</NavLink>
                        </div>
                        <div>
                            <NavLink>{props.profile.contacts.youtube}</NavLink>
                        </div>
                        <div>
                            <NavLink>{props.profile.contacts.github}</NavLink>
                        </div>

                    </div>
                    <div>{props.profile.lookingForAJob}</div>
                    <div>{props.profile.lookingForAJobDescription}</div>
                    <div>{props.profile.fullName}</div>
                    <div>{props.profile.userId}</div>
                </div>


                ava + description

            </div>

        </div>

    );
}

export default ProfileInfo;