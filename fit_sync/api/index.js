const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/users.js");
const app = express();

app.use(express.json()); //required for the system to read json files

app.get("/", (req, res) => {
  res.send("Succesful Gateway");
  console.log("Succesfully on the server");
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const users = await User.create(req.body);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://lenardperegilx_db_user:k2O0gWD21KEyqvJ8@cluster0.bsmoinp.mongodb.net/User-Accounts?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(() => {
    console.log("Connection Failed");
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
