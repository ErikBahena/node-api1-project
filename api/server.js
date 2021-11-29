// imports
const express = require("express");

// Users database access functions
const UsersDAFs = require("./users/model.js");

// express server instance
const server = express();

// Global Middle Ware
server.use(express.json());

// Endpoints
// get all users
server.get("/api/users", (req, res) => {
  UsersDAFs.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

// get user by id
server.get("/api/users/:id", (req, res) => {
  UsersDAFs.findById(req.params.id)
    .then((user) => {
      user
        ? res.status(200).json(user)
        : res
            .status(404)
            .json({ message: "The user with the specified ID does not exist" });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

// create a new user
server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });

    return;
  }

  UsersDAFs.insert(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error while saving the user to the database",
      });
    });
});

// EXPORT YOUR SERVER instead of {}
module.exports = server;
