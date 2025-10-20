import { useEffect, useState } from "react";
import { clearInterval } from "timers";

const Timer = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
}, []);

    return <h1>{count} 초 경과</h1>;
};

export default Timer;