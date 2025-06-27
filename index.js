import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import session from "express-session";
import connectDB from "./config/db.js";
import authRoutes from "./routes/Auth.js";
import "./passport/Google.js"; // Ensure this imports the Google strategy

connectDB();
const app = express();

app.use(
  cors({
    Credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
