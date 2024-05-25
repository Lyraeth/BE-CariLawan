const express = require("express");
const controllerTeamlayers = express.Router();
const { createTeam } = require("../teams/teams.service");
const { createPlayer } = require("../players/players.service");

controllerTeamlayers.post("/", async (req, res) => {
  try {
    // bikin tim
    const playerData = req.body;
    const newTeamData = req.body;
    const team = await createTeam(newTeamData);

    // bikin player
    const players = [];
    for (let i = 0; i < playerData.player_name.length; i++) {
      const newPlayerData = {
        player_name: playerData.player_name[i],
        player_position: playerData.player_position[i],
        player_age: playerData.player_age[i],
        player_img: playerData.player_img[i],
        team_id: team.team_id,
      };
      const player = await createPlayer(newPlayerData);
      players.push(player);
    }

    res.send({
      data: { team, players },
      message: "Team and player created successfully!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { controllerTeamlayers };
