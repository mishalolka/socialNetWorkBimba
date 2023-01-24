import classes from "./Users.module.css";
import userPhoto from "../../img/ava.jpg";
import React from "react";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = ({totalUsersCount,pageSize,portionSize, currentPage, onPageChanged, usersData, ...props}) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} portionSize={portionSize}/>
            {
                usersData.map(u => <User user={u} key={u.id} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow}/>)
            }
        </div>
    );

}

export default Users;