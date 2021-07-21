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

    useEffect(() => {
        let userId = props.match.params.userid
        props.userthunkhooks(userId)
    }, [])

    return (
        <div>
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


