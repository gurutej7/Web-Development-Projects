import React from "react";
import { useState } from "react";
const UserChallenge = () => {
	const [user, setUser] = useState(null);

	const login = () => {
		// in general we will connect to db or api
		setUser({ name: "gurutej" });
	};

	const logout = () => {
		setUser(null);
	};
	return (
		<div>
			{user ? (
				<div>
					<h4>hello there, {user.name} </h4>
					<button className="btn" onClick={logout}>
						logout
					</button>
				</div>
			) : (
				<div>
					<h4>Please login</h4>
					<button className="btn" onClick={login}>
						login
					</button>
				</div>
			)}
		</div>
	);
};

export default UserChallenge;
