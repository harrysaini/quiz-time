import { ExtractJwt, Strategy } from 'passport-jwt';
import config from 'config';
import passport from 'passport';

import User from './../models/user.model';

const jwtSecret = config.get('jwt.secret') as string;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

passport.use(new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if(!user){
      return done(null);
    } else {
      return done(null, user);
    }
  } catch (err) {
    done(err);
  }
}))
