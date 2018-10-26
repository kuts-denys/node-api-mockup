const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('./../models/user');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET_KEY,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) return done(null, false, { message: 'User not found' });
      done(null, user);
    } catch (err) {
      done(err);
    }
  }),
);

module.exports.protectedRoute = passport.authenticate('jwt', {
  session: false,
});
