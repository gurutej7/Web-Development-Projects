import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const BookList = () => {
  return (
    <section className="booklist">
      <Book />
      <Book />
      <Book />
      <Book />
    </section>
  );
};

const Book = () => {
  return (
    <article className="book">
      <Image />
      <Title />
      <Author />
    </article>
  );
};

const Image = () => <img src="./images/book3.jpg" alt="The 5 AM Club" />;

const Title = () => <h2>The 5 AM Club</h2>;
const Author = () => (
  <h4 style={{ color: "#617d98", fontSize: "0.75rem", marginTop: "0.5rem" }}>
    Robin Sharma
  </h4>
);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<BookList />);
