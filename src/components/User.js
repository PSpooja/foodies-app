import { useEffect, useState } from "react";

const User = (props) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {

    }, [])

    return(
        <div>
            <h3>Count : {count}</h3>
            <h3>Name : {props.name}</h3>
            <h3>Location : {props.location}</h3>
        </div>
    )
}

export default User;