import {connect} from "react-redux";
import {
    followSuccess,
    unfollowSuccess,
    setCurrentPage,
    toggleFollowingProgress,
    follow,
    unfollow, requestUsers, setPortionSize,
} from "../../Redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hog/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsersSelector, portionSize
} from "../../Redux/users-selectors";



class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)

        // this.props.toggleIsFetching(true);
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(res => {
        //     this.props.toggleIsFetching(false);
        //     this.props.setUsers(res.items);
        //     this.props.setTotalUsersCount(res.totalCount);
        //});
    }


    onPageChanged = (pageNumber) => {


        this.props.requestUsers(pageNumber, this.props.pageSize)


        // this.props.setCurrentPage(pageNumber)
        // this.props.toggleIsFetching(true);
        // usersAPI.getUsers(pageNumber, this.props.pageSize).then(res => {
        //     this.props.toggleIsFetching(false);
        //     this.props.setUsers(res.items);
        //});
    }


    render() {
        return <>
            {
                this.props.isFetching ? <Preloader/> : null
            }
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   usersData={this.props.usersData}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
                   portionSize={this.props.portionSize}

            />;
        </>

    }


}


// let mapStateToProps = (state) => {
//     return {
//         usersData: state.usersPage.usersData,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//
//     }
// }
let mapStateToProps = (state) => {
    return {
        usersData: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: portionSize(state)

    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (usersData) => {
//             dispatch(setUsersAC(usersData));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber));
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount));
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching));
//         },
//
//
//     }
//
// }
//




export default compose(
    connect(mapStateToProps, {
        followSuccess,
        setCurrentPage,
        unfollowSuccess,
        toggleFollowingProgress,
        requestUsers,
        follow,
        unfollow
    }),
   // withAuthRedirect
)(UsersContainer)