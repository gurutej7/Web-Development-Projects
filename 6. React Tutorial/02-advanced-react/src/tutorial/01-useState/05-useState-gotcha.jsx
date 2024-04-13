import React from "react";

/*
If you want to update the state immediately and synchronously, you can pass a function to setState that receieves the previous state as an argument and returns the new state. For example :

setState((prevState) => {
  return { ...prevState, value : newValue}
}) 
*/
const UseStateGotcha = () => {
	const [value, setValue] = React.useState(0);

	const handleClick = () => {
		setValue((currentState) => {
			const newState = currentState + 1;
			console.log(currentState);
			return newState;
		});
		// console.log(value);
	};
	return (
		<>
			<h1>{value}</h1>
			<button type="button" className="btn" onClick={handleClick}>
				Increase Count
			</button>
		</>
	);
};

export default UseStateGotcha;
