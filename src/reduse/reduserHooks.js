import axios from "axios";

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
export let profileusersupdate = (profile) => async (dispatch) => {
    let response = await axios.put('https://social-network.samuraijs.com/api/1.0/profile/', profile,{
        withCredentials:true,
        headers:{
            'API-KEY':'028b478a-7354-4e18-b9aa-2e8155987680'
        }
    })
    if (response.data.resolveCode === 0) {
        dispatch(profileupdateusers(response.data))
    }
}

export let usersfotoupdate = (formData)=>async (dispatch)=>{
    let response = await axios.put(`https://social-network.samuraijs.com/api/1.0/profile/photo`, formData, {
        withRouter: true,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'API-KEY':'028b478a-7354-4e18-b9aa-2e8155987680'
        }
    })
    if (response.data.resolveCode === 0) {
        dispatch(usersPhoto(response.data))
    }

}