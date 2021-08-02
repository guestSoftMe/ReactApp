import axios from "axios";
import {stopSubmit} from "redux-form";

const SETPROFILE = "SETPROFILE"
const SETUPLOADCAPTCHA = "SETUPLOADCAPTCHA"
const Login = "Login"

const initialState={
    data: {
        login: null,
        email: null,
        id: null,
        isAuth: false,
        captcha: null
    },
    profile: null,
}

type initiaStateType = typeof initialState

export function SiteBarRedu(state = initialState, action: any): initiaStateType {
    switch (action.type) {
        case 'Login':
            return {
                ...state, data: action.data
            }
        case "SETPROFILE":
            return {...state, profile: action.profile}
        case "SETUPLOADCAPTCHA":
            return {...state, data: {...state.data, captcha: action.captcha}}
        default:
            return state
    }
}

type profileUserType = {
    type: typeof SETPROFILE,
    profile: string
}
type captchaUserType = {
    type: typeof SETUPLOADCAPTCHA,
    captcha: string
}
type loginUserTypeData={
    login:string | null,
    email:string| null,
    id:number | null,
    isAuth:boolean
}
type loginUserType = {
    type: typeof Login,
    data: loginUserTypeData
}


export const profileUser = (profile: string): profileUserType => ({type: SETPROFILE, profile})
export const uploadCaptcha = (captcha: string): captchaUserType => ({type: SETUPLOADCAPTCHA, captcha})

const logins = (login: string | null, id: number | null, email: string | null, isAuth: boolean):loginUserType => ({
    type: Login,
    data: {login, email, id, isAuth}
})

let axlink = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
})


export let loginsthunk = () => (dispatch: any) => {
    axlink.get('auth/me')
        .then(response => {
            if (response.data.resultCode === 0) {
                let {login, id, email} = response.data.data
                dispatch(logins(login, id, email, true))
            }
        })
}

export let loginFormPost = (email: string, password: number, rememberMe: boolean, captcha: string) => (dispatch: any) => {
    axlink.post('/auth/login',
        {
            email, password, rememberMe, captcha
        })
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(loginsthunk())
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(profileUserCaptcha())
                }
                dispatch(stopSubmit('Registr', {_error: response.data.messages}))
            }
        })
}

export let loginOut = () => (dispatch: any) => {
    axlink.delete('/auth/login')
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(logins(null, null, null, false))
            }
        })
}


export let profileUserApi = (userId: number) => (dispatch: any) => {
    return axlink.get(`/profile/${userId}`)
        .then(response => {
            dispatch(profileUser(response.data))
        })
}
export let profileUserCaptcha = () => (dispatch: any) => {
    return axlink.post(`/security/get-captcha-url`)
        .then(response => {
            dispatch(uploadCaptcha(response.data.url))
        })
}