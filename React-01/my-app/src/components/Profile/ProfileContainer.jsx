import Profile from "./Profile";
import axios from "axios";
import React from "react";
import {connect} from "react-redux";
import {getStatus, setProfile, setStatus, setUserProfile, updateStatus} from "../../Redux/profile-reducer";
import {withRouter} from "../common/WithRouter/WithRouter";
import {Navigate} from "react-router-dom";
import {withAuthRedirect} from "../../hog/withAuthRedirect";
import {compose} from "redux";



class ProfileC extends React.Component
{

    componentDidMount() {

        let userId = this.props.router.params.userId;
        if (!userId)
        {
            userId = this.props.authorizedUserId;
        }
        this.props.setProfile(userId);
        this.props.getStatus(userId);
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
        //     .then(res => {
        //     this.props.setUserProfile(res.data);
        //     });
    }

    render() {


        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
        );
    }
};




let mapStateToProps = (state) =>
    ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    });


export default compose(
    connect(mapStateToProps, {setUserProfile, setProfile, getStatus, updateStatus, setStatus }),
    withRouter,
   // withAuthRedirect
)(ProfileC);