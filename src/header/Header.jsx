import React, {Component} from "react";
import h from './header.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import logo from './slack-new-logo.svg'
import {loginOut, loginsthunk} from "../reduse/reduserSitebar";

export class Header extends Component {
    state = {
        date: new Date().toLocaleString()
    }

    componentDidMount() {
        this.props.loginsthunk()
        setInterval(() => {
                this.setState({
                    date: new Date().toLocaleString()
                })
            }
            , 1000)
    }

    render() {
        return (
            <div className={h.header}>
                <div className={h.logins}>
                    <div className={h.logo}>
                        <img src={logo} alt="" style={{width: 50}}/>
                        <div className={h.sitebar}>
                            {this.props.userMenu.map(r => {
                                return <NavLink to={r.link} className={h.mar} activeClassName={h.add}>{r.name}</NavLink>
                            })}
                        </div>
                    </div>

                    {this.props.login.data.isAuth
                        ? <div>
                            <div>Id: {this.props.login.data.id}</div>
                            <div>Login: {this.props.login.data.login}</div>
                            <div>Email: {this.props.login.data.email}</div>
                            <div style={{color: 'red', cursor: 'pointer', fontWeight: 700}}
                                 onClick={this.props.loginOut}>Logout
                            </div>
                        </div>
                        : <div>
                            <div>{this.state.date}</div>
                            <NavLink to='/registration' style={{
                                fontWeight: 700,
                                color: '#fff',
                                textDecoration: 'none'
                            }}>Registration</NavLink></div>
                    }
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        login: state.login,
        userMenu: state.userMenu.menu,
    }
}


export default connect(mapStateToProps, {loginsthunk, loginOut})(Header)