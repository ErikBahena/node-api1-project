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

// delete a user
server.delete("/api/users/:id", (req, res) => {
  UsersDAFs.remove(req.params.id)
    .then((removedUser) => {
      removedUser
        ? res.status(200).json(removedUser)
        : res
            .status(404)
            .json({ message: "The user with the specified ID does not exist" });
    })
    .catch(() => {
      res.status(500).json({
        message: "The user could not be removed",
      });
    });
});

// update a user
server.put("/api/users/:id", (req, res) => {
  UsersDAFs.update(req.params.id, req.body)
    .then((updatedUser) => {
      if (!updatedUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
        return;
      }

      if (!req.body.bio || !req.body.name) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user" });
        return;
      }

      res.status(200).json(updatedUser);
    })
    .catch(() => {
      res.status(500).json({
        message: "The user information could not be modified",
      });
    });
});

// EXPORT YOUR SERVER instead of {}
module.exports = server;
