const db = require("../models/dbHelper");

const { randomAtoZ } = require("../utils/letters-generator");
const { findWord } = require("../utils/find-word");

const getGameDifficulties = (req, res) => {
  db.getGameDifficulties()
    .then((difficulties) => {
      res.status(200).json({ data: difficulties });
    })
    .catch((error) => {
      res.status(500).json({ data: "cannot getGameDifficulties" });
    });
};

const generateLettersGrid = (req, res) => {
  let { id } = req.params;

  db.getGameDifficultyByGameId(id)
    .then((game) => {
      const { row, column } = game;

      let grid = [];
      for (let i = 0; i < row; i++) {
        grid[i] = new Array(column).fill("");
      }

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
          grid[i][j] = randomAtoZ();
        }
      }

      res.status(200).json({ data: grid });
    })
    .catch((error) => {
      res.status(500).json({ data: "cannot getGameGrid" });
    });
};

const findWordFromWordList = (req, res) => {
  const wordFromFE = req.query.word;
 // console.log(wordFromFE);
  const found = findWord(wordFromFE);

  res.status(200).json({ data: found });
};

const insertScoreForUser = (req, res) => {
  const { userId, gameId, score } = req.body;
  //console.log(userId, gameId, score);
  db.insertUserScore(userId, gameId, score)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ data: "cannot insert score" });
    });
};

const getTopFiveScores = (req, res) => {
  db.getTopFiveScores()
    .then((dataDb) => {
      dataDb.map((record) => {
        const { username, description, row, column, score } = record;
        return {
          username,
          description,
          row,
          column,
          score,
        };
      });
      res.status(200).json({
        data: dataDb,
      });
    })
    .catch((error) => {
      res.status(500).json({ data: "cannot getTopFiveScores" });
    });
};

module.exports = {
  getGameDifficulties,
  generateLettersGrid,
  findWordFromWordList,
  getTopFiveScores,
  insertScoreForUser,
};
