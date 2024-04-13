import React from "react";
const ErrorExample = () => {
	let count = 0;

	const handleClick = () => {
		count = count + 1;
		console.log(count);
	};

	return (
		<div className="container">
			<h2>{count}</h2>
			<button className="btn" type="button" onClick={handleClick}>
				increment count
			</button>
		</div>
	);
};

export default ErrorExample;
