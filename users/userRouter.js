const express = require("express");

const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  const newUser = req.body;
  console.log("newUser from body", newUser);

  userDb
    .insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error creating user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const postInfo = req.body;
  const user_id = req.params.id;
  console.log("post info from body", postInfo, user_id);

  postDb
    .insert(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log("post", err);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

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

router.get("/:id", validateUserId, (req, res) => {
  const userId = req.params.id;

  userDb
    .getById(userId)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "The user info could not be retrieved"
      });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const userId = req.params.id;

  userDb
    .getUserPosts(userId)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Posts for user not found" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const userId = req.params.id;

  userDb
    .remove(userId)
    .then(user => {
      if (user) {
        res.status(200).json({ message: "Successfully deleted the user." });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "The user could not be removed." });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  userDb
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "User could not be updated" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const userId = req.params.id;

  userDb.getById(userId).then(id => {
    if (id) {
      req.user = req.body;
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  });

  next();
}

function validateUser(req, res, next) {
  const newUser = req.body;
  console.log("newUser from body", req.body);

  if (newUser.name) {
    console.log("you may go");
    next();
  } else if (newUser.name === "") {
    res.status(400).json({ message: "missing required name field" });
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  const newPost = req.body;
  console.log("newPost from body", newPost);

  if (newPost.text) {
    console.log("post has text");
    next();
  } else if (newPost.text === "") {
    res.status(400).json({ message: "missing required text field" });
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

module.exports = router;
