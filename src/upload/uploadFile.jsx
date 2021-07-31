import React, {useEffect} from "react";
import {connect} from "react-redux";
import {profileUserCaptcha} from "../reduse/reduserSitebar";


const UploadFile = (props) => {

    useEffect(()=>{
        props.profileUserCaptcha()
    },[])
    console.log(props)
    return (
        <div>
            { props.captcha ?
                <img src={props.captcha} alt=""/>
                : 'Not captcha'
            }

        </div>
    )

}

const mapStateToProps=(state)=>{
    return{
        captcha:state.login.captcha
    }
}

export default connect(mapStateToProps,{profileUserCaptcha})(UploadFile)