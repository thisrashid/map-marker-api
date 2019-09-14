import passport from 'passport';
import { BasicStrategy } from 'passport-http';

export const basicAuth = passport.authenticate('basic', { session: false });

passport.use(new BasicStrategy(
  function(username, password, done) {
    if(username === 'testuser' && password === 'dontknow') {
      return done(null, true);
    } else {
      return done(null, false);
    }
  }
));