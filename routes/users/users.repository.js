const { prisma } = require("../../config/prisma");
const bcrypt = require("bcrypt");

const findAllUsers = async () => {
  const users = await prisma.users.findMany();

  return users;
};

const findUniqueUser = async (id) => {
  const uniqueUsers = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  return uniqueUsers;
};

const insertUser = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const createUser = await prisma.users.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
    },
  });

  return createUser;
};

const editUser = async (id, userData) => {
  let hashedPassword;
  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(userData.password, salt);
  }

  const editUser = await prisma.users.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
    },
  });

  return editUser;
};

const deleteUser = async (id) => {
  await prisma.users.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  findAllUsers,
  findUniqueUser,
  insertUser,
  editUser,
  deleteUser,
};
