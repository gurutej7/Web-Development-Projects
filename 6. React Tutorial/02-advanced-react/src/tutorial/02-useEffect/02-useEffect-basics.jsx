import React from "react";
import { useState, useEffect } from "react";

/*

useEffect is a hook in React that allows you to perform side effects in function components.
There is no need for urban dictionary - basically any work outside of the component. 
Some examples of side effects are: subscriptions, fetching data, directly updating the DOM, event listeners, timers, etc.

- useEffect hook
- accepts two arguments (second optional)
- first argument - cb function
- second argument - dependency array
- by default runs on each render (initial and re-render)
- cb can't return promise (so can't make it async)
- if dependency array empty [] runs only on initial render
*/

const UseEffectBasics = () => {
	const [value, setValue] = useState(0);
	const sayHello = () => {
		console.log("hello there");
	};

	sayHello();

	useEffect(() => {
		console.log("hello from use effect");
	}, []);

	return (
		<div>
			<h1>value : {value}</h1>
			<button className="btn" onClick={() => setValue(value + 1)}>
				click me
			</button>
		</div>
	);
};
export default UseEffectBasics;
