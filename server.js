const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "obscure-escarpment-84696",
    user: "joshtanguay",
    password: "",
    database: "smart-brain"
  }he
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send('it is working');
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageUrl", (req, res) => {
  image.handleImageUrl(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on local port ${process.env.PORT}`);
});
