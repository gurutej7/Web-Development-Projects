// passing arguments for our component
// parameters
const someFunc = (param1, param2) => {
	console.log(param1, param2);
};
// arguments
someFunc("job", "developer");

// pass different data to individual componenets
// output has same structure but the data is going to be different
// every component we create , it automatically gets the props object, which is a parameter

// setting props directly
const BookList = () => {
	return (
		<section className="booklist">
			<Book
				author="Robin Sharma"
				title="The 5 AM Club"
				image="./images/book3.jpg"
			/>
			<Book />
			<Book />
			<Book />
		</section>
	);
};
// const Book = (props) => {
// 	// console.log(props);
// 	// const author = props.author;
// 	// const title = props.title;
// 	// const image = props.image;
// 	// the prop will be only displayed if it is provided
// 	return (
// 		<article className="book">
// 			<img src={props.image} alt={props.title} />;<h2>{props.title}</h2>;
// 			<h4>{props.author}</h4>
// 		</article>
// 	);
// };

// somewhat dynamic
const firstBook = {
	author: "Jordan Moore",
	title: "Interesting Facts For Curious Minds",
	img: "./images/book-1.jpg",
};
const secondBook = {
	author: "James Clear",
	title: "Atomic Habits",
	img: "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL._AC_UL900_SR900,600_.jpg",
};

function BookList() {
	return (
		<section className="booklist">
			<Book
				author={firstBook.author}
				title={firstBook.title}
				img={firstBook.img}
			/>
			<Book
				author={secondBook.author}
				title={secondBook.title}
				img={secondBook.img}
			/>
		</section>
	);
}
const Book = (props) => {
	console.log(props);
	return (
		<article className="book">
			<img src={props.img} alt={props.title} />
			<h2>{props.title}</h2>
			<h4>{props.author} </h4>
		</article>
	);
};

// accessing props different ways
// destructuring
const someObject = {
	name: "john",
	job: "developer",
	location: "florida",
};

console.log(someObject.name);
const { name, job } = someObject;
console.log(job);
// no need for all the props.propName
// destructure inside component
// const Book = (props) => {
//   const { img, title, author } = props;
//   return (
//     <article className='book'>
//       <img src={img} alt={title} />
//       <h2>{title}</h2>
//       <h4>{author} </h4>
//     </article>
//   );
// };

// destructure in function parameters (in our case props)
// if you have console.log(props) - it won't be defined

// const Book = ({ img, title, author }) => {
//   return (
//     <article className='book'>
//       <img src={img} alt={title} />
//       <h2>{title}</h2>
//       <h4>{author} </h4>
//     </article>
//   );
// };

// special prop in react called children
// it provides access to everything we render in the component tag

// const Book = ({ img, title, author, children }) => {
// 	// rest of the logic
// };
// const Book = (props) => {
// 	const { img, title, author, children } = props;
// 	console.log(props);
// 	return (
// 		<article className="book">
// 			<img src={img} alt={title} />
// 			<h2>{title}</h2>
// 			<h4>{author} </h4>
// 			{children}
// 		</article>
// 	);
// };

// in jsx we cannot render objects directly

// const newBooks = books.map((book) => {
// 	return (
// 		<Book title={book.title} author={book.author} image={book.image}></Book>
// 	);
// });
