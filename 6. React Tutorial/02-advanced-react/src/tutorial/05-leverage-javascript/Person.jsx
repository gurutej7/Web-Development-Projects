import React from "react";
import avatar from "../../assets/default-avatar.svg";

export function Person({ name, nickName = "Not Applicable", images }) {
	// const img = images && images[0] && images[0].small && images[0].small.url;
	const img = images?.[0]?.small?.url || avatar; // optional chaining
	return (
		<div>
			<img src={img} alt={name} style={{ width: "50px" }} />
			<h4>{name}</h4>
			{/* <p>NickName : {nickName || "Not Applicable"}</p> */}
			<p>NickName : {nickName}</p>
		</div>
	);
}
