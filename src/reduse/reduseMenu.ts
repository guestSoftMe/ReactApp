const Currentnum = 'Currentnum'

interface Arrayname {
    name:string
    link:string
}

const initialState = {
    menu: [
        {name: 'User', link: '/user'},
        {name: 'Profile', link: '/map'},
    ] as Array <Arrayname>,
    currentNum: 1,
}
type initialStateType = typeof initialState

export function menuAction(state = initialState, action:any):initialStateType {
    switch (action.type) {
        case 'Currentnum':
            return{...state,currentNum:action.currentNum}
        default:
            return state
    }
}
interface CurrentnumType {
    type:typeof Currentnum
    currentNum:number
}

export let curnumNum = (currentNum:number):CurrentnumType=>({type:Currentnum,currentNum})
