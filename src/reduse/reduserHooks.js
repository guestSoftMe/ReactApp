import axios from "axios";
import {stopSubmit} from "redux-form";

const initialState = {
    profile: null,
}

export function Hooks(state = initialState, action) {
    switch (action.type) {
        case 'User':
            return {...state, profile: action.profile}
        case 'Photo':
            return {...state, profile: {...state.profile, photos: action.photos}}
        case 'UserProfileUpdate':
            return {...state, profile: {...state, profile: action.profile}}
        default:
            return state
    }
}

export let usersToo = (profile) => ({type: 'User', profile})
let usersPhoto = (photos) => ({type: 'Photo', photos})
export let profileupdateusers = (profileupdate) => ({type: 'UserProfileUpdate', profileupdate})

export let userthunkhooks = (userId) => (dispatch) => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        .then(response => {
            dispatch(usersToo(response.data))
        })
}
export let profileusersupdate = (profile) => async (dispatch, getState) => {
    let userid = getState().login.data.id
    let response = await axios.put('https://social-network.samuraijs.com/api/1.0/profile/', profile, {
        withCredentials: true,
        headers: {
            'API-KEY': 'a0cf50fb-66d3-4fa2-b075-a23e6b15f283'
        }
    })
    if (response.data.resultCode === 0) {
        dispatch(userthunkhooks(userid))
    } else {
        if (response.data.messages) {
            dispatch(stopSubmit('formprofile', {_error:response.data.messages}))
            return Promise.reject(response.data.messages)
        }
    }
}

export let usersfotoupdate = (formData) => async (dispatch) => {
    let response = await axios.put(`https://social-network.samuraijs.com/api/1.0/profile/photo`, formData, {
        withRouter: true,
        headers: {
            'Content-Type': 'multipart/form-data',
            'API-KEY': '22d5960a-19c5-4d4a-8da9-59844766fddb'
        },
    })
    if (response.data.resultCode === 0) {
        dispatch(usersPhoto(response.data))

    }
}