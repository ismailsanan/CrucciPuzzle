const passport = require("passport");

const login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(401).json({ data: "Unauthorized" });
    } else {
      req.logIn(user, (err) => {
        if (err) {
          res.status(401).json({ data: "Unauthorized" });
        } else {
          const userToPass = {
            id: user.id,
            username: user.username,
          };
          res.status(200).json({ data: userToPass });
        }
      });
    }
  })(req, res, next);
};

const logout = (req ,res ) => {
 // console.log(req.user);
  req.logOut();
  res.status(200).json({data: "OK"});

}

module.exports = {
  login,
  logout
};
