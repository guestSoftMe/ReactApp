import React, {Suspense, useEffect} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {profileUserApi} from "../reduse/reduserSitebar";
import {userthunkhooks} from "../reduse/reduserHooks";

const HooksUse = React.lazy(() => import('./hooksuse'));


export const LazyLoading = Component => {
        return <Suspense fallback={<div>Загрузка...</div>}>
            {Component }
        </Suspense>
};

console.log(LazyLoading(HooksUse))
const Hooks = (props) => {
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
            {LazyLoading(<HooksUse {...props}/>)}
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


