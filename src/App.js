import './App.css';
import React from "react";
import Header from "./header/Header";
import {Route} from "react-router-dom";
import Registration from "./registration/registration";
import UserMap from "./profile/profileHooks"
import User from "./user/user";

let App = () => {
    return (
        <div className='container'>
            <Header/>
            <div className='content'>
                <Route path='/user' render={() => <User/>}/>
                <Route path={'/registration'} render={() => <Registration/>}/>
                <Route path={'/map/:userid?'} render={() => <UserMap/>}/>
            </div>
        </div>
    );
}
export default App