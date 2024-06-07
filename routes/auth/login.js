const express = require("express");
const loginController = express.Router();
const { prisma } = require("../../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

loginController.get("/", async (req, res) => {
  const loginPath = path.join(__dirname, "../../public/login.html");
  res.sendFile(loginPath);
});

loginController.post("/", async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (!checkUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!checkUser.password) {
    return res.status(404).json({
      message: "Password not set",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, checkUser.password);

  if (isPasswordValid) {
    const payload = {
      id: checkUser.id,
      name: checkUser.name,
      email: checkUser.email,
      phone: checkUser.phone,
    };

    const secret = process.env.JWT_SECRET;

    const expires = 60 * 60 * 1; // Expired 1 Hour

    const token = jwt.sign(payload, secret, { expiresIn: expires });

    res.cookie(" ", token, { httpOnly: true }).send({
      message: "Login successful",
    });
  } else {
    return res.status(403).json({
      message: "Wrong password",
    });
  }
});

module.exports = { loginController };
