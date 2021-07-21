import React, {useEffect, useState} from "react";
import axios from "axios";

function HooksUse(props) {

    const [type, setType] = useState('users');

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/${type}`)
            .then(response => {
                setType(response)
            })
    }, [type]);
    return (
        <div style={{margin: '30px 0'}}>
            <div>
                <button onClick={() => setType('users')}>User</button>
                <button onClick={() => setType('posts')}>Posts</button>
                <button onClick={() => setType('todos')}>Todos</button>
                <button onClick={() => setType('photos')}>Photos</button>
                <button onClick={() => setType('comments')}>Comments</button>
            </div>
            <pre>{JSON.stringify(type, null, 2)}</pre>

        </div>
    )
}

export default HooksUse