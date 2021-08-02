import React, { useEffect} from "react";
import {connect} from "react-redux";
import {thunkUser, thunkUserPage} from "../reduse/reduserUser";
import u from './user.module.css'
import classNames from "classnames";
import {curnumNum} from "../reduse/reduseMenu";
import logouser from "./../600px-User_icon_3.svg.png"
import {NavLink} from "react-router-dom";
import loading from "../circles.svg"


function User(props){

    useEffect(() => {
        props.thunkUser()
    }, []);



    function onClickPage(num){
        props.thunkUserPage(props.curnumNum(num).currentNum)
    }

        let numbers = []
        let pages = (props.totalCounts/10)/100
        for (let i = 1; i <= pages; i++) {
            numbers.push(i)
        }
        return (
            <div>
                <div>
                        {numbers.map(i => {
                            return <span onClick={() => onClickPage(i)} className={classNames(u.num, props.currentNum === i && u.action)}>{i}</span>

                        })}
                </div>

                {props.usersApi.isTrue
                    ? props.usersApi.users.map(item => {
                        return (
                            item.map(r => {
                                return <div key={r.key} className={u.block}>
                                    <NavLink to={'/map/' + r.id}><img  src={r.photos.small || logouser} style={{width: '50px'}}
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

let mapStateToProps = (state) => {
    return {
        usersApi: state.usersApi,
        totalCounts:state.usersApi.countpage,
        currentNum: state.userMenu.currentNum,
        isAuth: state.login.data.isAuth
    }
}
export default connect(mapStateToProps, {thunkUserPage, curnumNum, thunkUser})(User)