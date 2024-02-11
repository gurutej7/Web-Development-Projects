const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  // console.log(req.body);// for input "guru" in form => output : [Object: null prototype] { name: 'guru' }
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please provide credentials");
});

module.exports = router;