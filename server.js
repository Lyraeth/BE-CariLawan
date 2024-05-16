require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { usersRoutes } = require("./routes/users/usersRoutes");
const { loginController } = require("./routes/auth/login");

const accessValidation = (req, res, next) => {
  const validationReq = req;
  const { authorization } = validationReq.headers;

  console.log("here: ", authorization);

  if (!authorization) {
    return res.status(401).json({
      message: "Token diperlukan",
    });
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  try {
    const jwtDecode = jwt.verify(token, secret);

    if (typeof jwtDecode !== "string") {
      validationReq.userData = jwtDecode;
    }
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  next();
};

app.get("/", async (req, res) => {
  res.send("Welcome to CariLawan API");
});

// Routes
app.use("/api/users/", accessValidation, usersRoutes);

app.use("/login", loginController);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is already running at ${PORT}`);
});
