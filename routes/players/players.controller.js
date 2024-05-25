const express = require("express");
const controllerPlayers = express.Router();

const {
  getAllPlayers,
  createPlayer,
  getPlayerById,
  deletePlayerById,
  editPlayerById,
} = require("./players.service");

controllerPlayers.get("/", async (req, res) => {
  const players = await getAllPlayers();

  res.send(players);
});

controllerPlayers.get("/:id", async (req, res) => {
  try {
    const playerId = req.params.id;

    const player = await getPlayerById(playerId);

    res.send(player);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

controllerPlayers.post("/", async (req, res) => {
  try {
    const playerData = req.body;

    const player = await createPlayer(playerData);

    res.send({
      data: player,
      message: "Player created successfully!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

controllerPlayers.delete("/:id", async (req, res) => {
  try {
    const playerId = req.params.id;

    await deletePlayerById(playerId);

    res.send("Product deleted!");
  } catch (error) {
    res.statu(400).send(error.message);
  }
});

controllerPlayers.put("/:id", async (req, res) => {
  try {
    const playerId = req.params.id;
    const playerData = req.body;

    if (
      !(
        playerData.player_name &&
        playerData.player_position &&
        playerData.player_age &&
        playerData.player_img
      )
    ) {
      res.status(400).send("Some fields are missing!");
    }

    const player = await editPlayerById(playerId, playerData);

    res.send(player);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

controllerPlayers.patch("/:id", async (req, res) => {
  try {
    const playerId = req.params.id;
    const playerData = req.body;

    const player = await editPlayerById(playerId, playerData);

    res.send(player);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { controllerPlayers };
