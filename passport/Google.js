import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Users from "../model/Users.js";

passport.use(
  new GoogleStrategy(
    {
      //   clientID: process.env.GOOGLE_CLIENT_ID,
      clientID:
        "282825538406-rtl0mc5qvr9ii239kl6c9vjvcp07ujti.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in the database
        let user = await Users.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        }

        // If not, create a new user
        user = await Users.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avartar: profile.photos[0].value,
        });

        done(null, user);
      } catch (error) {
        console.error(error);
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
