import React from "react";
import { useState } from "react";

/*
In JavaScript, short-circuit evaluation is a technique that allows you to use logical operators 
(such as && and ||) to perform conditional evaluations in a concise way.

The && operator (logical AND) returns the first operand if it is "falsy", or the second operand if the first operand is "truthy".
*/

const ShortCircuitOverview = () => {
	// falsy
	const [text, setText] = useState("");
	// truthy
	const [name, setName] = useState("Gurutej");

	return (
		<div>
			{/* {if(someCondition){
				"won`t work"
			}} */}
			<h4>Truthy OR = {name || "hello"}</h4>
			<h4>Falsy OR = {text || "hello"}</h4>
			<h4>Truthy AND = {name && "hello"}</h4>
			<h4>Falsy AND = {text && "hello"}</h4>
		</div>
	);
};
export default ShortCircuitOverview;
