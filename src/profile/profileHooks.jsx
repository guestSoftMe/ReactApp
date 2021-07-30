import React, {Suspense, useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {profileUserApi} from "../reduse/reduserSitebar";
import {profileusersupdate, usersfotoupdate, userthunkhooks} from "../reduse/reduserHooks";
import Meprofile from "./meprofile";
import CreateForm from "./createprofile";

const HooksUse = React.lazy(() => import('./hooksuse'));

export const LazyLoading = Component => {
    return <Suspense fallback={<div>Загрузка...</div>}>
        {Component}
    </Suspense>
};

const Hooks = (props) => {
    useEffect(() => {
        let userId = props.match.params.userid
        let id = props.isAuth.data.id
        props.userthunkhooks(userId)
        if (!userId) props.userthunkhooks(18700)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [state, setState] = useState(true);
    let onclicks = (e) => {
        let file = e.target.files[0]
        let formData = new FormData();
        formData.append(
            "image", file
        );
        props.usersfotoupdate(formData)
    }
    let onSubmit=(formdata)=>{
        props.profileusersupdate(formdata)
        setState(true)
    }
    return (
        <div>
            {state ?
                <Meprofile
                    isAuth={props.isAuth}
                    profile={props.profile}
                    onclicks={onclicks}
                    isOwen={props.isOwen}
                    editMode={()=>setState(false)}
                />
                :
                <CreateForm
                    isAuth={props.isAuth}
                    profile={props.profile}
                    onSubmit={onSubmit}
                    initialValues={props.profile}
                />
            }

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
export default connect(mapStateToProps, {profileusersupdate,usersfotoupdate, profileUserApi, userthunkhooks})(UserMap)
