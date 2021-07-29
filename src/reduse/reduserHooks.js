import axios from "axios";

const initialState = {
    profile:null,
}
export function Hooks(state = initialState, action) {
  switch (action.type) {
      case 'User':
        return{...state,profile:action.profile}
      case 'Photo':
          debugger
        return{...state,profile:{...state.profile,photos:action.photos}}
    default:
        return state
  }
}

export let usersToo = (profile)=>({type:'User',profile})
export let usersPhoto = (photos)=>({type:'Photo',photos})

export let userthunkhooks = (userId)=>(dispatch)=>{
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        .then(response=>{
            dispatch(usersToo(response.data))
        })
}