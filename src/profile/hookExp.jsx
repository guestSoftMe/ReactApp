import React, {useRef, useState} from "react";
import {PaginatorDemo} from "./paginator";


function HooksExp(props) {
    const [state, setState] = useState({
        text: 'Ostap',
        id: 25
    });

    let inputRef = useRef()

    function setButtonClick() {
        return setState((prev) => {
            return {
                ...prev,
                text: inputRef.current.value
            }
        })
    }

    return (
        <div>
            <input type="text" ref={inputRef}/>
            <pre>
                    {JSON.stringify(state, null, 2)}
                </pre>
            <button onClick={setButtonClick}>Click</button>
        </div>
    )
}

export default HooksExp