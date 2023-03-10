const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  login: Joi.string().required(),
  gender: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  category: Joi.string().required(),
  photo: Joi.string().required(),
  date: Joi.number().required(),
});

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      login,
      gender,
      firstname,
      lastname,
      category,
      photo,
      date,
    } = req.body;
    console.log(req.body);

    const { error } = userSchema.validate({
      email,
      password,
      login,
      gender,
      firstname,
      lastname,
      category,
      photo,
      date,
    });

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email });
    const existingEmail = await User.findOne({ login });

    if (existingUser || existingEmail) {
      return res.status(409).send({ message: "User already exists" });
    }
    const newUser = new User({
      email,
      password,
      login,
      gender,
      firstname,
      lastname,
      category,
      photo,
      date,
    });

    await newUser.save();

    res.status(201).send({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

const jwt = require("jsonwebtoken");
router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    const existingUser = await User.findOne({ login, password });

    if (!existingUser) {
      return res.status(401).send({ message: "Invalid login or password" });
    }

    const token = jwt.sign({ id: existingUser._id }, "wHgHuAfyjA");

    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

router.get("/users/:letter", async (req, res) => {
  const letter = req.params.letter;
  console.log("letter", letter);
  const regex = new RegExp(`^${letter}`, "i"); // expression régulière pour trouver les utilisateurs qui commencent par la lettre spécifiée
  const users = await User.find({ login: regex });
  res.json(users);
});

// Route pour récupérer le profil de l'utilisateur connecté
router.get("/profile/:id", async (req, res) => {
  try {
    let login = req.params.id;
    const user = await User.findOne({ login: login }); // récupère l'utilisateur par son adresse e-mail
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// UPDATE PROFIL
router.put("/profile/:id", async (req, res) => {
  try {
    const Params = req.params.id;
    const update = req.body;
    console.log("update", update);
    const options = { new: true }; // Pour renvoyer le document mis à jour

    const updatedUser = await User.findOneAndUpdate(
      { login: Params },
      update,
      options
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // Renvoyer seulement certaines données du profil
    const { login, firstname, lastname, gender } = updatedUser;
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
