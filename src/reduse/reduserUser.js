import axios from "axios";

const initialState = {
    users: [],
    isTrue: false,
    countpage: 0
}

export function newtest(state = initialState, action) {
    switch (action.type) {
        case 'USER-STATE':
            return {...state, users: [action.users], isTrue: true}
        case 'COUNT-PAGE':
            return {...state, countpage: action.countpage}
        default:
            return state
    }
}

let userState = (users) => ({type: 'USER-STATE', users})
let countpageuser = (countpage) => ({type: 'COUNT-PAGE', countpage})

export let thunkUser = () => async (dispatch) => {
    let response = await axios.get('https://social-network.samuraijs.com/api/1.0/users')
    dispatch(userState(response.data.items))
    dispatch(countpageuser(response.data.totalCount))
}

export let thunkUserPage = (userId) => async (dispatch) => {
    let response = await axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${userId}&count=10`)
    dispatch(userState(response.data.items))
}