console.log('Loading passport middlewar',process.env.NODE_ENV);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const userController = require('../controllers/user.controller');

console.log('JWT Secret:', process.env.JWT_SECRET); // debug

const localLogin = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    const user = await userController.getUserByUsernameAndPassword(username, password);
    return user
      ? done(null, user)
      : done(null, false, { error: 'Your login details are not valid.' });
  }
);

const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  async (payload, done) => {
    const user = await userController.getUserById(payload._id);
    return user
      ? done(null, user)
      : done(null, false, { error: 'Your login details are not valid.' });
  }
);

module.exports = passport.use(localLogin).use(jwtLogin);
