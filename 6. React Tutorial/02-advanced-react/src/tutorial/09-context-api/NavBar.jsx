import React, { useState, createContext, useContext } from "react";
import NavLinks from "./NavLinks";

export const NavBarContext = createContext(); // returns consumer and the provider

// console.log(NavBarContext.Provider);

// custom hook

export const useAppContext = () => {
	return useContext(NavBarContext);
};

const NavBar = () => {
	const [user, setUser] = useState({ name: "bob" });

	const logout = () => {
		setUser(null);
	};
	return (
		<NavBarContext.Provider value={{ user, logout }}>
			<nav className="navbar">
				<h5>Context API</h5>
				<NavLinks></NavLinks>
			</nav>
		</NavBarContext.Provider>
	);
};

export default NavBar;
