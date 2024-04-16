import React, { useState } from "react";
import NavLinks from "./NavLinks";

const NavBar = () => {
	const [user, setUser] = useState({ name: "bob" });

	const logout = () => {
		setUser(null);
	};
	return (
		<nav className="navbar">
			<h5>Context API</h5>
			<NavLinks user={user} logout={logout}></NavLinks>
		</nav>
	);
};

export default NavBar;
