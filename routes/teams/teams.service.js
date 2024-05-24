const { prisma } = require("../../config/prisma");

const {
  findAllTeams,
  insertTeams,
  findTeamsById,
  deleteTeam,
  editTeam,
} = require("./teams.repository");

const getAllTeams = async () => {
  const teams = await findAllTeams();

  return teams;
};

const getTeamsById = async (id) => {
  const team = await findTeamsById(id);

  if (!team) {
    throw Error("Team data not found!");
  }

  return team;
};

const createTeam = async (newTeamData) => {
  const team = await insertTeams(newTeamData);

  return team;
};

const deleteTeamById = async (id) => {
  await getTeamsById(id);

  await deleteTeam(id);
};

const editTeamById = async (id, teamData) => {
  await getTeamsById(id);

  const team = await editTeam(id, teamData);

  return team;
};

module.exports = {
  getAllTeams,
  createTeam,
  getTeamsById,
  deleteTeamById,
  editTeamById,
};
