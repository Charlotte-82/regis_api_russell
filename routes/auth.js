const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    console.log("Début de l'enregistrement");
    const { username, email, password } = req.body;
    console.log("Données reçues :", username, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Mot de passe haché :", hashedPassword);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log("Nouvel utilisateur créé :", newUser);
    const user = await newUser.save();
    console.log("Utilisateur enregistré dans la base de données");
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.status(201).json({
      id: user._id,
      username,
      email,
      token,
    });
    console.log("Fin de l'enregistrement");
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
