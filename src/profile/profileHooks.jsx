import React, {Suspense, useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {profileUserApi} from "../reduse/reduserSitebar";
import {usersPhoto, userthunkhooks} from "../reduse/reduserHooks";
import axios from "axios";
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
        if (!userId) props.userthunkhooks(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [state, setState] = useState(true);
    let onclicks = (e) => {
        let file = e.target.files[0]
        let formData = new FormData();
        formData.append(
            "image", file
        );
        axios.post(`https://social-network.samuraijs.com/api/1.0//profile/photo`, formData, {
            withRouter: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        })
            .then(response => {
                console.log(response.data)
            })
    }
    let onSubmit=(formdata)=>{
        console.log(formdata)
    }
    return (
        <div>
            {state ?
                <Meprofile
                    isAuth={props.isAuth}
                    profile={props.profile}
                    onclick={onclicks}
                    isOwen={props.isOwen}
                    editMode={()=>setState(false)}
                />
                :
                <CreateForm
                    isAuth={props.isAuth}
                    profile={props.profile}
                    onSubmit={onSubmit}
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
export default connect(mapStateToProps, {usersPhoto, profileUserApi, userthunkhooks})(UserMap)
