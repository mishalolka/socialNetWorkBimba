import classes from "./Users.module.css";
import userPhoto from "../../img/ava.jpg";
import React from "react";
import {NavLink} from "react-router-dom";


let User = ({user,followingInProgress, unfollow, follow}) => {

    return (
           <div>
                    <span>
                        <div>
                            <NavLink to={"/profile/" + user.id}>
                                <img className={classes.usersPhoto}
                                     src={user.photos.small === null ? userPhoto : user.photos.small} alt=""/>

                            </NavLink>

                        </div>
                        <div>
                            {
                                user.followed ?
                                    <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => unfollow(user.id)}>Unfollow</button>
                                    :
                                    <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => follow(user.id)}>Follow</button>

                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div><div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
                </div>
    );

}

export default User;