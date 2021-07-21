import React, {createRef, useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {profileUserApi} from "../reduse/reduserSitebar";
import {userthunkhooks} from "../reduse/reduserHooks";
import HooksUse from "./hooksuse";


const Hooks = (props) => {
    let [stateUser, stateFunct] = useState(false)
    let [stateStatus, stateFunctStatus] = useState('')
    let clicks = () => {
        stateFunct(true)
    }
    const deactive = () => {
        stateFunct(false)
    }
    let refer = createRef()
    const change = () => {
        stateFunctStatus(refer.current.value)
    }
    let [count, setCount] = useState(1)

    function clickCount() {
        return setCount(count + 1)

    }

    useEffect(() => {
        document.title = `${count}`
    }, [count])

    useEffect(() => {
        let userId = props.match.params.userid
        props.userthunkhooks(userId)
    }, [])

    let inputEl = useRef()
    let onButtonClick = () => {
        console.log(inputEl.current.value)
    }
    return (
        <div>
            {stateUser &&
            <div>
                <input ref={refer} type="text" onChange={change} onBlur={deactive}/>
                <button onClick={clickCount}>Click</button>
            </div>
            }
            {!stateUser &&
            <span onClick={clicks}>Ваш статус:Click Me {stateStatus}</span>
            }
            <div>
                {props.profile &&
                <div>{props.profile.fullname}</div>
                }
            </div>
            <div>
                {
                    props.profile &&
                    <div>
                        <img src={props.profile.photos.small} alt=""/>
                        <div>{props.profile.fullName}</div>
                        <div>{props.profile.userId}</div>
                    </div>
                }
            </div>
            <HooksUse {...props}/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        profile: state.hooks.profile,
        isAuth: state.login,
    }
}
let UserMap = withRouter(Hooks)
export default connect(mapStateToProps, {profileUserApi, userthunkhooks})(UserMap)


