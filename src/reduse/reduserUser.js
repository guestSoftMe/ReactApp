import axios from "axios";

const initialState = {
    users: [],
    isTrue: false,
}

export function newtest(state = initialState, action) {
    switch (action.type) {
        case 'USER-STATE':
            return {...state, users: [action.users], isTrue: true}
        default:
            return state
    }
}

let userState = (users) => ({type: 'USER-STATE', users})

export let thunkUser = () => async (dispatch) => {
    let response = await axios.get('https://social-network.samuraijs.com/api/1.0/users')
            dispatch(userState(response.data.items))
}


export let thunkUserPage = (userId) => async (dispatch) => {
   let response = await axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${userId}&count=10`)
            dispatch(userState(response.data.items))
}