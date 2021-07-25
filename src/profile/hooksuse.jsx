import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import obs from './../circles.svg'

const HooksUse = props => {

    const [type, setType] = useState('users');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async() => {
        let response = await axios.get(`https://jsonplaceholder.typicode.com/${type}`)
                setType(response)
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
            <div>
                {type.data
                    ? <pre>{JSON.stringify(type, null, 2)}</pre>
                    : <img src={obs} alt=""/>
                }
            </div>
        </div>
    )
}

export default React.memo(HooksUse)