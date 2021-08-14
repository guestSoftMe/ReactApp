import './App.css';
import React, { Suspense} from "react";
import Header from "./header/Header";
import {Redirect, Route,Switch} from "react-router-dom";
import Registration from "./registration/registration";
import UserMap from "./profile/profileHooks"
import UploadFile from "./upload/uploadFile";
const User = React.lazy(() => import('./user/user'));

let App = () => {
    return (
        <div className='container'>
            <Header/>
            <div className='content'>
                <Switch>
                <Route exact path='/' render={()=><Redirect to={'/map/'}/>}/>
                <Route path='/user' render={() =>
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <User/>
                    </Suspense>
                }/>
                <Route path={'/registration'} render={() => <Registration/>}/>
                <Route path={'/map/:userid?'} render={() => <UserMap/>}/>
                <Route  path={'/upload/'} render={() => <UploadFile/>}/>
                <Route  path='*' render={() => <div>404 page not found</div>}/>
                </Switch>
            </div>
        </div>
    );
}
export default App;
