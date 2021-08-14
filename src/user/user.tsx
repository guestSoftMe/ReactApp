import React, {FC, useEffect} from "react";
import {connect} from "react-redux";
import {thunkUser, thunkUserPage} from "../reduse/reduserUser";
import u from './user.module.css'
import {curnumNum} from "../reduse/reduseMenu";
import logouser from "./../600px-User_icon_3.svg.png"
import {NavLink} from "react-router-dom";
import loading from "../circles.svg"
import {AppReduserType} from "../store";
import {compose} from "redux";
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { Button, Radio } from 'antd';

import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';



interface usertype {
    map(arg0: (r: any) => JSX.Element): any;

    id: number
    name: string
    status: string
    photos: string
    followed: boolean
}

interface propsType {
    thunkUser: () => void,
    thunkUserPage: (numberPage: number) => void
    curnumNum: any
    totalCounts: number,
    currentNum: number,
    usersApi: () => void,
    isTrue: boolean,
    users: Array<usertype | []>,
}


let User: FC<propsType | undefined> = (props) => {

    useEffect(() => {
        props.thunkUser()
    }, []);

    function onClickPage(num:number) {
        let numberPage = props.curnumNum(num).currentNum
        props.thunkUserPage(numberPage)
    }

    return (
        <div>
            <div>
                <Pagination  defaultCurrent={1} className={u.pag} onChange={onClickPage} total={props.totalCounts} />
            </div>

            {props.isTrue
                ? props.users.map(item => {
                    return (
                        item.map(r => {
                            return <div key={r.key} className={u.block}>
                                <NavLink to={'/map/' + r.id}><img src={r.photos.small || logouser}
                                                                  style={{width: '50px'}}
                                                                  alt=""/></NavLink>
                                <div>Id: {r.id}</div>
                                <div>Name: {r.name}</div>
                                <Button  size='large'>
                                    Subscrib
                                </Button>
                            </div>
                        })
                    )
                })
                : <img src={loading} alt=""/>
            }
        </div>
    )
}

let mapStateToProps = (state: AppReduserType) => {
    const {users, countpage, isTrue} = state.usersApi;
    const {currentNum} = state.userMenu;
    const {isAuth} = state.login.data;
    return {
        users: users,
        isTrue: isTrue,
        totalCounts: countpage,
        currentNum: currentNum,
        isAuth: isAuth
    }
}
export default compose(
    connect(mapStateToProps,
        {thunkUserPage, curnumNum, thunkUser}))
(User)

