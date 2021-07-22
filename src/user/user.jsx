import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {thunkUser, thunkUserPage} from "../reduse/reduserUser";
import u from './user.module.css'
import classNames from "classnames";
import {curnum} from "../reduse/reduseMenu";
import loading from "./../circles.svg"
import logouser from "./../600px-User_icon_3.svg.png"
import {NavLink, Redirect} from "react-router-dom";


class User extends PureComponent {
    componentDidMount() {
        this.props.thunkUser()
    }

    onClickPage = (num) => {
        this.props.thunkUserPage(this.props.curnum(num).currentNum)
    }

    render() {
        let numbers = []
        for (let i = 1; i <= 10; i++) {
            numbers.push(i)
        }
        if (!this.props.isAuth) {
            return <Redirect to={'/registration'}/>
        }
        return (
            <div>
                <div>
                    {numbers.map(i => {
                        return <span onClick={() => this.onClickPage(i)}
                                     className={classNames(u.num, this.props.currentNum === i && u.action)}>{i}</span>
                    })}
                </div>

                {this.props.usersApi.isTrue
                    ? this.props.usersApi.users.map(item => {
                        return (
                            item.map(r => {
                                return <div key={r.id} className={u.block}>
                                    <NavLink to={'/map/' + r.id}><img src={logouser} style={{width: '50px'}}
                                                                      alt=""/></NavLink>
                                    <div>Id: {r.id}</div>
                                    <div>Name: {r.name}</div>
                                    <button>Submit</button>
                                </div>
                            })
                        )
                    })
                    : <img src={loading} alt=""/>
                }
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        usersApi: state.usersApi,
        currentNum: state.userMenu.currentNum,
        isAuth: state.login.data.isAuth
    }
}
export default connect(mapStateToProps, {thunkUserPage, curnum, thunkUser})(User)