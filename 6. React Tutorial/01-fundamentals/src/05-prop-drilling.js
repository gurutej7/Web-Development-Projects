// react data flow - can only pass props down then line , parent to children
// alternatives Context API, redux, other state libraries

const BookList = () => {
	const getBook = (id) => {
		const book = books.find((book) => book.id === id);
		console.log(book);
	};
	return (
		<section className="booklist">
			{books.map((book) => {
				return <Book {...book} key={book.id} getBook={getBook} />;
			})}
		</section>
	);
};

const Book = ({ image, title, author, getBook, id }) => {
	const getSingleBook = () => {
		getBook(id);
	};
	return (
		<article className="book">
			<img src={image} alt={title} />
			{/* // the getBook() function is directly invoked when the application is loaded */}
			{/* <button onClick={getBook(id)}>click me</button> */}
			{/* approach  one - setting up wrapper inside of the child component */}
			{/* <button onClick={getSingleBook}>Click me</button> */}
			{/* approach two , passing an anonymous function  */}
			<button onClick={() => getBook(id)}>Click me</button>
			<h2>{title}</h2>;<h4>{author}</h4>
		</article>
	);
};
