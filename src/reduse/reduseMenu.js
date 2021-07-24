const initialState = {
    menu: [
        {name: 'User', link: '/user'},
        {name: 'Profile', link: '/map'},
        {name: 'Upload', link: '/upload'},
    ],
    currentNum: 1,
}

export function menuAction(state = initialState, action) {
    switch (action.type) {
        case 'Currentnum':
            return{...state,currentNum:action.currentNum}
        default:
            return state
    }
}

export let curnum = (currentNum)=>({type:'Currentnum',currentNum})
