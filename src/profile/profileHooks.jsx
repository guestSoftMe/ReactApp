import React, {Suspense, useEffect} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {profileUserApi} from "../reduse/reduserSitebar";
import {userthunkhooks} from "../reduse/reduserHooks";
import logouser from "./../600px-User_icon_3.svg.png"


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
    }, [])


    let onclicks = (e) => {
        let file = e.target.files[0]
    }

    return (
        <div>
            <div style={{
                border: '2px dotted #fff',
                width: '300px',
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
                            <div style={{fontWeight:700}}>
                                <span style={{fontSize: "25px"}}>Профиль</span>
                                <div>Имя: {props.profile.fullName}</div>
                                <div>Ваш id: {props.profile.userId}</div>
                                <div>Поиск работы: {props.lookingForAJob ? 'Yes' : 'No'}</div>
                                {props.profile.userId === props.isAuth.data.id &&
                               <button onClick={()=>document.querySelector('#inputFile').click()}><input type="file" id={'inputFile'} onChange={onclicks} style={{
                                    display:'none'
                                }}/>Загрузить</button>
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
export default connect(mapStateToProps, {profileUserApi, userthunkhooks})(UserMap)


