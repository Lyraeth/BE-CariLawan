const { prisma } = require("../../config/prisma");

const findPlayer = async () => {
  const players = await prisma.players.findMany();

  return players;
};

const findPlayerById = async (id) => {
  const player = await prisma.players.findUnique({
    where: {
      player_id: id.toString(),
    },
  });

  return player;
};

const insertPlayer = async (playerData) => {
  const player = await prisma.players.create({
    data: {
      player_name: playerData.player_name,
      player_position: playerData.player_position,
      player_age: parseInt(playerData.player_age),
      player_img: playerData.player_img,
      team_id: playerData.team_id,
    },
  });

  return player;
};

const deletePlayer = async (id) => {
  await prisma.players.delete({
    where: {
      player_id: id.toString(),
    },
  });
};

const editPlayer = async (id, playerData) => {
  const player = await prisma.players.update({
    where: {
      player_id: id.toString(),
    },
    data: {
      player_name: playerData.player_name,
      player_position: playerData.player_position,
      player_age: playerData.player_age,
      player_img: playerData.player_img,
    },
  });
  return player;
};

module.exports = {
  findPlayer,
  insertPlayer,
  findPlayerById,
  deletePlayer,
  editPlayer,
};
