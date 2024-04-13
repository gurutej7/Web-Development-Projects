// React Events  { https://legacy.reactjs.org/docs/events.html }
// most common
// onClick (click events)
// onSubmit (submit form )
// onChange (input change )

const EventExamples = () => {
	const handleFormInput = (e) => {
		// some specific logic
		// console.log("handle form input");
		// console.log(e);
		console.log(e.target);
		console.log(e.target.name);
	};
	const handleButtonClick = () => {
		// some specific logic
		alert("Button was clicked");
	};

	const handleFormSubmission = (e) => {
		e.preventDefault();
		console.log("form submitted");
	};
	return (
		<section>
			<form action="" onSubmit={handleFormSubmission}>
				<h2>Typical Form</h2>
				<input
					type="text"
					name="example"
					onChange={handleFormInput}
					style={{ margin: "1rem 0" }}
				/>
			</form>
			<button onClick={handleButtonClick}>click Me</button>
		</section>
	);
};
