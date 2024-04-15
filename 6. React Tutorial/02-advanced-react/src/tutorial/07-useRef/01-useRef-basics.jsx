import React from "react";
import { useEffect, useRef, useState } from "react";

const UseRefBasics = () => {
	const [value, setValue] = useState(0);
	const refContainer = useRef(null);
	// console.log(refContainer);
	const isMounted = useRef(false);

	// useRef doesn`t trigger re-render so, we won`t have infinite loop

	useEffect(() => {
		refContainer.current.focus(); // highlights the current part after the initial render to the input box
	});

	// to avoid some functionality to run on the initial render using useRef

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}
		console.log("re-render");
	}, [value]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const name = refContainer.current.value;
		console.log(name);
	};

	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-row">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						id="name"
						className="form-input"
						ref={refContainer}
					/>
				</div>
				<button type="submit" className="btn btn-block">
					submit
				</button>
			</form>
			<h1>value : {value}</h1>
			<button onClick={() => setValue(value + 1)} className="btn">
				increase
			</button>
		</div>
	);
};

export default UseRefBasics;
