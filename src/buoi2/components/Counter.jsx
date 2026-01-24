import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h2>Counter: <span style={{ color: count > 10 ? 'red' : 'white' }}>{count}</span></h2 >
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => {
                if (count === 0) {
                    alert("Số không thể nhỏ hơn 0");
                } else {
                    setCount(count - 1);
                }
            }}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>

        </div >
    );
}
export default Counter;