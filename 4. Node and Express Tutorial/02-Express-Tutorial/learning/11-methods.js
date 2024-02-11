const express = require("express");
const app = express();
let { people } = require("./data");


// static assets
app.use(express.static("./methods-public")); // a form page

// middleware to get/parse the form data
app.use(express.urlencoded({ extended: false }));
// middleware to parse json data
app.use(express.json());
app.get("/api/people", (req, res) => {
  // res.status(200).json(people);
  res.status(200).json({ success: true, data: people }); // to send as an object
});

app.post("/login", (req, res) => {
  // console.log(req.body);// for input "guru" in form => output : [Object: null prototype] { name: 'guru' }
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please provide credentials");
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(201).send({ success: true, person: name });
  }

  // if no name -> invalid input
  res.status(400).json({ success: false, msg: "please provide name value" });
});

// example post method of checking with postman
app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (name) {
    // appending the name we got , to the array and sending back the array itself
    return res.status(201).send({ success: true, data: [...people, name] });
  }

  // if no name -> invalid input
  res.status(400).json({ success: false, msg: "please provide name value" });
});

// using route params to specify the data we are looking for
app.put("/api/people/:id", (req, res) => {
  // we are getting the specified data that we want to change  in the url
  const { id } = req.params;
  // and in the body we get the new value that we want have in place of existing data
  // the value we will get from the user
  const { name } = req.body;

  // console.log(id,name);
  // res.send("Testing");
  // checking if id exist or not
  const person = people.find((person) => person.id === Number(id));
  if (person) {
    // iterating over the array to find the person with the given id
    const newPerson = people.map((person) => {
      if (person.id === Number(id)) {
        // once we have found then update
        person.name = name;
      }

      return person;
    });

    return res.status(200).json({ success: true, data: newPerson });
  }
  // if the person doesn`t exist with the provided id
  res.status(404).json({ success: false, msg: `no person with the id ${id}` });
});

app.delete("/api/people/:id", (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  // if that person doesnot exist
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  // using filter method to remove that sucker and creating a new one
  // It is just a example to have a array , in normal we will perform the following operation in the database
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  return res.status(200).json({ success: true, data: newPeople });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
