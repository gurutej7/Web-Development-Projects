import React from "react";
import { useState } from "react";
//- useState hook
// - returns an array with two elements: the current state value, and a function that we can use to update the state
// - accepts default value as an argument
// - state update triggers re-render

const UseStateBasics = () => {
	// console.log(useState(0));
	// const value = useState("hey")[0];
	// const func = useState("hey"[1]);
	// console.log(value, func);

	const [count, setCount] = useState(0);

	const handleClick = () => {
		setCount(count + 1);
		console.log(count);
	};
	return (
		<div>
			<h4>Count : {count}</h4>
			<button type="button" className="btn" onClick={handleClick}>
				{" "}
				Increment Count{" "}
			</button>
		</div>
	);
};

export default UseStateBasics;
