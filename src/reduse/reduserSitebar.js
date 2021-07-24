import axios from "axios";
import {stopSubmit} from "redux-form";

const initialState = {
    data: {
        login: null,
        email: null,
        id: null,
        isAuth: false
    },
    profile: null,
}

export function SiteBarRedu(state = initialState, action) {
    switch (action.type) {
        case 'Login':
            return {
                ...state, data: action.data, isAuth: true
            }
        case "SETPROFILE":
            return {...state, profile: action.profile}
        case "SETUPLOADFILE":
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state
    }
}


export const profileUser = (profile) => ({type: 'SETPROFILE', profile})
export const uploadFile = (file) => ({type: 'SETUPLOADFILE', file})

const logins = (login, id, email, isAuth) => ({type: 'Login', data: {login, email, id, isAuth}})

let axlink = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
})


export let loginsthunk = () => (dispatch) => {
    axlink.get('auth/me')
        .then(response => {
            if (response.data.resultCode === 0) {
                let {login, id, email} = response.data.data
                dispatch(logins(login, id, email, true))
            }
        })
}

export let loginFormPost = (email, password, rememberMe) => (dispatch) => {
    axlink.post('/auth/login',
        {
            email, password, rememberMe
        })
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(loginsthunk())
            } else {
                if (response.data.messages) {
                    dispatch(stopSubmit('Registr', {_error: response.data.messages}))
                }
            }
        })
}

export let loginOut = () => (dispatch) => {
    axlink.delete('/auth/login')
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(logins(null, null, null, false))
            }
        })
}


export let profileUserApi = (userId) => (dispatch) => {
    return axlink.get(`/profile/${userId}`)
        .then(response => {
            dispatch(profileUser(response.data))
        })
}
export let profileUserPhotoUpload = (file) => (dispatch) => {
    const formData = new FormData();
    formData.append(
        "image",file
    );
    return axlink.post(`/profile/photo`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
        .then(response => {
            dispatch(uploadFile(response.data.data.photos))
        })
}