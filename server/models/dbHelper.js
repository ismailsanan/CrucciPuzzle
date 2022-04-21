const db = require("../dbConfig");

const getGameDifficulties = () => {
  return db("game");
};

const getGameDifficultyByGameId = (id) => {
  return db("game").where({ id }).first();
};

const findUser = (username) => {
  return db("user").where({ username }).first();
};

const findUserById = (id) => {
  return db("user").where({id}).first();

}

const insertUserScore = async (user_id, game_id, score) => {
  await db("scores").insert({ user_id, game_id, score });
  return "OK";
};

const getTopFiveScores = () => {
  return db("scores as s")
    .join("game as g", "s.game_id", "g.id")
    .join("user as u", "s.user_id", "u.id")
    .select("u.username", "g.description", "g.row", "g.column", "s.score")
    .orderBy("s.score", "desc")
    .limit(5);
};

module.exports = {
  getGameDifficulties,
  findUser,
  getGameDifficultyByGameId,
  insertUserScore,
  getTopFiveScores,
  findUserById,
};
