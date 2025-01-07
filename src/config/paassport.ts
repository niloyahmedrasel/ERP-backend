import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { EmployeeRepository } from '../repository/user';
import { Request } from 'express';

const employeeRepository = new EmployeeRepository();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: 'secret', 
};

passport.use(
  new JwtStrategy(options, async (jwt_payload: any, done) => {
    try {
      console.log('JWT Payload:', jwt_payload);
      const user = await employeeRepository.findById(jwt_payload._id);

      if (!user) {
        return done(null, false); 
      }

      return done(null, user); 
    } catch (error) {
      return done(error, false); 
    }
  })
);

export default passport;
