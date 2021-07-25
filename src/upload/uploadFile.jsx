import React, {useEffect, useState} from "react";
import {appfirebase} from "../firebase/base";

const db = appfirebase.firestore()

const UploadFile = (props) => {
    const [fileUrl, setFileUrl] = useState(null)
    const [users, setUsers] = useState([])
    const handler = (event) => {
        event.preventDefault()
    }
    const onchangefile = async (event) => {
        const file = event.target.files[0]
        const storegRef = appfirebase.storage().ref()
        const fileRef = storegRef.child(file.name)
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL())

    }

    useEffect(() => {
        const fetchUsers = async ()=>{
            const usersCollection = await db.collection('users').get()
            setUsers(usersCollection.docs.map(doc=>{
                return doc.data
            }))
        }
        fetchUsers()
    }, []);


    return (
        <>
            <form onSubmit={handler}>
                <input type="file" onChange={onchangefile}/>
                <button>Submit</button>
            </form>
        </>
    )

}
export default UploadFile