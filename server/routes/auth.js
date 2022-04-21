const express = require("express");

const router = express.Router();

const isAuthenticated = require("../middlewares/check-auth");

const { login } = require("../controllers/auth-controller");
const {logout} = require("../controllers/auth-controller");

router.get("/logout",isAuthenticated ,logout);
router.post("/login", login);

module.exports = router;
