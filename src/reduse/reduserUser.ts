import axios from "axios";

const USER_STATE = 'USER-STATE'
const COUNT_PAGE ='COUNT-PAGE'
type userType={
    id:number
    name: string
    status: string
    photos:string
    followed:boolean
}

interface initialStateType {
    users: Array<userType>,
    isTrue: boolean,
    countpage:number
}

const initialState={
    users: [],
    isTrue: false,
    countpage:  0
}

export function newtest(state = initialState, action:any):initialStateType {
    switch (action.type) {
        case 'USER-STATE':
            return {...state, users: [action.users], isTrue: true}
        case 'COUNT-PAGE':
            return {...state, countpage: action.countpage}
        default:
            return state
    }
}

interface userStateType{
    type:typeof USER_STATE,
    users:Array<number|string>
}
interface countStateType{
    type:typeof COUNT_PAGE,
    countpage:number
}

let userState = (users: Array<number|string>):userStateType => ({type: USER_STATE, users})
let countpageuser = (countpage:number):countStateType => ({type: COUNT_PAGE, countpage})

export let thunkUser = () => async (dispatch:any) => {
    let response = await axios.get('https://social-network.samuraijs.com/api/1.0/users')
    dispatch(userState(response.data.items))
    dispatch(countpageuser(response.data.totalCount))
}

export let thunkUserPage = (userId:number) => async (dispatch:any) => {
    let response = await axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${userId}&count=10`)
    dispatch(userState(response.data.items))
    console.log(response.data.items)
}
