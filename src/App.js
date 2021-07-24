import './App.css';
import React, { Suspense} from "react";
import Header from "./header/Header";
import {Route} from "react-router-dom";
import Registration from "./registration/registration";
import UserMap from "./profile/profileHooks"
import UploadFile from "./upload/uploadFile";
const User = React.lazy(() => import('./user/user'));

let App = () => {
    return (
        <div className='container'>
            <Header/>
            <div className='content'>
                <Route path='/user' render={() =>
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <User/>
                    </Suspense>
                }/>
                <Route path={'/registration'} render={() => <Registration/>}/>
                <Route path={'/map/:userid?'} render={() => <UserMap/>}/>
                <Route path={'/upload/'} render={() => <UploadFile/>}/>
            </div>
        </div>
    );
}
export default App
