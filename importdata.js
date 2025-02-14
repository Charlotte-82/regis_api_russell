require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Catway = require("./models/Catway");
const Reservation = require("./models/Reservation");
const User = require("./models/User");

connectDB()
  .then(async () => {
    try {
      await Catway.insertMany(require("./data/catways.json"));

      await Reservation.insertMany(require("./data/reservations.json"));

      await User.insertMany(require("./data/users.json"));

      console.log("Données importées avec succès");
      process.exit();
    } catch (error) {
      console.error("Erreur d'importation des données:", error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données:", error);
  });
