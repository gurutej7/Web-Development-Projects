let { people } = require("../data");


const getPeople = (req, res) => {
    // res.status(200).json(people);
    res.status(200).json({ success: true, data: people }); // to send as an object
  }

const createPerson = (req, res) => {
    const { name } = req.body;
    if (name) {
      return res.status(201).send({ success: true, person: name });
    }
  
    // if no name -> invalid input
    res.status(400).json({ success: false, msg: "please provide name value" });
  }

const updatePerson = (req, res) => {
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
  }

  const deletePerson = (req, res) => {
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
  }


module.exports = {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson
}