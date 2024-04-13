import React from "react";
import ReactDOM from "react-dom/client";

// const Greeting = () => {
//   return <h2>My first Component</h2>;
// };

// const Greeting = () => {
//   return React.createElement("h2", {}, "Hello World");
// };

// const Greeting = () => {
//   return (
//     <div>
//       <h2>My First Component</h2>
//     </div>
//   );
// };

// const Greeting = () => {
//   return React.createElement(
//     "div",
//     {},
//     React.createElement("h2", {}, "Hello world")
//   );
// };

// JSX Rules
/*
return single element
  * semantics section/article
  * Fragment - let`s us group elements without adding extra nodes
*/

// return <React.Fragment> rest of the code </React.Fragment>
// return <.> ..rest of jsx </>

//Nest components

const Greeting = () => {
  return (
    <>
      <Person />
      <Message />
    </>
  );
};

const Person = () => <h2>Gurutej</h2>;
const Message = () => {
  return <p>this is my message</p>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Greeting />);
