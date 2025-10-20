import { useEffect, useState } from "react";

export default function HelloEffect() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("컴포넌트가 화면에 나타났어요!");
    }, [count]);

    useEffect(() => {
        console.log("컴포넌트가 최초에 한번 화면에 나타났어요!");
    }, []);

    const onClick = ()  => {
        setTimeout(() => {
            setCount(count + 1);
        } ,1000 );
    };

    return (
    <div>
        <h1>안녕하세요!</h1>
        <button onClick={() => console.log("버튼이 클릭되었어요!")}>클릭</button>
        <p>{count}</p>
    </div>    
    );
}