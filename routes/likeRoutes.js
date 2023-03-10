const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.put("/add/like", async (req, res) => {
  try {
    const postId = req.body.id;
    const userToAdd = req.body.likesListUser[0];

    const post = await Post.findOne({ id: postId });

    const userExists = post.likesListUser.find(
      (user) => user.login === userToAdd.login
    );
    console.log("userexists", userExists);

    if (userExists) {
      console.log(".");
      return res
        .status(400)
        .send({ message: "User has already liked this post" });
    }

    const updatedUser = await Post.updateOne(
      { id: req.body.id },
      { $push: { likesListUser: req.body.likesListUser } },
      req.body
    );
    console.log("update", updatedUser);
    res.status(200).send({ message: "Like envoyé !" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/checking/like/:postId/:userId", async (req, res) => {
  try {
    console.log('req.params', req.params)
    const postId = req.params.postId;
    const userId = req.params.userId;

    const post = await Post.findOne({ id: postId });

    const userExists = post.likesListUser.find((user) => user.login === userId);

    if (userExists) {
      res.status(200).send({ message: "L'utilisateur a aimé ce post" });
    } else {
      res.status(200).send({ message: "L'utilisateur n'a pas aimé ce post" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
module.exports = router;
