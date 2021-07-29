import {Field, reduxForm} from "redux-form";
import {Regform} from "./regform";
import r from "./registration.module.css";
import React, {Component} from "react";

class FormRegCom extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div><Field type="email"
                            component={Regform}
                            label={'Email'}
                            name={'email'}
                /></div>
                <div><Field type="password"
                            component={Regform}
                            label={'Password'}
                            name={'password'}
                /></div>
                <span><Field type="checkbox"
                             component={Regform}
                             label={'Remember Me'}
                             name={'rememberMe'}

                /></span>
                {
                    this.props.error &&
                    <div className={r.errorForm}>{this.props.error}</div>
                }
                <button className={r.btn} disabled={this.props.pristine || this.props.submitting}>Registration</button>
                <div style={{margin:'50px 0'}}>
                    <div>Логин: free@samuraijs.com</div>
                    <div>Пароль: free</div>
                </div>
            </form>

        )

    }
}

export let FormReg = reduxForm({
    form: 'Registr'
})(FormRegCom)