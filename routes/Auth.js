import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:5173/login",
  })
);

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      user: req.user,
      isAuthenticated: true,
    });
  } else {
    return res.status(401).json({
      message: "User not authenticated",
      isAuthenticated: false,
    });
  }
});

export default router;
