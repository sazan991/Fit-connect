import { useState } from "react";

const Child = () => {
    const [count, setCount] = useState(0);
    
    return (
        <>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        </>
    );
}