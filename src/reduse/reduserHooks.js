import axios from "axios";

const initialState = {
    profile:null
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
// export let userthunkphotos = (file)=>(dispatch)=>{
//     const formData = new FormData();
//     formData.append(
//         "image",file
//     );
//     axios.put(`https://social-network.samuraijs.com/api/1.0/profile/photo`,formData)
//         .then(response=>{
//     debugger
//             if (response.data.resultCode === 0) {
//                 dispatch(usersPhoto(response.data.photos))
//             }
//             console.log(response)
//         })
// }