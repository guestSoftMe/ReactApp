import React, {Component} from "react";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {newtest} from "./reduse/reduserUser";
import thunk from "redux-thunk";
import {menuAction} from "./reduse/reduseMenu";
import { reducer as formReducer } from 'redux-form'
import {SiteBarRedu} from "./reduse/reduserSitebar";
import {Hooks} from "./reduse/reduserHooks";
import { composeWithDevTools } from 'redux-devtools-extension';


let reduser = combineReducers({
    usersApi:newtest,
    userMenu:menuAction,
    form:formReducer,
    login:SiteBarRedu,
    hooks:Hooks
})

export let store = createStore(reduser,composeWithDevTools(
    applyMiddleware(thunk),
    ))
