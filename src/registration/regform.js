import r from "./registration.module.css";
import React from "react";

export let Regform = ({type, input, label, props, meta: {touched, error}}) => {
    return (
        <div>
            <div>
                <label>{label}</label>
            </div>
            <div>
                <input type={type} {...input} placeholder={label} {...props}/>
                <div>
                    {touched && <span className={r.col}>{error}</span>}
                </div>
            </div>
        </div>
    )
}