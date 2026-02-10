import "dotenv/config";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { getUser, getUserByUsername } from "../controllers/usersController.js";
import { compare } from "bcrypt";

function configPassport(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env["JWT_SECRET"],
  };

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      try {
        const user = getUser(jwt_payload.sub);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }),
  );

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await getUserByUsername(username);
        const match = await compare(password, user.password);
        if (!match) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, false, { message: "Incorrect username or password." });
      }
    }),
  );
}

export { configPassport };
