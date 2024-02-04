const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Users = require("./models/users");
const airsoftItems = require("./models/airsoftItems");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://belma:svadba1712@cluster0.kn4cg.mongodb.net/airsoftApp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.post("/", async (req, res) => {
  let user = await Users.find({
    username: req.body.username,
    password: req.body.password,
  });
  if (user.length === 0) {
    res.json("User not found");
  }
  res.json(user[0]);
});

app.get("/Home", async (req, res) => {
  const items = await airsoftItems.find();
  res.json(items);
});

app.post("/AirsoftItem/new", async (req, res) => {
  const item = new airsoftItems({
    title: req.body.title,
    required: req.body.required,
    selected: false,
  });
  item.save();
  res.json(item);
});

app.delete("/AirsoftItem/delete/:id", async (req, res) => {
  const item = await airsoftItems.findByIdAndDelete(req.params.id);
  res.json(item);
});

app.get("/AirsoftItem/edit/:id", async (req, res) => {
  const editItem = await airsoftItems.findById(req.params.id);
  res.json(editItem);
});

app.post("/AirsoftItem/edit/:id", async (req, res) => {
  const update = await airsoftItems.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        required: req.body.required,
      },
    }
  );
  update.save();
  res.json(update);
});

app.get("/user/:id", async(req, res) => {
  const user = await Users.findById(req.params.id);
  res.json(user);
})

app.post("/user/editUsename/:id", async (req, res) => {
  const update = await Users.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        username: req.body.username,
      },
    }
  );
  update.save();
  res.json(update);
});

app.post("/user/editPassword/:id", async (req, res) => {
  const update = await Users.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        password: req.body.password,
      },
    }
  );
  update.save();
  res.json(update);
});

app.listen(3000, () => {
  console.log("Server started!");
});
  