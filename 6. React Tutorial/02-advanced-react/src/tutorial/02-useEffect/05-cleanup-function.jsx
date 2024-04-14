import React from "react";
import { useState, useEffect } from "react";

const CleanupFunction = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<div>
			<button className="btn" onClick={() => setToggle(!toggle)}>
				{" "}
				toggle component
			</button>
			{toggle && <SomeComponent></SomeComponent>}
		</div>
	);
};

const SomeComponent = () => {
	useEffect(() => {
		console.log("hmm, interesting");
	}, []);
	return <h1>Hello Bro</h1>;
};

export default CleanupFunction;
