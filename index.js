require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "Utilisateur" });
});

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/catways", require("./routes/catways"));
app.use("/api/reservations", require("./routes/reservations"));
app.use("/api/users", require("./routes/users"));

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/userboard", (req, res) => {
  res.render("userboard");
});

app.get("/catwayboard", (req, res) => {
  res.render("catwayboard");
});

app.get("/reservationboard", (req, res) => {
  res.render("reservationboard");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
