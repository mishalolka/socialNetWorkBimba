import axios from "axios";
import {setProfile} from "../Redux/profile-reducer";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "8f708d12-fea9-4023-abb7-112696e4754c"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data);
    }
}

export const followAPI = {
    follow(id = 1) {
        return instance.post(`follow/${id} `).then(res => res.data);
    }
}


export const unfollowAPI = {
    unfollow(id = 1) {
        return instance.delete(`follow/${id} `).then(res => res.data);
    }

}
export const authHeaderAPI = {
    authMe()
    {
        return instance.get(`auth/me`).then(res => res.data)
    },
    login(email, password, rememerMe = false)
    {
        return instance.post(`auth/login`, {email, password, rememerMe}).then(res => res.data)
    },
    logout()
    {
        return instance.delete(`auth/login`).then(res => res.data)
    }
}

export const setProfileAPI = {
    setProfile(id)
    {
        return instance.get(`profile/` + id).then(res => res.data)
    },
    getStatus(id)
    {
        return instance.get(`profile/status/` + id).then(res => res.data)
    },
    updateStatus(status)
    {
        return instance.put(`profile/status`, {status: status})
    }
}

