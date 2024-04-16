import React from "react";
import { useAppContext } from "./NavBar";
const UserContainer = () => {
	const value = useAppContext();
	// console.log(value);
	const { user, logout } = value;
	// return "Hello World";
	return (
		<div className="user-container">
			{user ? (
				<>
					<p>Hello there, {user?.name} </p>
					<button className="btn" onClick={logout}>
						logout
					</button>
				</>
			) : (
				<p>Please login</p>
			)}
		</div>
	);
};

export default UserContainer;
