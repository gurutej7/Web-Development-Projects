import React, { useState, useReducer } from "react";
import { data, people } from "../../data";
const ReducerBasics = () => {
	const CLEAR_LIST = "CLEAR_LIST";
	const RESET_LIST = "RESET_LIST";
	const REMOVE_ITEM = "REMOVE_ITEM";
	const defaultState = {
		people: data,
	};
	const reducer = (state, action) => {
		// console.log(action);
		if (action.type === CLEAR_LIST) {
			return { ...state, people: [] };
		}

		if (action.type === RESET_LIST) {
			return { ...state, people: data };
		}

		if (action.type === REMOVE_ITEM) {
			let newPeople = state.people.filter(
				(person) => person.id !== action.payload.id
			);
			return { ...state, people: newPeople };
		}

		// if the action provided is not handled above then return some default state or we can throw the error
		// return state;
		throw new Error(`No matching dispatched action :  "${action.type}"`);

		// if(action.type)
	};

	// effectively a function used to manipulate the state
	// takes a reducer function and a default state is given as arguments
	// default state can be anything
	// we will get back a state and a dispatch
	// first we should dispatch something called action , then it goes through the reducer function then the value in the state is updated
	// reducer function gets the current state and the action (what we are trying to do)

	const [state, dispatch] = useReducer(reducer, defaultState);

	// const [people, setPeople] = useState(data);

	const removeItem = (id) => {
		// let newPeople = people.filter((person) => person.id !== id);
		// setPeople(newPeople);

		// dispatch({ type: REMOVE_ITEM, id: id });
		// common convention is to set up a object called payload
		dispatch({ type: REMOVE_ITEM, payload: { id: id } });
	};

	const clearList = () => {
		dispatch({ type: CLEAR_LIST });
	};

	const resetList = () => {
		dispatch({ type: RESET_LIST });
	};

	// console.log(state);
	return (
		<div>
			{state.people.map((person) => {
				const { id, name } = person;
				return (
					<div key={id} className="item">
						<h4>{name}</h4>
						<button onClick={() => removeItem(id)}>remove</button>
					</div>
				);
			})}
			{state.people.length === 0 ? (
				<button
					className="btn"
					style={{ marginTop: "2rem" }}
					onClick={resetList}
				>
					reset items
				</button>
			) : (
				<button
					className="btn"
					style={{ marginTop: "2rem" }}
					onClick={clearList}
				>
					clear items
				</button>
			)}
		</div>
	);
};

export default ReducerBasics;
