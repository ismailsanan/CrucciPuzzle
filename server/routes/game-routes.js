const express = require("express");

const router = express.Router();

const isAuthenticated = require("../middlewares/check-auth");

const {
  getGameDifficulties,
  generateLettersGrid,
  findWordFromWordList,
  getTopFiveScores,
  insertScoreForUser,
} = require("../controllers/game-controller");

router.get("/difficulties", getGameDifficulties);
router.get("/generate-grid/:id", generateLettersGrid);
router.get("/findWord", findWordFromWordList);
router.get("/get-top-five", getTopFiveScores);
router.post("/insert-score",isAuthenticated, insertScoreForUser);

module.exports = router;
