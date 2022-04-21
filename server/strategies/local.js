const LocalStrategy = require("passport-local");
const passport = require("passport");

const bcrypt = require("bcryptjs");

const db = require("../models/dbHelper");

passport.serializeUser((user, done) => {
  console.log("serializing", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializing user with id: ", id);
  try {
    const user = await db.findUserById(id);
    if (user) {
      done(null, user.id);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.findUser(username);
      if (!user) {
        done(null, false);
      } else {
        bcrypt
          .compare(password, user.password)
          .then((res) => {
            if (!res) {
              console.log("AUTH FAILED");
              done(null, false);
            } else {
              console.log("AUTH SUCCESS");
              done(null, user);
            }
          })
          .catch((err) => {
            done(err, false);
          });
      }
    } catch (err) {
      done(err, false);
    }
  })
);