import React, { useState } from "react";
const ControlledInputs = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(name, email);
	};

	const handleChange = (e) => {
		// console.log(e.target.name);
		setName(e.target.value);
	};
	return (
		<form className="form" onSubmit={handleSubmit}>
			<h4>controlled inputs</h4>
			<div className="form-row">
				<label htmlFor="name" className="form-label">
					name
				</label>
				<input
					type="text"
					id="name"
					className="form-input"
					value={name}
					onChange={handleChange}
				/>
			</div>
			<div className="form-row">
				<label htmlFor="email" className="form-label">
					email
				</label>
				<input
					type="email"
					id="email"
					className="form-input"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
			</div>
			<button type="submit" className="btn btn-block">
				Submit
			</button>
		</form>
	);
};
export default ControlledInputs;
