const express = require("express");
const controllerTeams = express.Router();

const {
  getAllTeams,
  createTeam,
  getTeamsById,
  deleteTeamById,
  editTeamById,
} = require("./teams.service");
const { deleteTeam } = require("./teams.repository");

controllerTeams.get("/", async (req, res) => {
  const teams = await getAllTeams();

  res.send(teams);
});

controllerTeams.get("/:id", async (req, res) => {
  try {
    const teamData = req.params.id;
    const team = await getTeamsById(teamData);

    res.send(team);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

controllerTeams.post("/", async (req, res) => {
  try {
    const newTeamData = req.body;
    const team = await createTeam(newTeamData);

    res.send({
      data: team,
      message: "Team Created Successfully!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

controllerTeams.delete("/:id", async (req, res) => {
  try {
    const teamId = req.params.id;

    await deleteTeamById(teamId);

    res.send("Team data deleted!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

controllerTeams.put("/:id", async (req, res) => {
  try {
    const teamId = req.params.id;
    const teamData = req.body;

    const editTeam = await editTeamById(teamId, teamData);

    if (!(teamData.team_name && teamData.image_url)) {
      res.status(400).send("Some fields are missing!");
    }

    res.send({
      data: editTeam,
      message: "Team edited successfully!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

controllerTeams.patch("/:id", async (req, res) => {
  try {
    const teamId = req.params.id;
    const teamData = req.body;

    const editTeam = await editTeamById(teamId, teamData);

    res.send({
      data: editTeam,
      message: "Team edited successfully!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { controllerTeams };
