import React from 'react'
import logouser from "../600px-User_icon_3.svg.png";
import {Field, reduxForm} from "redux-form";

const Createprofile = (props) => {
    let regform = ({type, input, label}) => {
        return (
            <input type={type} {...input} placeholder={label} {...props}/>
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
                                <div style={{margin: '10px 0'}}><b>Full name:</b>

                                    <Field
                                        component={regform}
                                        type="text"
                                        placeholder={'Full name'}
                                        name={'Full name'}
                                    /></div>
                                <div style={{margin: '10px 0'}}><b>Find jobs:</b><label>
                                    <Field
                                        component={regform}
                                        type="checkbox"
                                        name={"yes"}
                                    />Yes</label>
                                    <label>
                                        <Field
                                            component={regform}
                                            type="checkbox"
                                            name="no"
                                        />No</label>
                                </div>
                                <div style={{margin: '10px 0'}}><b>About for me:</b><br/>
                                    <Field
                                        component={regform}
                                        type="text"
                                        placeholder={'Textarea'}
                                        name={'Textarea'}
                                    />
                                </div>
                                {Object.keys(props.profile.contacts).map(i => {
                                    return <div style={{margin: '10px 0'}}>{i}:
                                        <Field
                                            component={regform}
                                            type="text"
                                            placeholder={'You ' + i}
                                            name={i}
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