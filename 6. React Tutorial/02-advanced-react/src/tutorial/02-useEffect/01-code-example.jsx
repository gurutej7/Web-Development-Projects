import React from "react";
import { useState } from "react";

const CodeExample = () => {
	const [value, setValue] = useState(0);

	const sayHello = () => {
		console.log("Hello there");
		// be careful, we may end in an infinite loop
		// setValue(value + 1);
		// error : Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
	};
	sayHello();
	return (
		<div>
			<h1>value : {value}</h1>
			<button className="btn" onClick={() => setValue(value + 1)}>
				click me
			</button>
		</div>
	);
};
export default CodeExample;
