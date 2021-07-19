import React from "react";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {newtest} from "./reduse/reduserUser";
import thunk from "redux-thunk";
import {menuAction} from "./reduse/reduseMenu";
import { reducer as formReducer } from 'redux-form'
import {SiteBarRedu} from "./reduse/reduserSitebar";
import {Hooks} from "./reduse/reduserHooks";


let reduser = combineReducers({
    usersApi:newtest,
    userMenu:menuAction,
    form:formReducer,
    login:SiteBarRedu,
    hooks:Hooks
})

export let store = createStore(reduser,applyMiddleware(thunk))

window.store = store