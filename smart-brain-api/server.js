const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const app = express();
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");
const register = require("./Containers/register");
const signin = require("./Containers/signin");
const profile = require("./Containers/profile");
const image = require("./Containers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "sirisha23",
    database: "smart-brain",
  },
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageURL",(req,res) => {
  image.handleApicall(req,res);
});

app.listen(3000, () => {
  console.log("app is running at port 3000");
});
