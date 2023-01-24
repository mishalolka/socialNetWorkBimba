import React from "react";


import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../img/ava.jpg";


import Profile from "../Profile";

//<img src={props.profile.photos.small} alt=""/>

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () =>
    {
        this.setState(
            {
                editMode: true
            }
        )
    }
    deactivateEditMode = () =>
    {
        this.setState(
            {
                editMode: false
            }
        )
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) =>
    {
        this.setState({
            status: e.currentTarget.value
        });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status)
        {
            this.setState({
                status: this.props.status
            })
        }

    }


    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.state.status || "-------"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>

                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;