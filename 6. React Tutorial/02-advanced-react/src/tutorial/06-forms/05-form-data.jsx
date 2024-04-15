import React from "react";
import { useState } from "react";

const UncontrolledInputs = () => {
	const [value, setValue] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(e.currentTarget);
		const formData = new FormData(e.currentTarget);
		console.log(formData);
		const email = formData.get("email");
		// console.log(email);
		// formData is a array of arrays
		// console.log([...formData.entries()]);
		const newUser = Object.fromEntries(formData); // turns arrays of arrays data structure into a object with key value pairs
		console.log(newUser);
		e.currentTarget.reset();
	};
	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<h4>Form Data API</h4>
				{/* name */}
				<div className="form-row">
					<label htmlFor="name" className="form-label">
						name
					</label>
					<input
						type="text"
						className="form-input"
						id="name"
						name="name"
					/>
				</div>
				{/* email */}
				<div className="form-row">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-input"
						id="email"
						name="email"
					/>
				</div>
				{/* email */}
				<div className="form-row">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-input"
						id="password"
						name="password"
					/>
				</div>

				<button type="submit" className="btn btn-block">
					submit
				</button>
			</form>
		</div>
	);
};
export default UncontrolledInputs;
