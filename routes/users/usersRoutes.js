const express = require("express");
const usersRoutes = express.Router();
const { prisma } = require("../../config/prisma");
const bcrypt = require("bcrypt");

// Users
usersRoutes.get("/", async (req, res) => {
  const getAllUser = await prisma.users.findMany();
  res.status(200).send(getAllUser);
});

// Search user by Id
usersRoutes.get("/:id", async (req, res) => {
  const getUniqueUser = await prisma.users.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!getUniqueUser)
    res.status(404).json({
      message: "User not found",
    });
  res.status(200).send(getUniqueUser);
});

// Create Users
usersRoutes.post("/", async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone)
    res.status(400).json({ message: "This field is required" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createUser = await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
    },
  });
  res.status(201).json({
    message: "User Created",
    data: createUser,
  });
});

// Update Users
usersRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone, address, gender, profileImage } =
    req.body;

  // Hash password only if a new password is provided
  let hashedPassword;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  const updateUser = await prisma.users.update({
    where: { id: parseInt(id) },
    data: {
      name: name ? name : undefined,
      email: email ? email : undefined,
      password: hashedPassword,
      phone: phone ? phone : undefined,
    },
  });

  res.status(200).json({
    message: `User with id: ${id} is updated`,
    data: updateUser,
  });
});

// Delete Users
usersRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.users.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).json({
    message: `User with id: ${id} has been deleted`,
  });
});
module.exports = { usersRoutes };
