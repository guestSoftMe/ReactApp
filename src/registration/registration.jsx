import React, {Component} from "react";
import r from './registration.module.css'
import FormReg from "./formReg";
import {connect} from "react-redux";
import {loginFormPost} from "../reduse/reduserSitebar";
import {Redirect} from "react-router-dom";
import {selectorLogin} from "../selector/selector";


export class Registration extends Component {
    onSubmit=(data)=>{
        this.props.loginFormPost(data.email,data.password,data.rememberMe,data.captcha)
        console.log(data)
     }
    render() {
        if (this.props.login.data.isAuth) {
           return <Redirect to='/user'/>
        }
        return (
            <div className={r.reg}>
               <FormReg onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

let mapStateToProps=(state)=>{
    return{
        login:selectorLogin(state)
    }
}


export default connect(mapStateToProps,{loginFormPost})(Registration)