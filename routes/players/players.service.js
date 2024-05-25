const {
  findPlayer,
  insertPlayer,
  findPlayerById,
  deletePlayer,
  editPlayer,
} = require("./players.repository");

const getAllPlayers = async () => {
  const players = await findPlayer();

  return players;
};

const getPlayerById = async (id) => {
  const player = await findPlayerById(id);

  return player;
};

const createPlayer = async (playerData) => {
  const player = await insertPlayer(playerData);

  return player;
};

const deletePlayerById = async (id) => {
  await getPlayerById(id);

  await deletePlayer(id);
};

const editPlayerById = async (id, playerData) => {
  const player = await editPlayer(id, playerData);

  return player;
};

module.exports = {
  getAllPlayers,
  createPlayer,
  getPlayerById,
  deletePlayerById,
  editPlayerById,
};
