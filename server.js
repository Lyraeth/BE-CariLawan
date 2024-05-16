require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { accessValidation } = require("./routes/auth/validations");
const { controllerUsers } = require("./routes/users/users.controller");
const { loginController } = require("./routes/auth/login");

app.get("/", async (req, res) => {
  res.send("Welcome to CariLawan API");
});

// Locked Route
app.use("/api/users/", accessValidation, controllerUsers);

// Route
app.use("/login", loginController);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is already running at ${PORT}`);
});
