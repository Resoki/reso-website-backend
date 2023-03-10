const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Joi = require("joi");

const postSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  photo: Joi.string().required(),
  login: Joi.string().required(),
  photoUser: Joi.string().required(),
  likesListUser: Joi.array().items(
    Joi.object({
      login: Joi.string().required(),
    })
  ),
  comments: Joi.array()
    .items(
      Joi.object({
        content: Joi.string().required(),
        date: Joi.number().required(),
        login: Joi.string().required(),
        photo: Joi.string().required(),
        // vous pouvez ajouter d'autres champs ici si nécessaire
      })
    )
    .optional(),
});

router.post("/add/post", async (req, res) => {
  try {
    const { id, title, photo, login, photoUser, comments } = req.body;
    console.log(req.body);

    const { error } = postSchema.validate({
      id,
      title,
      photo,
      login,
      photoUser,
      comments,
    });

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const newPost = new Post({
      id,
      title,
      photo,
      login,
      photoUser,
      comments,
    });

    await newPost.save();
    res.status(200).send("Posted !!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

//edit just le champ comment d'un post
router.put("/add/post", async (req, res) => {
  try {
    const update = req.body;
    console.log("reqbody", req.body.comments);

    const updatedUser = await Post.updateOne(
      //cherche à cet id
      { id: req.body.post },
      // mettre à jour le champ comments
      { $push: { comments: req.body.comments } },
      update
    );

    res.status(200).send({ message: "Posté !" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// UPDATE PROFIL
router.get("/all/posts", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ id: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something broke!");
  }
});

module.exports = router;
