import React from "react";

const UseStateObject = () => {
	const [person, setPerson] = React.useState({
		name: "gurutej",
		age: 21,
		hobby: "reading books",
	});
	// const [name, setname] = React.useState("gurutej");
	// const [age, setAge] = React.useState(21);
	// const [hobby, setHobby] = React.useState("Reading books");

	const displayPerson = () => {
		// setname("sai");
		// setAge(24);
		// setHobby("Playing Cricket");
		setPerson({ name: "sai", age: 24, hobby: "Playing Cricket" });
	};
	return (
		<>
			<h3>{person.name}</h3>
			<h3>{person.age}</h3>
			<h4>Enjoys : {person.hobby}</h4>
			<button type="button" className="btn" onClick={displayPerson}>
				show sai
			</button>
		</>
	);
};

export default UseStateObject;
