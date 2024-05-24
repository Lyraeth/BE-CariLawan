const { prisma } = require("../../config/prisma");

const findAllTeams = async () => {
  const teams = await prisma.teams.findMany();

  return teams;
};

const findTeamsById = async (id) => {
  const team = await prisma.teams.findUnique({
    where: {
      team_id: id.toString(),
    },
  });

  return team;
};

const insertTeams = async (teamData) => {
  const team = await prisma.teams.create({
    data: {
      team_name: teamData.team_name,
      image_url: teamData.image_url,
    },
  });
  return team;
};

const deleteTeam = async (id) => {
  await prisma.teams.delete({
    where: {
      team_id: id.toString(),
    },
  });
};

const editTeam = async (id, teamData) => {
  const team = await prisma.teams.update({
    where: {
      team_id: id.toString(),
    },
    data: {
      team_name: teamData.team_name,
      image_url: teamData.image_url,
    },
  });

  return team;
};

module.exports = {
  findAllTeams,
  insertTeams,
  findTeamsById,
  deleteTeam,
  editTeam,
};
