const express = require("express");

const userDb = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Users could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  console.log(req);
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

/*validateUserId()

validateUserId validates the user id on every request that expects a user id parameter
if the id parameter is valid, store that user object as req.user
if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" }
validateUser()*/

function validateUserId(req, res, next) {
  if (req.params.id) {
  } else {
    res.status(400).json({ message: "invalid user id" });
  }

  next();
}

/* validateUser validates the body on a request to create a new user
if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }
validatePost()*/

function validateUser(req, res, next) {
  if (i) {
  } else {
    res.status(400).json({ message: "missing user data" });
  }

  next();
}

/* validatePost validates the body on a request to create a new post
if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" } */

function validatePost(req, res, next) {
  if (i) {
  } else {
    res.status(400).json({ message: "missing post data" });
  }

  next();
}

module.exports = router;
