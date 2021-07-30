import React from 'react'
import logouser from "../600px-User_icon_3.svg.png";
import {Field, reduxForm} from "redux-form";

const Createprofile = (props,error) => {
    let regform = ({ input, label, type, }) => {
        return (
            <div>
                <label>{label}</label>
                <div>
                    <input {...input} placeholder={label} type={type}/>
                </div>
            </div>
        )
    }
    return (
        <form onSubmit={props.handleSubmit}>
            <div style={{
                border: '2px dotted #fff',
                width: '400px',
                hight: '200px',
                margin: '20px',
            }}>
                {
                    props.isAuth.data.isAuth &&
                    props.profile ?
                        <div style={{display: "flex"}}>
                            <div style={{margin: "10px"}}>
                                <img style={{width: '100px'}} src={props.profile.photos.small || logouser} alt=""/>
                            </div>
                            <div>
                                <span style={{fontSize: "25px"}}>Профиль</span><span><button>Save</button></span>
                                <div style={{margin: '10px 0'}}>
                                    <Field
                                        component={regform}
                                        type="text"
                                        label={'Full name'}
                                        name={'fullName'}
                                    /></div>
                                <div style={{margin: '10px 0'}}>
                                    <Field
                                        component={regform}
                                        label={'Yes'}
                                        type="checkbox"
                                        name={"LookingForAJobDescription"}
                                    />
                                </div>
                                <div style={{margin: '10px 0'}}>
                                    <Field
                                        component={regform}
                                        type="text"
                                        label={'About for me'}
                                        name={'aboutMe'}
                                    />
                                </div>
                                {Object.keys(props.profile.contacts).map(i => {
                                    return <div style={{margin: '10px 0'}}>
                                        <Field
                                            component={regform}
                                            type="text"
                                            label={i}
                                            name={"contacts."+i}
                                        /></div>
                                })}
                                {props.profile.userId === props.isAuth.data.id &&
                                <Field component={regform} type="file" id={'inputFile'} onChange={props.onclicks}/>
                                }
                            </div>
                        </div>
                        : <span>Нужна реестрация для просмотра профиля...</span>
                }
            </div>
        </form>
    )
}
let CreateForm = reduxForm({
    form: 'formprofile'
})(Createprofile)

export default CreateForm