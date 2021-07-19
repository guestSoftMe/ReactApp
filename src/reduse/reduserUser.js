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

export let thunkUser = () => (dispatch) => {
    return axios.get('https://social-network.samuraijs.com/api/1.0/users')
        .then(response => {
            dispatch(userState(response.data.items))
        })
}


export let thunkUserPage = (userId) => (dispatch) => {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${userId}&count=10`)
        .then(response => {
            dispatch(userState(response.data.items))
        })
}