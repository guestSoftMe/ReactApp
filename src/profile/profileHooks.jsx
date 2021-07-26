import React, {Suspense, useEffect} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {profileUserApi} from "../reduse/reduserSitebar";
import {usersPhoto, userthunkhooks} from "../reduse/reduserHooks";
import logouser from "./../600px-User_icon_3.svg.png"
import axios from "axios";



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

    let onclicks = (e) => {
        let file = e.target.files[0]
        let formData = new FormData();
        formData.append(
            "image",file
        );
        axios.post(`https://social-network.samuraijs.com/api/1.0//profile/photo`,formData,{
            withRouter:true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        })
            .then(response=>{
                console.log(response.data)
            })
    }
    return (
        <div>
            <div style={{
                border: '2px dotted #fff',
                width: '400px',
                hight: '200px',
                margin: '20px',
            }}>
                {
                    props.isAuth.data.isAuth &&
                    props.profile ?
                        <div style={{display: "flex"}}>
                            <div style={{margin: "10px"}}>
                                <img style={{width: '100px'}} src={props.profile.photos.small || logouser} alt=""/>
                            </div>
                            <div>
                                <span style={{fontSize: "25px"}}>Профиль</span>
                                <div><b>Full name:</b> {props.profile.fullName}</div>
                                <div><b>You id:</b> {props.profile.userId}</div>
                                <div><b>Find jobs:</b> {props.lookingForAJob ? 'Yes' : 'No'}</div>
                                <div><b>About for me:</b> {props.profile.aboutMe}</div>
                                {props.profile.userId === props.isAuth.data.id &&
                                // <input type="file" id={'inputFile'} onChange={onclicks} />
                                <input type="file" id={'inputFile'} onChange={onclicks} />
                                }
                            </div>
                        </div>
                        : <span>Нужна реестрация для просмотра профиля...</span>
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
export default connect(mapStateToProps, {usersPhoto,profileUserApi, userthunkhooks})(UserMap)


