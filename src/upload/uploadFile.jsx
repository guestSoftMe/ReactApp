import React from "react";
import {appfirebase} from "../firebase/base";

 const UploadFile = (props) => {
    const handler = (event)=>{
        event.preventDefault()
    }
    const onchangefile=(event)=>{
        const file = event.target.files[0]
        const storegRef = appfirebase.storage().ref()
        const fileRef = storegRef.child(file.name)
        fileRef.put(file).then(()=>{
            console.log('File uploader.....')
        })
    }

    return (
        <>
            <form onSubmit={handler}>
            <input type="file" onChange={onchangefile}/>
            <input type="text" />
            <button>Submit</button>
            </form>
        </>
    )

}
export default UploadFile