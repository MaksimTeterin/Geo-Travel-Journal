const express = require("express");

const postService = require("./services/postService.js");
const userService = require("./services/userService.js");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  userService
    .getAllUsers()
    .then((users) => res.json(users))
    .catch((error) => {
      console.error("Error fetching users:", error);
      res.status(500).send("Could not fetch users");
    });
});

app.get("/posts", (req, res) => {
  postService
    .getAllPosts()
    .then((posts) => res.json(posts))
    .catch((error) => {
      console.error("Error fetching posts:", error);
      res.status(500).send("Could not fetch posts");
    });
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  userService
    .getUserById(userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching user by ID:", error);
      res.status(500).send("Could not fetch user by ID");
    });
});

app.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id, 10);
  postService
    .getPostById(postId)
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).send("Post not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching post by ID:", error);
      res.status(500).send("Could not fetch post by ID");
    });
});

app.post("/users", express.json(), (req, res) => {
  const { login, password, name, email } = req.body;
  userService
    .createUser(login, password, name, email)
    .then((user) => res.status(201).json(user))
    .catch((error) => {
      console.error("Error creating user:", error);
      res.status(500).send("Could not create user");
    });
});

app.post("/posts", express.json(), (req, res) => {
  const { user_id, header, imgLink, content, geolocation } = req.body;
  postService
    .createPost(user_id, header, imgLink, content, geolocation)
    .then((post) => res.status(201).json(post))
    .catch((error) => {
      console.error("Error creating post:", error);
      res.status(500).send("Could not create post");
    });
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  userService
    .removeUser(userId)
    .then((user) => res.json(user))
    .catch((error) => {
      console.error("Error removing user:", error);
      res.status(500).send("Could not remove user");
    });
});

app.delete("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id, 10);
  postService
    .removePost(postId)
    .then((post) => res.json(post))
    .catch((error) => {
      console.error("Error removing post:", error);
      res.status(500).send("Could not remove post");
    });
});

app.put("/users/:id", express.json(), (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { login, password, name, email } = req.body;
  userService
    .updateUser(userId, login, password, name, email)
    .then((user) => res.json(user))
    .catch((error) => {
      console.error("Error updating user:", error);
      res.status(500).send("Could not update user");
    });
});

app.put("/posts/:id", express.json(), (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const { header, imgLink, content, geolocation } = req.body;
  postService
    .updatePost(postId, header, imgLink, content, geolocation)
    .then((post) => res.json(post))
    .catch((error) => {
      console.error("Error updating post:", error);
      res.status(500).send("Could not update post");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
