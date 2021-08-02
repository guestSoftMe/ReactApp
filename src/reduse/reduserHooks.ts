import axios from "axios";
import {stopSubmit} from "redux-form";

const User = 'User'
interface contact{
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

interface profileUser{
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription:string
    fullName: string
    contacts: contact
}

interface initialStateType {
    profile: profileUser | null
}
const initialState = {
    profile: null,
}


export function Hooks(state = initialState, action:any):initialStateType {
    switch (action.type) {
        case 'User':
            return {...state, profile: action.profile}
        default:
            return state
    }
}

interface usersTooType {
    type:typeof User
    profile:any
}

export let usersToo = (profile:profileUser):usersTooType => ({type: User, profile})

export let userthunkhooks = (userId:number) => (dispatch:any) => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        .then(response => {
            dispatch(usersToo(response.data))
        })
}
export let profileusersupdate = (profile:profileUser) => async (dispatch:any, getState:any) => {
    let userid = getState().login.data.id
    let response = await axios.put('https://social-network.samuraijs.com/api/1.0/profile/', profile, {
        withCredentials: true,
        headers: {
            'API-KEY': '028b478a-7354-4e18-b9aa-2e8155987680'
        }
    })
    if (response.data.resultCode === 0) {
        dispatch(userthunkhooks(userid))
    } else {
        if (response.data.messages) {
            dispatch(stopSubmit('formprofile', {_error: response.data.messages}))
           return Promise.reject(response.data.messages)
        }
    }
}