import React from "react";
import { data } from "../../../src/data";
import { useState } from "react";
const UseStateArray = () => {
	const [people, setPeople] = useState(data);

	const removeItem = (id) => {
		console.log(id);
		const newPeople = people.filter((person) => person.id !== id);
		setPeople(newPeople);
		// setPeople(people.filter((person) => person.id !== id));
	};

	const clearAllItems = () => {
		setPeople([]);
	};
	return (
		<div>
			{people.map((person) => {
				const { id, name } = person;
				// console.log(person);
				return (
					<div key={id}>
						<h4>{name}</h4>
						<button type="button" onClick={() => removeItem(id)}>
							{" "}
							remove
						</button>
					</div>
				);
			})}
			<button
				type="button"
				style={{ margin: "1.5rem" }}
				className="btn"
				onClick={clearAllItems}
			>
				clear all
			</button>
		</div>
	);
};

export default UseStateArray;
