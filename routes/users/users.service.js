const { prisma } = require("../../config/prisma");

const {
  findAllUsers,
  findUniqueUser,
  insertUser,
  editUser,
  deleteUser,
} = require("./users.repository");

const getAllUsers = async () => {
  const users = await findAllUsers();

  return users;
};

const getUniqueUser = async (id) => {
  const users = await findUniqueUser(id);

  if (!users) {
    throw Error("User not found");
  }

  return users;
};

const createUser = async (newUserData) => {
  const users = await insertUser(newUserData);

  return users;
};

const editUserById = async (id, userData) => {
  await getUniqueUser(id);

  const users = await editUser(id, userData);

  return users;
};

const deleteUserById = async (id) => {
  await getUniqueUser(id);

  await deleteUser(id);
};

module.exports = {
  getAllUsers,
  getUniqueUser,
  createUser,
  deleteUserById,
  editUserById,
};
