import React, { useState } from "react";
import { data } from "../../data";
const UserChallenge = () => {
	const [name, setName] = useState("");
	const [people, setPeople] = useState(data);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name) return;
		// let size = people.length;

		const fakeId = Date.now();

		const newUser = { id: fakeId, name: name };

		const updatedPeople = [...people, newUser];
		setPeople(updatedPeople);
		setName(""); // clear the input
		console.log(people);
	};

	const removeUser = (id) => {
		const updatedPeople = people.filter((person) => person.id !== id);
		setPeople(updatedPeople);
	};

	return (
		<div>
			<form className="form" onSubmit={handleSubmit}>
				<h4>Add User</h4>

				<div className="form-row">
					<label htmlFor="name" className="form-label">
						name
					</label>
					<input
						type="text"
						className="form-input"
						id="name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</div>

				<button type="submit" className="btn btn-block">
					submit
				</button>
			</form>
			{/* render users below */}
			<h3>Users :</h3>
			{people.map((person) => {
				return (
					<div key={person.id}>
						<h5>{person.name}</h5>
						<button
							onClick={() => {
								removeUser(person.id);
							}}
							className="btn"
						>
							remove
						</button>
					</div>
				);
			})}
		</div>
	);
};
export default UserChallenge;
